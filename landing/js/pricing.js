(function () {
  /** Annual list prices — FA: Toman, EN: EUR (penetration launch pricing). */
  var PLAN_PRICES = {
    plus: { toman: 4000000, eur: 50, months: 12 },
    pro: { toman: 10000000, eur: 100, months: 12 },
    ark: { toman: 16000000, eur: 150, months: 12 },
  };

  /** Local fallback codes until Supabase discount table is live. */
  var LOCAL_DISCOUNTS = {
    METRICO10: { percent: 10, kinds: ["purchase", "renewal"] },
    METRICO20: { percent: 20, kinds: ["purchase", "renewal"] },
    RENEW15: { percent: 15, kinds: ["renewal"] },
  };

  var state = {
    plan: null,
    kind: "purchase",
    discountCode: "",
    discountPercent: 0,
  };

  function lang() {
    return window.MetricoLanding ? window.MetricoLanding.getLang() : "en";
  }

  function t(key) {
    return window.MetricoLanding ? window.MetricoLanding.t(lang(), key) : key;
  }

  function planName(id) {
    var map = { plus: "plan.plus", pro: "plan.pro", ark: "plan.ark" };
    return t(map[id] || id);
  }

  function formatPrice(amount, isFa) {
    if (isFa) {
      try {
        return amount.toLocaleString("fa-IR") + " تومان / سال";
      } catch (e) {
        return amount + " تومان / سال";
      }
    }
    return "€" + amount + " / year";
  }

  function listAmount() {
    var p = PLAN_PRICES[state.plan];
    if (!p) return 0;
    return lang() === "fa" ? p.toman : p.eur;
  }

  function payableAmount() {
    var base = listAmount();
    if (!state.discountPercent) return base;
    return Math.max(0, Math.round(base * (100 - state.discountPercent) / 100));
  }

  function refreshAmounts() {
    var isFa = lang() === "fa";
    var listEl = document.getElementById("checkout-list-price");
    var payEl = document.getElementById("checkout-payable");
    var planEl = document.getElementById("checkout-plan-label");
    var hint = document.getElementById("checkout-hint");
    if (planEl) {
      planEl.textContent =
        planName(state.plan) +
        " · " +
        (state.kind === "renewal" ? (isFa ? "تمدید سالانه" : "Annual renewal") : isFa ? "خرید سالانه" : "Annual purchase");
    }
    if (listEl) listEl.textContent = formatPrice(listAmount(), isFa);
    if (payEl) payEl.textContent = formatPrice(payableAmount(), isFa);
    if (hint) {
      hint.setAttribute("data-i18n", isFa ? "checkout.hintFa" : "checkout.hintEn");
      hint.textContent = t(isFa ? "checkout.hintFa" : "checkout.hintEn");
    }
  }

  function openCheckout(planId, kind) {
    if (!PLAN_PRICES[planId]) return;
    state.plan = planId;
    state.kind = kind === "renewal" ? "renewal" : "purchase";
    state.discountCode = "";
    state.discountPercent = 0;
    var modal = document.getElementById("checkout-modal");
    var input = document.getElementById("checkout-discount");
    var msg = document.getElementById("checkout-discount-msg");
    var status = document.getElementById("checkout-status");
    if (input) input.value = "";
    if (msg) {
      msg.hidden = true;
      msg.textContent = "";
      msg.className = "checkout-discount-msg";
    }
    if (status) {
      status.hidden = true;
      status.textContent = "";
    }
    refreshAmounts();
    if (modal) modal.hidden = false;
  }

  function closeCheckout() {
    var modal = document.getElementById("checkout-modal");
    if (modal) modal.hidden = true;
  }

  function applyDiscount() {
    var input = document.getElementById("checkout-discount");
    var msg = document.getElementById("checkout-discount-msg");
    var code = ((input && input.value) || "").trim().toUpperCase();
    var row = LOCAL_DISCOUNTS[code];
    if (!row || row.kinds.indexOf(state.kind) === -1) {
      state.discountCode = "";
      state.discountPercent = 0;
      if (msg) {
        msg.hidden = false;
        msg.className = "checkout-discount-msg err";
        msg.textContent = t("checkout.discountBad");
      }
      refreshAmounts();
      return;
    }
    state.discountCode = code;
    state.discountPercent = row.percent;
    if (msg) {
      msg.hidden = false;
      msg.className = "checkout-discount-msg ok";
      msg.textContent = t("checkout.discountOk") + " (−" + row.percent + "%)";
    }
    refreshAmounts();
  }

  async function startPayment() {
    var status = document.getElementById("checkout-status");
    var payBtn = document.getElementById("checkout-pay");
    if (!state.plan) return;

    if (lang() !== "fa") {
      if (status) {
        status.hidden = false;
        status.textContent = t("checkout.devEn");
      }
      return;
    }

    if (payBtn) payBtn.disabled = true;
    if (status) {
      status.hidden = false;
      status.textContent = "...";
    }

    var body = {
      plan: state.plan,
      months: PLAN_PRICES[state.plan].months,
      kind: state.kind,
      discount_code: state.discountCode || null,
      amount_toman: payableAmount(),
      currency: "IRR",
      callback_path: "/landing/payment-return.html",
    };

    try {
      var sb = window.sb || (window.supabase && window.__metricoSb);
      if (sb && sb.functions && sb.functions.invoke) {
        var res = await sb.functions.invoke("create-payment", { body: body });
        if (res.error) throw res.error;
        var data = res.data || {};
        if (data.payment_url) {
          window.location.href = data.payment_url;
          return;
        }
        if (data.status === "needs_config" || data.status === "pending_manual") {
          if (status) status.textContent = t("checkout.needConfig");
          return;
        }
        throw new Error(data.message || "payment_failed");
      }

      // No Supabase client on landing — save intent via mailto fallback note
      if (status) status.textContent = t("checkout.needConfig");
      try {
        localStorage.setItem(
          "metrico_pending_checkout",
          JSON.stringify({
            plan: state.plan,
            kind: state.kind,
            discount: state.discountCode,
            amount_toman: payableAmount(),
            at: Date.now(),
          })
        );
      } catch (e) {}
    } catch (e) {
      if (status) status.textContent = t("checkout.error");
    } finally {
      if (payBtn) payBtn.disabled = false;
    }
  }

  function bind() {
    document.querySelectorAll("[data-checkout]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openCheckout(btn.getAttribute("data-checkout"), "purchase");
      });
    });
    var close = document.getElementById("checkout-close");
    var modal = document.getElementById("checkout-modal");
    var apply = document.getElementById("checkout-apply-discount");
    var pay = document.getElementById("checkout-pay");
    if (close) close.addEventListener("click", closeCheckout);
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeCheckout();
      });
    }
    if (apply) apply.addEventListener("click", applyDiscount);
    if (pay) pay.addEventListener("click", startPayment);

    var sw = document.getElementById("lang-switch");
    if (sw) {
      sw.addEventListener("click", function () {
        setTimeout(function () {
          if (modal && !modal.hidden) refreshAmounts();
        }, 0);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", bind);

  window.MetricoPricing = {
    PLAN_PRICES: PLAN_PRICES,
    openCheckout: openCheckout,
    LOCAL_DISCOUNTS: LOCAL_DISCOUNTS,
  };
})();
