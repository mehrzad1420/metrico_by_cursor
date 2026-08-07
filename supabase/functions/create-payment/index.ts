/**
 * Metrico — create Zarinpal payment for annual plan purchase/renewal.
 *
 * Secrets (Supabase Edge):
 *   ZARINPAL_MERCHANT_ID  — required for live redirect
 *   PAYMENT_CALLBACK_URL  — e.g. https://YOUR_DOMAIN/landing/payment-return.html
 *   ZARINPAL_SANDBOX      — "true" to use sandbox
 *
 * Without merchant id: creates a manual/pending order and returns needs_config.
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PLAN_TOMAN: Record<string, number> = {
  plus: 4_000_000,
  pro: 10_000_000,
  ark: 16_000_000,
  team: 28_000_000,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const body = await req.json();
    const plan = String(body.plan || "").toLowerCase();
    const months = Math.max(1, Number(body.months) || 12);
    const kind = body.kind === "renewal" ? "renewal" : "purchase";
    const discountCode = body.discount_code ? String(body.discount_code).trim() : null;
    const email = body.email ? String(body.email) : null;

    if (!["plus", "pro", "ark", "team"].includes(plan)) {
      return json({ status: "error", message: "invalid_plan" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const userClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data: u } = await userClient.auth.getUser();
      userId = u.user?.id ?? null;
    }

    let discountPercent = 0;
    if (discountCode) {
      const { data: d } = await supabase.rpc("validate_discount_code", {
        code_input: discountCode,
        kind_input: kind,
      });
      if (d?.ok) discountPercent = Number(d.percent) || 0;
    }

    const listToman = PLAN_TOMAN[plan];
    const amountToman = Math.max(
      0,
      Math.round((listToman * (100 - discountPercent)) / 100)
    );
    const amountRial = amountToman * 10;

    const { data: order, error: orderErr } = await supabase
      .from("payment_orders")
      .insert({
        user_id: userId,
        email,
        plan,
        months,
        kind,
        currency: "IRR",
        amount_toman: amountToman,
        discount_code: discountCode,
        discount_percent: discountPercent,
        provider: "zarinpal",
        status: "pending",
        raw: { source: "create-payment", months },
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      return json({ status: "error", message: orderErr?.message || "order_failed" }, 500);
    }

    const merchant = Deno.env.get("ZARINPAL_MERCHANT_ID") || "";
    if (!merchant) {
      await supabase
        .from("payment_orders")
        .update({ status: "manual" })
        .eq("id", order.id);
      return json({
        status: "needs_config",
        order_id: order.id,
        amount_toman: amountToman,
        message: "ZARINPAL_MERCHANT_ID not set",
      });
    }

    const sandbox = (Deno.env.get("ZARINPAL_SANDBOX") || "") === "true";
    const requestUrl = sandbox
      ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
      : "https://api.zarinpal.com/pg/v4/payment/request.json";
    const startPayBase = sandbox
      ? "https://sandbox.zarinpal.com/pg/StartPay/"
      : "https://www.zarinpal.com/pg/StartPay/";

    const callback =
      Deno.env.get("PAYMENT_CALLBACK_URL") ||
      "https://mehrzad1420.github.io/metrico_by_cursor/landing/payment-return.html";

    const zpRes = await fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id: merchant,
        amount: amountRial,
        callback_url: `${callback}?order_id=${order.id}`,
        description: `Metrico ${plan} ${kind} ${months}m`,
        metadata: email ? { email } : undefined,
      }),
    });
    const zpJson = await zpRes.json();
    const authority = zpJson?.data?.authority;
    const code = zpJson?.data?.code;

    if (!authority || code !== 100) {
      await supabase
        .from("payment_orders")
        .update({ status: "failed", raw: zpJson })
        .eq("id", order.id);
      return json({ status: "error", message: "zarinpal_request_failed", raw: zpJson }, 502);
    }

    await supabase
      .from("payment_orders")
      .update({
        status: "redirected",
        provider_ref: authority,
        raw: zpJson,
      })
      .eq("id", order.id);

    return json({
      status: "ok",
      order_id: order.id,
      amount_toman: amountToman,
      payment_url: startPayBase + authority,
    });
  } catch (e) {
    return json({ status: "error", message: String(e) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
