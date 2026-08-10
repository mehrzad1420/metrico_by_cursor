(function () {
  const APP_URL = "https://mehrzad1420.github.io/metrico_by_cursor/index.html";
  const LANDING_BASE = "https://mehrzad1420.github.io/metrico_by_cursor/landing/";
  const STORAGE_KEY = "metrico-landing-lang";

  const STR = {
    en: {
      "meta.title.home": "Metrico — Construction Project Management",
      "meta.title.about": "About — Metrico",
      "meta.title.guide": "Evaluator demo guide — Metrico",
      "meta.title.markets": "Markets — Metrico",
      "meta.title.competitors": "Why Metrico — landscape",
      "meta.title.revenue": "Revenue & unit economics — Metrico",
      "meta.title.evidence": "Market evidence & early validation — Metrico",
      "meta.title.mmap": "2–3 year market map — Metrico",
      "meta.title.estonia": "Estonia presence plan — Metrico",
      "meta.title.bizplan": "Business plan & founder — Metrico",
      "meta.title.contact": "Contact — Metrico",
      "meta.title.privacy": "Privacy — Metrico",
      "nav.home": "Home",
      "nav.platform": "Platform",
      "nav.markets": "Markets",
      "nav.about": "About",
      "nav.guide": "Guide",
      "nav.contact": "Contact",
      "nav.privacy": "Privacy",
      "nav.openApp": "Open app",
      "lang.switch": "فارسی",
      "hero.eyebrow": "Construction command center",
      "hero.title": "One place for units, money, and owners",
      "hero.lead":
        "A bilingual PWA for developers and contractors: unit sales, installments, project finance, and owner updates — built for the field, with offline sync.",
      "hero.chip1": "Offline PWA",
      "hero.chip2": "EN / FA",
      "hero.chip3": "Owner portal",
      "hero.chip4": "Live product",
      "hero.cta1": "Open live app",
      "hero.cta2": "See demo guide",
      "hero.stat1a": "Live product",
      "hero.stat1b": "Not a slide deck",
      "hero.stat2a": "Field-ready",
      "hero.stat2b": "Offline on site",
      "hero.stat3a": "4 plans",
      "hero.stat3b": "Starter → Ark",
      "hero.badge": "Working product · Offline sync",
      "hero.imgAlt": "Construction management on tablet",
      "feat.title": "What features does Metrico offer?",
      "feat.sub":
        "Segmented like a construction software map — sales, finance, field, and reporting tied together.",
      "feat.d1h": "By deployment",
      "feat.d1l1": "Offline PWA — works on site",
      "feat.d1l2": "Browser install — no store required",
      "feat.d1l3": "Local-first — sync when online",
      "feat.d2h": "By application",
      "feat.d2l1": "Unit & sales — grids, buyers",
      "feat.d2l2": "Field finance — expenses, cash",
      "feat.d2l3": "Owner comms — secure links",
      "feat.d3h": "By workflow",
      "feat.d3l1": "Pre-sale — reservations, plans",
      "feat.d3l2": "Active build — costs, progress",
      "feat.d3l3": "Handover — installments, portal",
      "feat.d4h": "Core modules",
      "feat.d4l1": "Unit grid",
      "feat.d4l2": "Ledger & investors",
      "feat.d4l3": "PDF exports",
      "cap.title": "Built for real construction teams",
      "cap.sub": "Seven advantages when others aren't enough",
      "cap.c1t": "Multi-project scale",
      "cap.c1p": "Starter to Ark — grow portfolio without switching tools.",
      "cap.c2t": "Team collaboration",
      "cap.c2p": "Contacts, roles, and shared project context.",
      "cap.c3t": "Mobile & offline",
      "cap.c3p": "PWA on site when signal is weak.",
      "cap.c4t": "Cost & installments",
      "cap.c4p": "Receivables, down payments, schedules.",
      "cap.c5t": "Owner portal",
      "cap.c5p": "Share progress without exposing books.",
      "cap.c6t": "Bilingual by design",
      "cap.c6p": "English and Persian UI — ready for cross-border teams.",
      "cap.c7t": "Flexible plans",
      "cap.c7p": "Inventory, takeoff, and energy tools in higher tiers.",
      "market.title": "Pilot markets first — then Europe",
      "market.sub":
        "We learn where the pain is acute, then scale as an EU-based SaaS — not as a one-country lifestyle tool.",
      "market.innovT": "Innovation thesis",
      "market.innovP":
        "Metrico’s innovation is not another generic project board. It is a repeatable operating system for the construction pre-sale → build → handover loop: visual unit grids, installment math, site finance, and owner updates in one bilingual offline-capable product. Generic CRMs track contacts; heavyweight construction suites optimize job-site logistics. Mid-size developers still run units, buyers, and receivables in spreadsheets and chat. Metrico closes that gap with software leverage — the same SaaS sold on annual plans — so growth does not require rebuilding a custom agency stack for every project or country.",
      "market.s1n": "01",
      "market.s1t": "Pilot & learn",
      "market.s1p": "Real projects teach unit sales, installments, and owner pressure — before we overbuild.",
      "market.s2n": "02",
      "market.s2t": "Near markets",
      "market.s2p": "Expand into Turkey and the Gulf with the same product core and bilingual UI.",
      "market.s3n": "03",
      "market.s3t": "Europe base",
      "market.s3p": "Company operations from Estonia / EU: talent, billing, and compliance.",
      "market.s4n": "04",
      "market.s4t": "Product scale",
      "market.s4p": "EU payments, deeper takeoff/energy, and market-price insights on the roadmap.",
      "market.m1t": "Why a pilot market",
      "market.m1p":
        "An early operating market (including Iran where we already understand the workflow) is for feedback and product truth — not the end destination. Mid-size developers drowning in spreadsheets are the wedge customer.",
      "market.m2t": "Regional expansion",
      "market.m2p":
        "Next commercial push: Turkey and Gulf developers who share similar pre-sale + installment patterns. Same SaaS, localized go-to-market — not a custom agency rebuild per country.",
      "market.m3t": "European growth",
      "market.m3p":
        "European adopters and partners come after the product is bilingual, field-proven, and company-ready. We sell software subscriptions — not local consulting hours.",
      "market.m4t": "Estonia as operating base",
      "market.m4p":
        "We intend to incorporate and operate from Estonia: hire specialized engineering and international sales talent, complete EU-ready billing, and use Estonian digital infrastructure as HQ — while selling into construction markets beyond any single country.",
      "market.note":
        "Honest note: sample demo data is labeled demo. We do not present it as live paying traction. Early markets teach; Europe is the scale path.",
      "plans.title": "Plans that scale with your portfolio",
      "plans.sub": "Annual billing. Discount codes apply to purchase and renewal.",
      "plans.discountNote": "Have a discount code? Enter it at checkout for purchase or renewal.",
      "plans.payNote": "European card payment is under development. Contact us for EU billing, or use the Persian checkout for local payment when available.",
      "plan.starter": "Starter",
      "plan.starterD": "1 project · core tools",
      "plan.starterPrice": "Free",
      "plan.startCta": "Start free",
      "plan.plus": "Plus",
      "plan.plusD": "More projects · sales & reports",
      "plan.plusPrice": "€50 / year",
      "plan.pro": "Pro",
      "plan.proD": "Inventory · tax prep · deeper finance",
      "plan.proPrice": "€100 / year",
      "plan.ark": "Ark",
      "plan.arkD": "Takeoff · energy · unlimited projects",
      "plan.arkPrice": "€150 / year",
      "plan.buy": "Buy / renew",
      "checkout.title": "Checkout",
      "checkout.listPrice": "List price",
      "checkout.discountLabel": "Discount code",
      "checkout.applyDiscount": "Apply",
      "checkout.payable": "Payable",
      "checkout.pay": "Continue to payment",
      "checkout.hintFa": "You will be redirected to the payment gateway.",
      "checkout.hintEn": "European payment gateway is under development. Email hello@metrico.app for EU billing, or switch the site to Persian for local checkout.",
      "checkout.discountOk": "Discount applied.",
      "checkout.discountBad": "Invalid or expired discount code.",
      "checkout.devEn": "Payment gateway under development for European billing.",
      "checkout.needConfig": "Payment provider is not configured yet. Your order was saved — we will contact you shortly, or email hello@metrico.app.",
      "checkout.error": "Could not start payment. Please try again or contact support.",
      "cta.title": "Evaluate the live product",
      "cta.sub": "Open the working app, try the labeled demo, or email us for a walkthrough.",
      "cta.btn": "Open live application",
      "comp.linkT": "Why teams choose Metrico",
      "comp.linkP": "Our strengths next to familiar tools — international and local — without the noise.",
      "comp.h1": "Where Metrico stands out",
      "comp.lead":
        "A short landscape note for partners and evaluators. We describe Metrico’s advantages only — not a critique of other products.",
      "comp.tone":
        "Other tools are useful in their domains. Below is how Metrico is built for mid-size developers who live in unit sales, installments, and owner updates every day.",
      "comp.intT": "International reference points",
      "comp.intP":
        "Examples many teams already know: Procore and Buildertrend in construction software, Monday.com-style work hubs, and CRM platforms such as Salesforce or HubSpot.",
      "comp.c1t": "Alongside construction suites (e.g. Procore, Buildertrend)",
      "comp.c1p":
        "Metrico is purpose-built for the pre-sale → handover money loop: colored unit grids, installment schedules, buyer receivables, and owner portal links in one calm product — with an installable offline PWA for the field.",
      "comp.c2t": "Alongside work hubs (e.g. Monday.com, Asana)",
      "comp.c2p":
        "Metrico carries construction-native objects out of the box: floors, units, sale status, down payments, installment rows, project ledgers, and PDF reports ready for partners and accountants.",
      "comp.c3t": "Alongside CRM platforms (e.g. Salesforce, HubSpot)",
      "comp.c3p":
        "Metrico keeps the sales contact next to the unit map and the payment plan — so “which units are sold, what is owed, what the owner can see” stays one workflow, not three disconnected systems.",
      "comp.c4t": "Alongside drawing / BIM viewers",
      "comp.c4p":
        "Metrico keeps technical drawings viewable inside the same app that already holds units, finance, and owner updates — so teams stay in one command center.",
      "comp.irT": "Iranian and regional reference points",
      "comp.irP":
        "Familiar local patterns: Excel / Google Sheets portfolios, desktop accounting packages (such as Sepidar or Holoo-class tools), and general CRM or messaging-led sales follow-up.",
      "comp.c5t": "Alongside spreadsheet portfolios",
      "comp.c5p":
        "Metrico turns the same daily questions into a live unit map with automatic contract totals, remaining balances, average sale price per m², and installment ticks — available on phone at the site.",
      "comp.c6t": "Alongside local accounting packages",
      "comp.c6p":
        "Metrico stays close to the project: investor shares, project cash, check views, and owner-safe progress sharing — then exports PDFs that accounting teams can still use.",
      "comp.c7t": "Alongside chat- and CRM-led sales follow-up",
      "comp.c7p":
        "Metrico gives each sold or reserved unit a clear home for buyer data, documents, installment status, and a secure owner link with progress gallery — without exposing the full ledger.",
      "comp.sumT": "Metrico advantages, in one list",
      "comp.s1": "Visual unit grid for sold / reserved / vacant — not only tables.",
      "comp.s2": "Installments, project finance, and investor views tied to the same project.",
      "comp.s3": "Owner portal + gallery without sharing the full books.",
      "comp.s4": "Offline-capable PWA with bilingual English and Persian.",
      "comp.s5": "Higher tiers: inventory, contracts & QC, takeoff, and energy tools.",
      "comp.cta": "Open live app",
      "comp.cta2": "Demo guide",
      "rev.linkT": "Revenue model & unit economics",
      "rev.linkP": "Annual SaaS plans, pricing ladder, and early-stage economics — labeled as a model, not live traction.",
      "rev.print": "Print / Save PDF",
      "rev.h1": "Revenue model & unit economics",
      "rev.lead":
        "A committee-ready note on how Metrico earns money and how we think about early unit economics. Honest early-stage framing — not fake customer metrics.",
      "rev.honestT": "Model / assumptions — not live KPIs",
      "rev.honestP":
        "Figures below describe the product’s pricing ladder and a simple early-stage model. They are not reported CAC, LTV, or MRR from a large paying base. Demo data is labeled demo and is not paying traction.",
      "rev.modelT": "Revenue model",
      "rev.modelP":
        "Metrico is a SaaS product sold on annual subscription plans. Teams start free and upgrade when they need more projects or deeper modules.",
      "rev.m1": "Primary revenue today: paid plan upgrades (Plus, Pro, Ark) on annual prepaid billing.",
      "rev.m2": "Secondary (later, only if product demand proves it): extra seats, add-on modules, or white-label / agency packaging — not claimed as live revenue streams yet.",
      "rev.m3": "We sell software subscriptions — not custom agency rebuilds per project.",
      "rev.ladderT": "Pricing ladder (what each plan unlocks)",
      "rev.ladderP":
        "Limits and feature gates match the live product configuration. European list prices are annual euro amounts; Persian checkout shows local Toman equivalents.",
      "rev.p1t": "Starter — Free",
      "rev.p1p":
        "1 project · up to 15 contacts · up to 10 reminders · core unit sales and expense tools. Entry freemium tier for evaluation and very small portfolios.",
      "rev.p2t": "Plus — €50 / year",
      "rev.p2p":
        "Up to 3 projects · PDF reports · backup/restore · chat · maps · owner portal · project drawings gallery. Unlocks the full day-to-day sales + owner loop.",
      "rev.p3t": "Pro — €100 / year",
      "rev.p3p":
        "Up to 10 projects · project accounting · inventory · contracts · tax prep views · KML export. For teams that need deeper site finance and materials.",
      "rev.p4t": "Ark — €150 / year",
      "rev.p4p":
        "High project ceiling (effectively unlimited for mid-size portfolios) · energy tools · takeoff / quantity estimating. Showcase tier; the labeled demo runs at Ark for evaluation.",
      "rev.payT": "Checkout paths",
      "rev.payP":
        "Billing is productized in the app; gateway readiness differs by region.",
      "rev.pay1": "Iran / Persian checkout: Zarinpal path exists in the payment function; live merchant configuration may still be pending — orders can be saved when the provider is not configured.",
      "rev.pay2": "Europe / English checkout: card billing is under development. Evaluators can email hello@metrico.app for EU billing, or use a founder upgrade code.",
      "rev.pay3": "Discount codes apply to purchase and renewal where checkout is available.",
      "rev.demoT": "Demo versus paid",
      "rev.demoP":
        "Anyone can start on Starter free. Partners and committee evaluators can also use the labeled demo account (demo@metrico.app) for a read-only Ark-level walkthrough — sample data, not paying customers. Password is provided by founders on request.",
      "rev.unitT": "Unit economics (early model)",
      "rev.unitP":
        "Early-stage software: keep assumptions modest and explicit. These are planning targets for a freemium SaaS, not audited live metrics.",
      "rev.u1t": "ARPU (annual)",
      "rev.u1p":
        "List prices: €50 / €100 / €150 per year for Plus / Pro / Ark. Blended ARPU depends on mix; a conservative early mix weighted toward Plus/Pro keeps ARPU in a low three-digit euro range or below.",
      "rev.u2t": "Gross margin (software SaaS)",
      "rev.u2p":
        "Typical pure-software margins are high after hosting and payment fees. We model a credible mid–high software margin once billing is live — not 99% fantasy, and not consulting-heavy COGS.",
      "rev.u3t": "CAC & LTV (targets)",
      "rev.u3p":
        "Target assumption for early GTM: keep CAC low via founder-led demos, content, and partner intros (low three-digit euros or less per paying account). LTV is annual prepaid × expected multi-year retention; even 2–3 years of Plus/Pro can support a healthy LTV:CAC if CAC stays lean. These are model targets until paid cohorts exist.",
      "rev.u4t": "Cash flow shape",
      "rev.u4p":
        "Annual prepaid plans improve early cash collection versus monthly. Freemium lowers acquisition friction; paid conversion is the primary growth lever.",
      "rev.pathT": "Path: freemium → paid",
      "rev.pathP":
        "Learn in a pilot market with real project workflows → convert active teams to Plus/Pro/Ark → expand regionally with the same SaaS core → complete EU-ready billing for international sales. Scale is software leverage, not headcount per project.",
      "rev.sumT": "In one list",
      "rev.s1": "SaaS, annual plans: Starter free → Plus €50 → Pro €100 → Ark €150.",
      "rev.s2": "Primary revenue: upgrades; future add-ons only if demand proves them.",
      "rev.s3": "Iran: Zarinpal path; EU card billing still under development.",
      "rev.s4": "Free Starter + labeled demo for evaluation; no fake paying-customer claims.",
      "rev.s5": "Unit economics shown as early model/assumptions for committee — not live KPI dashboards.",
      "rev.cta": "Open live app",
      "rev.cta2": "Demo guide",
      "ev.linkT": "Market evidence & early validation",
      "ev.linkP": "Founder-as-user proof, small feedback circle, one live project — honest early stage, not scaled traction.",
      "ev.print": "Print / Save PDF",
      "ev.h1": "Market evidence & early validation",
      "ev.lead":
        "How Metrico is being proven in the field today: by a founder who still runs construction projects, a small circle of early operators, and one active project on the live product.",
      "ev.honestT": "Early-stage validation — not scaled commercial traction",
      "ev.honestP":
        "This page is for evaluators. We do not invent company names, paying-customer counts, or growth charts. What follows is the real circle of use and feedback as of now — early validation and design partners, not a claim of market scale.",
      "ev.founderT": "Founder as active user",
      "ev.founderP":
        "Metrico is built by someone who lives the same workflows the product serves. For about ten years the founder has worked across residential and commercial projects in three roles — so product ideas come from the field, not from slides alone.",
      "ev.f1": "Investor on construction projects.",
      "ev.f2": "Supervising engineer (مهندس ناظر) — formal oversight of build quality and compliance.",
      "ev.f3": "Project supervisor / superintendent — day-to-day delivery across many sites.",
      "ev.painT": "The gaps before Metrico",
      "ev.painP":
        "Nobody else around the founder felt these field gaps the same way — which is why he is best placed to drive Metrico’s product direction as a builder, construction project manager, and site supervisor who still uses the tool himself.",
      "ev.pain1": "Information fragmentation across notebooks, spreadsheets, chat, and paper.",
      "ev.pain2": "Manual and paper-heavy processes that break when several projects run at once.",
      "ev.pain3": "Repetitive hand-built statistics and reporting with little reuse.",
      "ev.pain4": "Weak real-time control when supervising multiple projects in parallel.",
      "ev.solvedT": "What Metrico already covers",
      "ev.solvedP":
        "On the founder’s own work, Metrico addresses a major share of those gaps — from financial and accounting issues through progress supervision and owner communication. The founder’s estimate: about 70% of the previous problems and blind spots are now handled in the product.",
      "ev.sol1t": "From money to progress",
      "ev.sol1p":
        "Project finance, unit/sales context, and progress oversight sit in one operating loop instead of scattered files.",
      "ev.sol2t": "Owner communication",
      "ev.sol2p":
        "Updates for owners and stakeholders without rebuilding the same report from scratch every week.",
      "ev.circleT": "Early operators & feedback circle",
      "ev.circleP":
        "Beyond the two co-founders — who design and build the product together — four people are currently reviewing and using Metrico. They help find issues and give practical feedback. Roles in that circle:",
      "ev.cir1": "Project supervisors.",
      "ev.cir2": "Architect / designer.",
      "ev.cir3": "Builder and investor perspectives.",
      "ev.circleNote":
        "Frame this honestly: early validation and design partners — not “X paying customers.” We do not list company names or commercial deal counts here.",
      "ev.liveT": "Current live usage",
      "ev.liveP":
        "One live construction project is currently being run with Metrico. That is the active operating proof today — useful and real, and still early.",
      "ev.pathT": "Where we intend to offer Metrico",
      "ev.pathP":
        "Primary focus is the international market. The product is meant to serve builders in Iran and in Europe — same core software, bilingual interface, field-first workflows. Ambition is geographic reach; traction claims stay limited to what is true above.",
      "ev.sumT": "In one list",
      "ev.s1": "Founder is an active user with ~10 years across investor, supervising engineer, and project superintendent roles.",
      "ev.s2": "Pain was fragmentation, paper/manual work, repetitive reporting, and weak multi-project control.",
      "ev.s3": "Founder estimates ~70% of those gaps are addressed — finance through progress and owner updates.",
      "ev.s4": "Early circle: two co-founders (Mehrzad Saeedi + Serveh Khoshkalam) plus four reviewers/operators in supervisor, architect/designer, builder, and investor roles.",
      "ev.s5": "One active project on Metrico today; intent to offer in Iran and Europe — no inflated customer metrics.",
      "ev.cta": "Open live app",
      "ev.cta2": "Demo guide",
      "mmap.linkT": "2–3 year market map",
      "mmap.linkP": "Year-1 focus weights, ICP, 90-day actions, and directional Year 2–3 channels — labeled as plan assumptions.",
      "mmap.print": "Print / Save PDF",
      "mmap.h1": "2–3 year market map",
      "mmap.lead":
        "Where Metrico intends to spend effort over the next two to three years: dual markets with a heavier European beachhead via an Estonian technical base, honest early-adoption targets, and concrete near-term field actions.",
      "mmap.honestT": "Plan assumptions / operational goals — not guarantees",
      "mmap.honestP":
        "Numbers and weights on this page are founder planning assumptions and go-to-market goals. They are not revenue forecasts, contracted pipeline, or promised conversion rates. We do not invent customers, logos, or traction charts.",
      "mmap.focusT": "Year-1 geographic effort / focus weights",
      "mmap.focusP":
        "These percentages describe where we expect to spend time and attention in Year 1 — not a claimed revenue split by country.",
      "mmap.f1t": "Iran — ~30% of effort",
      "mmap.f1p":
        "Familiar operating market: language, relationships, and field workflows the founders already know. Useful for product feedback and early operators.",
      "mmap.f2t": "Estonia — ~50% of effort",
      "mmap.f2p":
        "Primary company base and technical hiring environment; first customers and pilots; denser product feedback. Beachhead for learning how to sell into the EU — not “50% of revenue from Estonian contractors.”",
      "mmap.f2tFa": "",
      "mmap.f2pFa": "",
      "mmap.f3t": "Other markets — ~20% of effort",
      "mmap.f3p":
        "Later European outreach after the Estonia anchor is working — selective, not a spray of fake regional claims.",
      "mmap.focusNoteEn":
        "Committee framing: Estonia as HQ / base, talent space, early pilots, and EU learning hub — alongside Iran as a known operating market.",
      "mmap.icpT": "Year-1 customers (ICP)",
      "mmap.icpP": "Early buyers and design partners are a mix of construction operators who feel the unit–finance–progress gap:",
      "mmap.icp1": "Builders / developers.",
      "mmap.icp2": "Executors and contractors.",
      "mmap.icp3": "Technical offices and site supervisors.",
      "mmap.icpGtm":
        "Primary go-to-market thesis: grow Metrico as a leading app in its domain through product strength and field referrals.",
      "mmap.adoptT": "12-month adoption goal (assumption)",
      "mmap.adoptP":
        "Operational target: roughly 30–60 early users in the first twelve months. Some will enter with strong discounts; referral discounts will reward introducing colleagues. Frame as early adoption and GTM mechanic — not an ARR promise or paying-conversion guarantee.",
      "mmap.a1": "Target band: ~30–60 early users (assumption).",
      "mmap.a2": "Discounted entry for selected early operators.",
      "mmap.a3": "Referral ladder for introductions to peers on other sites.",
      "mmap.d90T": "Next 90 days — concrete actions",
      "mmap.d90P": "Near-term field work the founders will actually do:",
      "mmap.d1": "Attend one construction / industry exhibition.",
      "mmap.d2": "Meet several construction companies in person.",
      "mmap.d3": "Visit construction sites and workshops.",
      "mmap.d4": "Individual talks with site supervisors to introduce the product and start a first marketing network.",
      "mmap.d90Thesis":
        "Thesis: the best marketer is a power user — site supervisors who run Metrico can refer peers more credibly than cold ads.",
      "mmap.channelsP":
        "Channels we will use: person-to-person introductions, visits to notable construction firms, relevant construction and IT exhibitions, and social / domain platforms. The team will travel for intros when needed. No invented logos or fake stats.",
      "mmap.y23T": "Year 2–3 expansion (directional)",
      "mmap.y23P":
        "Direction only — not invented metrics. After Year-1 beachhead learning:",
      "mmap.y1": "Presence on relevant EU shared / industry platforms where construction buyers look.",
      "mmap.y2": "European marketing partners where a real fit exists.",
      "mmap.y3": "Direct outreach to notable construction firms.",
      "mmap.y4": "Continuous competitor gap analysis to keep Metrico’s strengths clear and product-led.",
      "mmap.notT": "What we will not do",
      "mmap.n1": "Invent customers, paying counts, or growth charts for committee optics.",
      "mmap.n2": "Treat focus weights as a promised revenue share by country.",
      "mmap.n3": "Promise a precise paying-conversion rate before we have measured one.",
      "mmap.crossT": "Related evidence",
      "mmap.crossP": "Founder field credibility and the current early circle are summarized on the market-evidence sheet: ",
      "mmap.crossLink": "Market evidence & early validation",
      "mmap.sumT": "In one list",
      "mmap.s1": "Year-1 effort weights (not revenue): Iran ~30%, Estonia ~50%, other ~20%.",
      "mmap.s2": "ICP mix: builders, contractors/executors, technical offices; GTM = grow Metrico as the leading app.",
      "mmap.s3": "Adoption assumption: ~30–60 early users with discount + referral mechanics — not ARR.",
      "mmap.s4": "90 days: one exhibition, firm meetings, site visits, supervisor network.",
      "mmap.s5": "Year 2–3: EU platforms, partners, direct outreach, competitor gap analysis — no fake traction.",
      "mmap.cta": "Open live app",
      "mmap.cta2": "Demo guide",
      "ep.linkT": "Estonia presence plan",
      "ep.linkP": "Sequence, lean ops model, 90-day actions, and year-1 budget assumption — English committee sheet.",
      "ep.print": "Print / Save PDF",
      "ep.h1": "Estonia presence & settlement plan",
      "ep.lead":
        "How Metrico intends to establish a real Estonian base: initiate e-Residency in parallel, register the company after committee approval, then relocate once the founder’s current construction project finishes — lean early operations with serious commitment.",
      "ep.seqT": "Planned sequence (honest)",
      "ep.seqP":
        "Initiate e-Residency now (can run in parallel with committee prep; not yet started). Register the Estonian company after committee approval. Complete e-Residency and company setup before physical relocation. Relocate with family after the current construction project in the home country finishes — no invented calendar dates.",
      "ep.whyT": "Why Estonia (economic benefit)",
      "ep.whyP":
        "Estonia is the intended EU company base for a multi-tenant SaaS export business — not a local services shop and not an empty letterhead HQ. The goal is to incorporate, hire, pay taxes, and sell software from Estonia to construction teams across markets.",
      "ep.w1": "Register an Estonian company and operate Metrico as EU-based SaaS (billing, compliance, and commercial contracts from Estonia).",
      "ep.w2": "Hire at least one software engineer in Estonia / EU — real employment and skills contribution, not freelancing-as-visa theatre.",
      "ep.w3":
        "Export a repeatable product (annual SaaS plans) from Estonia: same codebase, many customers — marginal cost is hosting/support, not rebuilding a local agency stack per project or country.",
      "ep.w4":
        "Use Estonia’s digital environment as a demanding beachhead to find product gaps early before costly GTM mistakes elsewhere.",
      "ep.modelT": "12-month presence model",
      "ep.modelP":
        "Serious commitment with lean early ops — family relocation as a commitment signal, not lifestyle marketing. Benefit to Estonia comes from company formation, hire, and SaaS export — not from offering on-site local contracting services.",
      "ep.m1": "Both founders relocate once the current home-country construction project is complete (family move).",
      "ep.m2": "Hire one technical / developer team member in Estonia (preferably Estonia / EU).",
      "ep.m3": "Start from home / residence; open a physical office later only if the team grows.",
      "ep.m4": "Operate Metrico actively from Estonia: EU billing path, local validation, and outbound SaaS sales — not a paper presence.",
      "ep.d90T": "First 90 days (Estonia-related)",
      "ep.d90P": "Near-term actions tied to the Estonian base — after the sequence above allows them:",
      "ep.d1": "Register the Estonian company (after committee approval).",
      "ep.d2": "Meet accelerator(s) and relevant ecosystem contacts; begin engineer hiring search.",
      "ep.valT": "Local validation intent",
      "ep.valP":
        "Run Metrico with real operating discipline in Estonia first: find product gaps in a digitally mature market before scaling spend elsewhere. Beachhead learning for an international SaaS — not claimed European traction and not a local-only services business.",
      "ep.langT": "Language roadmap",
      "ep.langP":
        "Product and GTM languages: English first. Next: German for DACH (Germany, Austria, Switzerland). We do not claim German as a common language of the Netherlands or invent other locale claims.",
      "ep.budT": "Year-1 budget assumption",
      "ep.budP":
        "Planned year-1 living + go-to-market budget assumption: €40,000 — covering residence for the founder, spouse, and two children, plus marketing / exhibitions and related early GTM costs. Assumption for planning — not a grant claim or audited spend.",
      "ep.notT": "What this is not",
      "ep.n1": "Not claimed completed e-Residency, company registration, or physical relocation today.",
      "ep.n2": "Not invented customers, office leases, headcount, or M&A narrative.",
      "ep.n3": "Not a local construction contracting / agency business pretending to be a startup.",
      "ep.crossT": "Related sheets",
      "ep.crossP1": "Year-1 geographic effort weights and near-term field actions: ",
      "ep.crossMap": "2–3 year market map",
      "ep.crossP2": ". Founder field credibility and early circle: ",
      "ep.crossEv": "Market evidence & early validation",
      "ep.crossP3": ".",
      "ep.sumT": "In one list",
      "ep.s1": "Sequence: initiate e-Residency now → company after approval → relocate after current project; e-Residency + company before entry.",
      "ep.s2": "Presence: two founders relocate; hire one engineer; home office first; SaaS export from Estonia.",
      "ep.s3": "90 days (Estonia-related): company registration + accelerator meetings + hire search.",
      "ep.s4": "Validate in Estonia’s digital environment; languages EN → German/DACH; sell multi-country SaaS.",
      "ep.s5": "Year-1 living + GTM budget assumption: €40,000 — no fake traction.",
      "ep.cta": "Open live app",
      "ep.cta2": "Demo guide",
      "bp.linkT": "Business plan & founder CV",
      "bp.linkP":
        "Short committee business plan plus founder CV highlights — English sheet (EN-only).",
      "bp.print": "Print / Save PDF",
      "bp.h1": "Business plan & founder summary",
      "bp.lead":
        "A concise committee pack for Metrico: problem → product → model → go-to-market, plus founder CV highlights. Live product first; no invented traction.",
      "bp.honestT": "Committee short form — not a 30-page novel",
      "bp.honestP":
        "This sheet summarizes the operating plan and founder background. Detailed pricing, market map, early evidence, and Estonia presence live on linked pages. We do not invent paying customers, revenue charts, or M&A stories.",
      "bp.secPlan": "1. Business plan",
      "bp.probT": "Problem",
      "bp.probP":
        "Mid-size developers and contractors still run the pre-sale → build → handover loop across spreadsheets, chat, and paper:",
      "bp.prob1": "Unit status, buyers, and installments live in Excel, chat, and notebooks.",
      "bp.prob2": "Site teams need mobile tools that work with weak connectivity.",
      "bp.prob3": "Owners ask for progress while full ledgers must stay private.",
      "bp.prob4":
        "Generic CRMs and heavyweight construction suites miss the unit + installment + site-finance reality of mid-size builders.",
      "bp.solT": "Solution",
      "bp.solP":
        "Metrico is a bilingual offline-capable PWA — an all-in-one site operations tool for the construction site (the Swiss-army knife operators reach for when units, money, and owners collide):",
      "bp.sol1": "Visual floor / unit map: sold, reserved, vacant — not only tables.",
      "bp.sol2": "Auto math: contract from m² × price, remaining debt, average sale price / m².",
      "bp.sol3": "Installments, project costs, investor shares, check & cash reports, PDFs.",
      "bp.sol4": "Owner portal + progress gallery — updates without exposing full ledgers.",
      "bp.sol5": "Installable PWA with offline sync for weak-signal sites.",
      "bp.diffP":
        "Positioning in one line: the all-in-one site operations tool for mid-size construction — credible field utility, not a gimmick brand.",
      "bp.prodT": "Product stage",
      "bp.prodP": "Metrico is a live SaaS / PWA in production use for demos and onboarding — not a slide-only concept.",
      "bp.prod1": "Four annual plans: Starter (free) → Plus → Pro → Ark.",
      "bp.prod2": "Labeled demo account for evaluators (sample data, not traction).",
      "bp.prod3": "Higher tiers unlock inventory, contracts & QC, takeoff, and energy tools.",
      "bp.prod4":
        "Early validation: founder as active user; small feedback circle; one live project — see market-evidence sheet.",
      "bp.mktT": "Market focus",
      "bp.mktP":
        "Year-1 effort weights (planning assumptions — not a promised revenue split):",
      "bp.mkt1": "Iran ~30% — familiar operating market for feedback and early operators.",
      "bp.mkt2":
        "Estonia ~50% — company base, technical hiring, early pilots, and EU beachhead learning.",
      "bp.mkt3": "Other markets ~20% — selective later European outreach after the beachhead works.",
      "bp.modelT": "Business model",
      "bp.modelP":
        "Repeatable B2B SaaS on annual prepaid plans — software subscriptions, not custom agency rebuilds per project.",
      "bp.model1": "Starter — Free (1 project · core tools).",
      "bp.model2": "Plus — €50 / year · Pro — €100 / year · Ark — €150 / year.",
      "bp.model3":
        "Primary revenue: paid upgrades. EU card billing under development; Iran checkout path exists. No invented ARR.",
      "bp.modelLinkP": "Full ladder and unit-economics assumptions: ",
      "bp.modelLink": "Revenue & unit economics",
      "bp.modelLinkEnd": ".",
      "bp.d90T": "Go-to-market — next 90 days",
      "bp.d90P": "Near-term field work (aligned with the market map):",
      "bp.d901": "Attend one construction / industry exhibition.",
      "bp.d902": "Meet several construction companies in person; visit sites and workshops.",
      "bp.d903": "Individual talks with site supervisors to seed a referral network.",
      "bp.d904":
        "Advance committee / e-Residency prep in parallel — company registration after approval (see Estonia presence).",
      "bp.y12T": "12-month priorities (business-first)",
      "bp.y12P":
        "Ordered for company building. Family relocation is an enabling step after the current construction project — detailed sequence on the Estonia presence sheet.",
      "bp.y121":
        "Establish the Estonian company after committee approval; complete e-Residency / company setup needed to operate.",
      "bp.y122":
        "Local validation: run Metrico in Estonia’s digital environment; gather early-user feedback.",
      "bp.y123": "Hire one developer preferably in Estonia / EU.",
      "bp.y124":
        "Investor and customer intro platforms plus a realistic exhibition calendar.",
      "bp.y125": "Grow a site-supervisor referral network and run demos.",
      "bp.y126":
        "Family relocation and suitable housing after (or alongside completion of) the founder’s current construction project — enabling the Estonian base, not the headline goal of this plan.",
      "bp.y12LinkP": "Relocation sequence and year-1 presence assumptions: ",
      "bp.y12Link": "Estonia presence plan",
      "bp.y12LinkEnd": ".",
      "bp.teamT": "Team",
      "bp.teamP": "Current team is intentionally lean:",
      "bp.team1": "Founder (Mehrzad Saeedi) — product, domain, and go-to-market · 70%.",
      "bp.team2":
        "Co-founder (Serveh Khoshkalam) — finance & accounting consultant/analyst; industrial accounting; finance lead at Sepehr Construction Group · 30%.",
      "bp.team3": "Next hire: one developer, preferably Estonia / EU.",
      "bp.riskT": "Risks & mitigations",
      "bp.riskP":
        "Managed risks — honest, not fear-mongering. Mitigations are operational, not guarantees.",
      "bp.r1t": "Geopolitical spillover (Russia–Europe)",
      "bp.r1p":
        "Risk: regional instability affecting travel, sentiment, or capital flows. Mitigation: EU company base, English-first product, diversified beachhead learning — not single-country dependency.",
      "bp.r2t": "Middle East recession pressure",
      "bp.r2p":
        "Risk: weaker demand in familiar early markets. Mitigation: Year-1 effort already weights Estonia / EU beachhead; Iran remains a feedback market, not the end destination.",
      "bp.r3t": "Capital / asset transfer to Estonia",
      "bp.r3p":
        "Risk: timing and compliance friction moving capital. Mitigation: lean year-1 budget assumption (€40k living + GTM on Estonia sheet); start home-office; no invented grants.",
      "bp.r4t": "Product intro timing vs finding prospects",
      "bp.r4p":
        "Risk: product readiness and prospect pipeline misaligned. Mitigation: founder-as-user + supervisor referral network; exhibition and site visits in the 90-day plan.",
      "bp.r5t": "Competing where markets/marketing are less known",
      "bp.r5p":
        "Risk: rivals with deeper local marketing. Mitigation: domain wedge (units + installments + owner portal), honest competitor sheet, beachhead learning before spray spend.",
      "bp.r6t": "EU payments / billing readiness",
      "bp.r6p":
        "Risk: European card checkout still under development. Mitigation: labeled paths (email / founder codes); prioritize EU billing after company setup.",
      "bp.r7t": "Early-team bandwidth",
      "bp.r7p":
        "Risk: two-person team capacity. Mitigation: one EU developer hire as priority #3; scope GTM to exhibitions, referrals, and demos — not heavy paid media.",
      "bp.r8t": "Language / localization & CAC uncertainty",
      "bp.r8p":
        "Risk: beyond EN/FA; CAC not yet measured. Mitigation: EN first, then German/DACH on roadmap; treat CAC/LTV as early model on revenue sheet — no fake conversion rates.",
      "bp.askT": "Ask / next (committee path)",
      "bp.askP": "What we seek from Startup Committee recognition:",
      "bp.ask1":
        "Recognition to build Metrico as an Estonian / EU SaaS company — hire specialized engineering talent and operate from Estonia’s digital infrastructure.",
      "bp.ask2":
        "A clear path to register the company after approval and complete EU-ready billing and compliance.",
      "bp.ask3":
        "Evaluators can open the live app and labeled demo (see Guide) — product evidence before paperwork claims.",
      "bp.secFounder": "2. Founder — MEHRZAD SAEEDI",
      "bp.fnLead":
        "Founder CV highlights for committee review. Contact and LinkedIn below; personal address and family details omitted.",
      "bp.fnPosT": "Why this founder fits Metrico",
      "bp.fnPosP":
        "Familiar with construction-site gaps from three angles — so product direction comes from the field, not from slides alone:",
      "bp.fnPos1": "Urban planning / GIS expert inside a municipality.",
      "bp.fnPos2": "Builder / owner–investor on construction projects.",
      "bp.fnPos3":
        "Construction project manager and site superintendent — day-to-day workshop and site supervision (including ~4 years in superintendent / workshop supervision as project manager and as builder/investor).",
      "bp.fnPos4":
        "Also ~10 years spanning investor, supervising engineer, and project superintendent roles (see market-evidence).",
      "bp.fnEduT": "Education",
      "bp.fnEdu1":
        "Master of geological sciences (petrology) — University of Birjand — completed 2011 (brilliant-talent recognition).",
      "bp.fnEdu2": "Bachelor of geology — University of Zanjan — completed 2007.",
      "bp.fnWorkT": "Selected roles (CV + field years)",
      "bp.fnW1":
        "GIS and urban expert — Baneh Municipality — full time, 2013–2016.",
      "bp.fnW2":
        "Mining exploration supervisor — Baneh Municipality — full time, 2009–2013.",
      "bp.fnW3":
        "GIS expert — Baneh Governorate — 2009 (part time, ~3 months).",
      "bp.fnW4":
        "Manager — Baneh Aftab Derakhshan shopping center — full time, 2016–2020.",
      "bp.fnW5":
        "Surveyor / aerial-photo interpreter — Mabna Naghshe Iranian Bakhtar (own company) — part time, ongoing as of CV.",
      "bp.fnW6":
        "Earlier: computer lab supervisor (Zanjan University, 2005–2007); geology map field expert; geological software instructor (Birjand University, 2009); surveyor for water resources and judiciary (part time).",
      "bp.fnW7":
        "Additional field years (founder statement, beyond the printed CV timeline): ~4 years site superintendent / workshop supervision as construction project manager and as builder/investor.",
      "bp.fnSkillT": "Skills relevant to Metrico",
      "bp.fnSk1": "GIS, mapping, surveying, aerial-photo interpretation; municipal urban / civil project courses.",
      "bp.fnSk2":
        "Tools: ArcGIS track, AutoCAD, Global Mapper, RockWorks, Surfer; total station and multi-frequency GPS.",
      "bp.fnSk3": "Mine supervision; online / web map preparation; ICDL computer skills.",
      "bp.fnSk4":
        "Domain: construction project oversight, unit/finance/progress pain from builder and supervisor seats.",
      "bp.fnLangT": "Languages",
      "bp.fnLangP":
        "Persian (native). English — general and specialized (stated on CV). Product ships bilingual EN / FA.",
      "bp.fnLinkT": "Professional profile",
      "bp.fnLink": "LinkedIn — Mehrzad Saeedi",
      "bp.fnContact": "Email: hello@metrico.app · Founder: mehrzad.saeedi@gmail.com",
      "bp.crossT": "Related committee sheets",
      "bp.crossRev": "Revenue & unit economics",
      "bp.crossMap": "2–3 year market map",
      "bp.crossEv": "Market evidence & early validation",
      "bp.crossEp": "Estonia presence plan",
      "bp.crossComp": "Competitive landscape (why Metrico)",
      "bp.crossOne": "One-pager (print/PDF)",
      "bp.sumT": "In one list",
      "bp.s1": "Live bilingual SaaS for units, installments, site finance, and owner updates.",
      "bp.s2": "Model: annual plans Free → €50 / €100 / €150; no invented ARR.",
      "bp.s3":
        "12-month priorities: company + e-Residency → local validation → hire developer → intros/exhibitions → supervisor network → family relocate as enabling step.",
      "bp.s4": "Team today: two founders (product/GTM + accounting/finance design); next hire = EU developer.",
      "bp.s5": "Founder: municipal GIS/urban + geology MSc + ~4y site supervision + builder/investor — LinkedIn linked.",
      "bp.cta": "Open live app",
      "bp.cta2": "Demo guide",
      "footer.rights": "© Metrico",
      "about.h1": "About Metrico",
      "about.lead":
        "Metrico is a construction project management PWA for developers, contractors, investors, and sales teams who run multiple projects, units, buyers, and ledgers at once.",
      "about.p1":
        "Instead of notebooks, spreadsheets, and chat threads, Metrico unifies unit grids, installment sales, project finance, contacts, and owner updates — with clear visuals and automatic calculations.",
      "about.p2":
        "It runs in the browser on phone, tablet, and desktop. Install to the home screen like a native app. Work offline on site; sync when you are back online.",
      "about.p3":
        "The product ships bilingual English and Persian. Plans from Starter through Ark unlock more projects, inventory, takeoff, and energy tools as teams grow.",
      "about.innovT": "Innovation",
      "about.innovP":
        "Metrico’s innovation is not another generic project board. It is a repeatable operating system for the construction pre-sale → build → handover loop: visual unit grids, installment math, site finance, and owner updates in one bilingual offline-capable product. Generic CRMs track contacts; heavyweight construction suites optimize job-site logistics. Mid-size developers still run units, buyers, and receivables in spreadsheets and chat. Metrico closes that gap with software leverage — the same SaaS sold on annual plans — so growth does not require rebuilding a custom agency stack for every project or country.",
      "about.marketT": "Markets — pilot, then Europe",
      "about.marketP":
        "Path in one line: learn in a pilot market → expand to Turkey and the Gulf → operate from Estonia / EU → sell a repeatable SaaS into European and international construction teams. Iran can be an early feedback market because the unit + installment pain is real there; it is not positioned as the final geography of the company.",
      "about.demoT": "Demo data",
      "about.demoP":
        "The in-app demo account is sample data for product evaluation. It is labeled demo and is not presented as live paying customers or production traction.",
      "about.baseT": "Company direction",
      "about.baseP":
        "We are building Metrico as a scalable EU-oriented SaaS: Estonian / EU company base, specialized engineering and GTM hires, EU-ready billing and compliance, then deeper energy, materials, and market-insight modules.",
      "about.cta": "Open the live app",
      "guide.h1": "Evaluator demo guide",
      "guide.lead":
        "A 10-minute English walkthrough of the live Metrico product — for partners, investors, and program evaluators. No install required.",
      "guide.honestyT": "Demo data is sample data",
      "guide.honestyP":
        "The demo account uses labeled sample projects for product evaluation. It is not presented as live paying customers or production traction.",
      "guide.evalT": "Open the live app (2 minutes)",
      "guide.evalP": "Use a desktop browser first; the same app also runs on phone and tablet.",
      "guide.e1": "Open the live application (button below).",
      "guide.e2": "On the sign-in screen, switch language to English with the FA/EN control (top area).",
      "guide.e3": "Open the side menu and choose Guide.",
      "guide.e4": "In Guide, find Try demo account. Email is demo@metrico.app.",
      "guide.e5": "Enter the demo password provided by the founders (email hello@metrico.app if you do not have it). Password is not stored in public source code.",
      "guide.e6": "You enter a read-only Ark-level sample. Browse freely; saving edits is intentionally disabled.",
      "guide.demoT": "Demo credentials",
      "guide.demoP": "Use only the labeled demo account for evaluation.",
      "guide.demoEmailL": "Email:",
      "guide.demoPass": "Password: request from founders via hello@metrico.app (set in auth; not published in the repository).",
      "guide.demoScope": "Scope: read-only sample project, unit grid, installments, finance views, inventory snapshot, and owner-portal style flows.",
      "guide.tourT": "What to inspect (8–10 minutes)",
      "guide.tourP": "Suggested path through the product surface:",
      "guide.t1": "Dashboard — sample project cards and high-level status.",
      "guide.t2": "Open the sample project — colored unit grid (available / reserved / sold).",
      "guide.t3": "Tap a sold unit — buyer fields, contract amount, installment schedule.",
      "guide.t4": "Project finance / expenses views — cost and cash tracking UI.",
      "guide.t5": "Owner portal concept — secure buyer update link without full ledger access.",
      "guide.t6": "Menu → Subscription Plan — Starter / Plus / Pro / Arc tiers (demo runs as Ark for showcase).",
      "guide.t7": "Optional: Guide sections inside the app for maps, inventory, energy, and takeoff (higher tiers).",
      "guide.ownT": "Optional: create your own free account",
      "guide.ownP": "If you want to type your own data (not required for evaluation):",
      "guide.s1t": "1. Create your account",
      "guide.s1p":
        "Register with email and password. Activation uses an admin code for security. Or stay on the labeled demo for a faster review.",
      "guide.s2t": "2. Set up your company",
      "guide.s2p":
        "Open settings (gear) and add company name and logo — used in the header and PDF reports.",
      "guide.s3t": "3. Create a project",
      "guide.s3p":
        "Add floors and units. Use the colored unit map; open a unit for buyer, contract, and installments.",
      "guide.s4t": "4. Track money & owners",
      "guide.s4p":
        "Record expenses and income, manage investor shares, and share owner portal links.",
      "guide.s5t": "5. Backup & privacy",
      "guide.s5p":
        "Export backups from the app. See the Privacy page for hosting and data rights.",
      "guide.linksT": "Useful links",
      "guide.linkApp": "Live application",
      "guide.linkOnepager": "Official one-pager (EN, print/PDF)",
      "guide.linkAbout": "About Metrico & markets",
      "guide.linkPrivacy": "Privacy policy",
      "guide.linkContact": "Contact",
      "guide.time": "Typical review: about 10 minutes on demo, plus optional deep-dive on higher-tier modules.",
      "guide.cta": "Open live app",
      "guide.ctaMail": "Request demo password",
      "contact.h1": "Contact & support",
      "contact.lead": "We respond to product and onboarding questions — typically within a few business days.",
      "contact.emailLabel": "Email",
      "contact.emailVal": "hello@metrico.app",
      "contact.appLabel": "Live application",
      "contact.appHint": "Sign in, demo mode, and in-app Guide live here.",
      "contact.privacyLabel": "Privacy & data requests",
      "contact.privacyHint": "Account deletion and export are available inside the app; see Privacy for details.",
      "privacy.h1": "Privacy policy",
      "privacy.updated": "Last updated: 2026-07-25",
      "privacy.intro":
        "Metrico is construction project management software. This page summarizes what we process and your choices.",
      "privacy.s1t": "Data we store",
      "privacy.s1p":
        "Account email, company profile, projects (units, buyers, finances, documents), contacts, reminders, inventory, owner portal links, product feedback, and browser cache for offline use.",
      "privacy.s2t": "Hosting",
      "privacy.s2p":
        "Data is stored in Supabase (PostgreSQL + Auth) with row-level security per account. Choose your Supabase region and sign Supabase’s DPA for EU transfers.",
      "privacy.s3t": "Sharing",
      "privacy.s3p":
        "We do not sell your data. Supabase hosts it. Map tiles may send your IP to OpenStreetMap when you use the map. You control exports (PDF/JSON backup).",
      "privacy.s4t": "B2B buyers",
      "privacy.s4p":
        "You (the developer/contractor) are usually the controller for buyer data; Metrico acts as processor for hosting and the owner portal.",
      "privacy.s5t": "Your rights",
      "privacy.s5l1": "Access / portability: backup in the app and server export when enabled.",
      "privacy.s5l2": "Erasure: Company Info → delete account → email verification.",
      "privacy.s5l3": "Contact us for other requests (target 30 business days).",
      "privacy.s6t": "Assistant",
      "privacy.s6p":
        "The in-app assistant is rule-based on your data; chat text is not sent to external LLM APIs.",
      "privacy.back": "← Back to home",
      "privacy.moreT": "More detail",
      "privacy.moreP": "Repository documentation on GitHub:",
      "privacy.more1": "Record of processing (RoPA)",
      "privacy.more2": "Compliance summary",
      "privacy.more3": "Security summary",
    },
    fa: {
      "meta.title.home": "متریکو — مدیریت پروژه ساختمانی",
      "meta.title.about": "درباره — متریکو",
      "meta.title.guide": "راهنمای دمو ارزیاب — متریکو",
      "meta.title.competitors": "چرا متریکو — مقایسهٔ مثبت",
      "meta.title.revenue": "مدل درآمد و واحد اقتصادی — متریکو",
      "meta.title.evidence": "شواهد بازار و اعتبارسنجی اولیه — متریکو",
      "meta.title.mmap": "نقشه بازار ۲–۳ ساله — متریکو",
      "meta.title.estonia": "برنامهٔ حضور استونی — متریکو",
      "meta.title.bizplan": "بیزنس‌پلن و بنیان‌گذار — متریکو",
      "meta.title.contact": "تماس — متریکو",
      "meta.title.privacy": "حریم خصوصی — متریکو",
      "nav.home": "خانه",
      "nav.platform": "بستر",
      "nav.markets": "بازارها",
      "nav.about": "درباره",
      "nav.guide": "راهنما",
      "nav.contact": "تماس",
      "nav.privacy": "حریم خصوصی",
      "nav.openApp": "ورود به اپ",
      "lang.switch": "English",
      "hero.eyebrow": "مرکز فرمان ساخت‌وساز",
      "hero.title": "واحد، پول و مالک — همه در یک جا",
      "hero.lead":
        "اپ دوزبانه برای سازندگان و پیمانکاران: فروش واحد، اقساط، مالی پروژه و به‌روزرسانی مالک — آمادهٔ کارگاه، با همگام‌سازی آفلاین.",
      "hero.chip1": "آفلاین روی کارگاه",
      "hero.chip2": "فارسی و انگلیسی",
      "hero.chip3": "پورتال مالک",
      "hero.chip4": "محصول زنده",
      "hero.cta1": "باز کردن اپ زنده",
      "hero.cta2": "راهنمای دمو",
      "hero.stat1a": "محصول زنده",
      "hero.stat1b": "نه فقط اسلاید",
      "hero.stat2a": "آمادهٔ کارگاه",
      "hero.stat2b": "آفلاین روی سایت",
      "hero.stat3a": "۴ پلن",
      "hero.stat3b": "از رایگان تا ارک",
      "hero.badge": "محصول واقعی · همگام‌سازی آفلاین",
      "hero.imgAlt": "مدیریت ساخت‌وساز روی تبلت",
      "feat.title": "متریکو چه امکاناتی دارد؟",
      "feat.sub":
        "مثل نقشهٔ نرم‌افزار ساختمانی — فروش، مالی، کارگاه و گزارش در یک جریان.",
      "feat.d1h": "بر اساس استقرار",
      "feat.d1l1": "PWA آفلاین — روی کارگاه",
      "feat.d1l2": "نصب از مرورگر — بدون استور",
      "feat.d1l3": "محلی‌اول — همگام‌سازی آنلاین",
      "feat.d2h": "بر اساس کاربرد",
      "feat.d2l1": "واحد و فروش — جدول، خریدار",
      "feat.d2l2": "مالی کارگاه — هزینه، نقد",
      "feat.d2l3": "ارتباط مالک — لینک امن",
      "feat.d3h": "بر اساس گردش کار",
      "feat.d3l1": "پیش‌فروش — رزرو، پلان",
      "feat.d3l2": "در حال ساخت — هزینه، پیشرفت",
      "feat.d3l3": "تحویل — اقساط، پورتال",
      "feat.d4h": "ماژول‌های اصلی",
      "feat.d4l1": "جدول واحدها",
      "feat.d4l2": "دفتر و سرمایه‌گذار",
      "feat.d4l3": "خروجی PDF",
      "cap.title": "برای تیم‌های واقعی ساخت‌وساز",
      "cap.sub": "هفت مزیت وقتی دیگران کافی نیستند",
      "cap.c1t": "چند پروژه",
      "cap.c1p": "از Starter تا Ark — بدون عوض کردن ابزار رشد کنید.",
      "cap.c2t": "همکاری تیم",
      "cap.c2p": "مخاطبین، نقش‌ها و زمینهٔ مشترک پروژه.",
      "cap.c3t": "موبایل و آفلاین",
      "cap.c3p": "PWA روی کارگاه وقتی آنتن ضعیف است.",
      "cap.c4t": "هزینه و اقساط",
      "cap.c4p": "دریافتنی، پیش‌پرداخت، زمان‌بندی.",
      "cap.c5t": "پورتال مالک",
      "cap.c5p": "پیشرفت را بدون افشای دفاتر مالی نشان دهید.",
      "cap.c6t": "دوزبانه از پایه",
      "cap.c6p": "رابط فارسی و انگلیسی — مناسب تیم‌های فرامرزی.",
      "cap.c7t": "پلن‌های انعطاف‌پذیر",
      "cap.c7p": "انبار، متره و انرژی در پلن‌های بالاتر.",
      "market.title": "اول بازار آزمایش — بعد اروپا",
      "market.sub":
        "آنجا که درد حاد است یاد می‌گیریم، سپس به‌عنوان نرم‌افزار اشتراکی با پایگاه اتحادیه اروپا مقیاس می‌گیریم — نه ابزار تک‌کشوری.",
      "market.s1n": "۰۱",
      "market.s1t": "آزمایش و یادگیری",
      "market.s1p": "پروژه‌های واقعی فروش واحد، اقساط و فشار مالک را آموزش می‌دهند — قبل از ساخت بیش‌ازحد.",
      "market.s2n": "۰۲",
      "market.s2t": "بازارهای همسایه",
      "market.s2p": "گسترش به ترکیه و خلیج با همان هستهٔ محصول و رابط دوزبانه.",
      "market.s3n": "۰۳",
      "market.s3t": "پایگاه اروپا",
      "market.s3p": "عملیات شرکت از استونی / اتحادیه اروپا: استعداد، صورتحساب، انطباق.",
      "market.s4n": "۰۴",
      "market.s4t": "مقیاس محصول",
      "market.s4p": "پرداخت اروپایی، عمق متره/انرژی، و بینش قیمت بازار در نقشهٔ راه.",
      "market.m1t": "چرا بازار آزمایش",
      "market.m1p":
        "بازار عملیاتی اولیه (از جمله ایران که گردش‌کارش را می‌شناسیم) برای بازخورد و حقیقت محصول است — نه مقصد نهایی. مشتری نقطهٔ ورود: سازندهٔ متوسط‌مقیاس غرق در اکسل.",
      "market.m2t": "گسترش منطقه‌ای",
      "market.m2p":
        "فشار تجاری بعدی: سازندگان ترکیه و خلیج با الگوی مشابه پیش‌فروش و اقساط. همان نرم‌افزار اشتراکی، ورود به بازار بومی‌شده — نه بازسازی سفارشی آژانس برای هر کشور.",
      "market.m3t": "رشد اروپایی",
      "market.m3p":
        "پذیرندگان و شرکای اروپایی بعد از محصول دوزبانه، اثبات میدانی، و آمادگی شرکتی می‌آیند. اشتراک نرم‌افزار می‌فروشیم — نه ساعت مشاورهٔ محلی.",
      "market.m4t": "استونی به‌عنوان پایگاه عملیات",
      "market.m4p":
        "قصد داریم از استونی ثبت و اداره کنیم: جذب نیروی تخصصی مهندسی و فروش بین‌المللی، تکمیل صورتحساب آمادهٔ اروپا، و استفاده از زیرساخت دیجیتال استونی به‌عنوان مرکز — در حالی که به بازارهای ساختمانی فراتر از یک کشور می‌فروشیم.",
      "market.note":
        "یادداشت صادقانه: دادهٔ نمونهٔ دمو برچسب دمو دارد و به‌عنوان کشش واقعی پرداخت‌کننده معرفی نمی‌شود. بازارهای اولیه آموزش می‌دهند؛ مسیر مقیاس، اروپاست.",
      "plans.title": "پلن‌هایی که با سبد پروژهٔ شما رشد می‌کنند",
      "plans.sub": "صورتحساب سالانه. کد تخفیف برای خرید و تمدید اعمال می‌شود.",
      "plans.discountNote": "کد تخفیف دارید؟ در مرحلهٔ پرداخت برای خرید یا تمدید وارد کنید.",
      "plans.payNote": "پرداخت آنلاین ریالی از همین صفحه فعال می‌شود. برای صورتحساب اروپایی با ما تماس بگیرید.",
      "plan.starter": "آغاز",
      "plan.starterD": "یک پروژه · امکانات پایه",
      "plan.starterPrice": "رایگان",
      "plan.startCta": "شروع رایگان",
      "plan.plus": "پلاس",
      "plan.plusD": "پروژهٔ بیشتر · فروش و گزارش",
      "plan.plusPrice": "۴ میلیون تومان / سال",
      "plan.pro": "پرو",
      "plan.proD": "انبار · آماده‌سازی مالیات · مالی کامل‌تر",
      "plan.proPrice": "۱۰ میلیون تومان / سال",
      "plan.ark": "ارک",
      "plan.arkD": "متره · انرژی · پروژه نامحدود",
      "plan.arkPrice": "۱۶ میلیون تومان / سال",
      "plan.buy": "خرید / تمدید",
      "checkout.title": "پرداخت اشتراک",
      "checkout.listPrice": "قیمت فهرست",
      "checkout.discountLabel": "کد تخفیف",
      "checkout.applyDiscount": "اعمال",
      "checkout.payable": "مبلغ قابل پرداخت",
      "checkout.pay": "ادامهٔ پرداخت",
      "checkout.hintFa": "پس از تأیید به درگاه پرداخت هدایت می‌شوید. کد تخفیف برای خرید و تمدید معتبر است.",
      "checkout.hintEn": "درگاه پرداخت اروپایی در حال توسعه است.",
      "checkout.discountOk": "تخفیف اعمال شد.",
      "checkout.discountBad": "کد تخفیف نامعتبر یا منقضی است.",
      "checkout.devEn": "درگاه پرداخت اروپایی در حال توسعه است.",
      "checkout.needConfig": "درگاه هنوز پیکربندی نشده. سفارش ثبت شد — به‌زودی تماس می‌گیریم یا به hello@metrico.app ایمیل بزنید.",
      "checkout.error": "شروع پرداخت ممکن نشد. دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.",
      "cta.title": "محصول زنده را ارزیابی کنید",
      "cta.sub": "اپ واقعی را باز کنید، دموی برچسب‌خورده را ببینید، یا برای راهنمایی ایمیل بزنید.",
      "cta.btn": "باز کردن اپلیکیشن زنده",
      "comp.linkT": "چرا تیم‌ها متریکو را انتخاب می‌کنند",
      "comp.linkP": "مزایای ما کنار ابزارهای آشنا — خارجی و داخلی — بدون حاشیه.",
      "comp.h1": "متریکو کجا می‌درخشد",
      "comp.lead":
        "یادداشت کوتاه برای شریک و ارزیاب. فقط از مزایای متریکو می‌گوییم — نه نقد محصولات دیگر.",
      "comp.tone":
        "ابزارهای دیگر در حوزهٔ خودشان مفیدند. اینجا می‌گوییم متریکو چطور برای سازندهٔ متوسط‌مقیاسی ساخته شده که هر روز با واحد، اقساط و به‌روزرسانی مالک زندگی می‌کند.",
      "comp.intT": "نمونه‌های بین‌المللی آشنا",
      "comp.intP":
        "نمونه‌هایی که خیلی از تیم‌ها می‌شناسند: پروکُر و بیلدرترند در نرم‌افزار ساخت، هاب‌های کاری شبیه ماندی‌دات‌کام، و سی‌آر‌امهایی مثل سیِیلزفورس یا هاب‌اسپات.",
      "comp.c1t": "کنار سوئیت‌های ساختمانی (مثل پروکُر، بیلدرترند)",
      "comp.c1p":
        "متریکو برای حلقهٔ پیش‌فروش تا تحویل پول ساخته شده: جدول رنگی واحد، اقساط، مطالبات خریدار و لینک پورتال مالک در یک محصول آرام — با وب‌اپ آفلاین قابل نصب برای کارگاه.",
      "comp.c2t": "کنار هاب‌های کاری (مثل ماندی‌دات‌کام، آسانا)",
      "comp.c2p":
        "متریکو از اول اشیای ساختمانی دارد: طبقه، واحد، وضعیت فروش، پیش‌پرداخت، ردیف اقساط، دفتر پروژه و گزارش پی‌دی‌اف آماده برای شریک و حسابدار.",
      "comp.c3t": "کنار سی‌آر‌ام (مثل سیِیلزفورس، هاب‌اسپات)",
      "comp.c3p":
        "متریکو مخاطب فروش را کنار نقشهٔ واحد و برنامهٔ پرداخت نگه می‌دارد — تا «کدام واحد فروخته، چقدر مانده، مالک چه می‌بیند» یک جریان باشد نه سه سیستم جدا.",
      "comp.c4t": "کنار نمایشگرهای نقشه / مدل",
      "comp.c4p":
        "متریکو نقشه‌های فنی را داخل همان اپی نشان می‌دهد که واحد، مالی و به‌روزرسانی مالک را هم دارد — تا تیم در یک مرکز فرمان بماند.",
      "comp.irT": "نمونه‌های ایرانی و منطقه‌ای آشنا",
      "comp.irP":
        "الگوهای آشنای محلی: سبد پروژه در اکسل / شیت، نرم‌افزارهای حسابداری رومیزی (در حد سپیدار یا هلو)، و پیگیری فروش با سی‌آر‌ام عمومی یا پیام‌رسان.",
      "comp.c5t": "کنار سبد اکسلی پروژه‌ها",
      "comp.c5p":
        "متریکو همان سوال‌های روزانه را به نقشهٔ زندهٔ واحد تبدیل می‌کند: مبلغ قرارداد خودکار، مانده، میانگین قیمت هر متر، تیک اقساط — روی موبایل در کارگاه.",
      "comp.c6t": "کنار بسته‌های حسابداری محلی",
      "comp.c6p":
        "متریکو نزدیک پروژه می‌ماند: سهم سرمایه‌گذار، نقد پروژه، نمای چک، و اشتراک پیشرفت امن با مالک — بعد پی‌دی‌افهایی که تیم حسابداری هم می‌تواند استفاده کند.",
      "comp.c7t": "کنار پیگیری فروش با چت و سی‌آر‌ام عمومی",
      "comp.c7p":
        "متریکو برای هر واحد فروخته یا رزرو، خانهٔ روشنی برای دادهٔ خریدار، مدارک، وضعیت اقساط و لینک امن مالک با گالری پیشرفت دارد — بدون افشای دفتر کامل.",
      "comp.sumT": "مزایای متریکو در یک فهرست",
      "comp.s1": "جدول بصری واحد برای فروخته / رزرو / خالی — نه فقط جدول متنی.",
      "comp.s2": "اقساط، مالی پروژه و نمای سرمایه‌گذار روی همان پروژه.",
      "comp.s3": "پورتال مالک + گالری بدون اشتراک دفتر کامل.",
      "comp.s4": "وب‌اپ آفلاین با فارسی و انگلیسی.",
      "comp.s5": "پلن‌های بالاتر: انبار، قرارداد و کنترل کیفیت، متره و انرژی.",
      "comp.cta": "باز کردن اپ زنده",
      "comp.cta2": "راهنمای دمو",
      "rev.linkT": "مدل درآمد و واحد اقتصادی",
      "rev.linkP": "پلن‌های سالانه، نردبان قیمت، و اقتصاد اولیه — به‌عنوان مدل، نه کشش پرداخت‌شده.",
      "rev.print": "چاپ / ذخیره پی‌دی‌اف",
      "rev.h1": "مدل درآمد و واحد اقتصادی",
      "rev.lead":
        "یادداشت آماده برای ارزیاب دربارهٔ نحوهٔ درآمد متریکو و نگاه اولیه به واحد اقتصادی. روایت صادقانهٔ مرحلهٔ ابتدایی — بدون آمار جعلی مشتری.",
      "rev.honestT": "مدل / فرض — نه شاخص زنده",
      "rev.honestP":
        "اعداد زیر نردبان قیمت محصول و یک مدل سادهٔ مرحلهٔ ابتدایی را توصیف می‌کنند. سی‌ای‌سی، ال‌تی‌وی یا درآمد ماهانه از پایهٔ بزرگ پرداخت‌کننده گزارش نمی‌شود. دادهٔ دمو برچسب دمو دارد و کشش پرداخت‌شده نیست.",
      "rev.modelT": "مدل درآمد",
      "rev.modelP":
        "متریکو یک محصول نرم‌افزاری اشتراکی با پلن‌های سالانه است. تیم‌ها رایگان شروع می‌کنند و وقتی پروژه یا ماژول بیشتری لازم دارند ارتقا می‌دهند.",
      "rev.m1": "درآمد اصلی امروز: ارتقا به پلن‌های پولی (پلاس، پرو، ارک) با صورتحساب پیش‌پرداخت سالانه.",
      "rev.m2": "درآمد ثانویه (بعداً، فقط اگر تقاضا ثابت شود): صندلی اضافه، افزونه، یا بسته‌بندی وایت‌لیبل / آژانس — هنوز به‌عنوان جریان درآمد زنده ادعا نمی‌شود.",
      "rev.m3": "ما اشتراک نرم‌افزار می‌فروشیم — نه بازسازی سفارشی آژانسی برای هر پروژه.",
      "rev.ladderT": "نردبان قیمت (هر پلن چه باز می‌کند)",
      "rev.ladderP":
        "سقف‌ها و قفل امکانات با پیکربندی محصول زنده هم‌خوان است. قیمت اروپایی سالانه به یورو است؛ تسویهٔ فارسی معادل تومانی نشان می‌دهد.",
      "rev.p1t": "آغاز — رایگان",
      "rev.p1p":
        "۱ پروژه · تا ۱۵ مخاطب · تا ۱۰ یادآور · فروش واحد و هزینهٔ پایه. پلن رایگان برای ارزیابی و سبد خیلی کوچک.",
      "rev.p2t": "پلاس — ۴ میلیون تومان / سال",
      "rev.p2p":
        "تا ۳ پروژه · گزارش پی‌دی‌اف · پشتیبان · چت · نقشه · پورتال مالک · گالری نقشهٔ فنی. حلقهٔ روزمرهٔ فروش و مالک را باز می‌کند.",
      "rev.p3t": "پرو — ۱۰ میلیون تومان / سال",
      "rev.p3p":
        "تا ۱۰ پروژه · حسابداری پروژه · انبار · قرارداد · نمای مالیات · خروجی کی‌ام‌ال. برای تیم‌هایی که مالی عمیق‌تر و مصالح می‌خواهند.",
      "rev.p4t": "ارک — ۱۶ میلیون تومان / سال",
      "rev.p4p":
        "سقف بالای پروژه (برای سبد متوسط‌مقیاس عملاً نامحدود) · انرژی · متره و برآورد. سطح نمایش؛ دموی برچسب‌خورده برای ارزیابی در سطح ارک اجرا می‌شود.",
      "rev.payT": "مسیر پرداخت",
      "rev.payP":
        "صورتحساب در اپ تعریف شده؛ آمادگی درگاه بر اساس منطقه فرق دارد.",
      "rev.pay1": "ایران / تسویهٔ فارسی: مسیر زرین‌پال در تابع پرداخت وجود دارد؛ پیکربندی مرچنت زنده ممکن است هنوز ناقص باشد — وقتی درگاه پیکربندی نشده، سفارش می‌تواند ثبت شود.",
      "rev.pay2": "اروپا / تسویهٔ انگلیسی: پرداخت کارتی در حال توسعه است. ارزیاب می‌تواند برای صورتحساب اروپایی به hello@metrico.app ایمیل بزند یا از کد ارتقای بنیان‌گذار استفاده کند.",
      "rev.pay3": "کد تخفیف در خرید و تمدید، هرجا تسویه فعال باشد، اعمال می‌شود.",
      "rev.demoT": "دمو در برابر پولی",
      "rev.demoP":
        "هر کسی می‌تواند با آغاز رایگان شروع کند. شریک و ارزیاب می‌توانند حساب دموی برچسب‌خورده (demo@metrico.app) را برای مرور فقط‌مشاهده در سطح ارک استفاده کنند — دادهٔ نمونه، نه مشتری پرداخت‌کننده. رمز را بنیان‌گذاران در صورت درخواست می‌دهند.",
      "rev.unitT": "واحد اقتصادی (مدل اولیه)",
      "rev.unitP":
        "نرم‌افزار مرحلهٔ ابتدایی: فرض‌ها را ساده و شفاف نگه می‌داریم. این‌ها هدف برنامه‌ریزی برای فریمیوم است، نه متریک حسابرسی‌شدهٔ زنده.",
      "rev.u1t": "درآمد متوسط هر حساب (سالانه)",
      "rev.u1p":
        "قیمت فهرست: پلاس / پرو / ارک مطابق پلن‌های سایت. میانگین واقعی به ترکیب پلن بستگی دارد؛ ترکیب محافظه‌کارانهٔ زودهنگام معمولاً میانگین را پایین نگه می‌دارد.",
      "rev.u2t": "حاشیهٔ ناخالص (نرم‌افزار)",
      "rev.u2p":
        "حاشیهٔ معمول نرم‌افزار خالص بعد از میزبانی و کارمزد پرداخت بالاست. بعد از فعال‌شدن صورتحساب، حاشیهٔ معتبر میانه‌بالا را مدل می‌کنیم — نه خیال ۹۹٪ و نه هزینهٔ سنگین مشاوره.",
      "rev.u3t": "هزینهٔ جذب و ارزش طول عمر (هدف)",
      "rev.u3p":
        "فرض هدف برای شروع: هزینهٔ جذب را با دموی بنیان‌گذار، محتوا و معرفی شریک پایین نگه داریم. ارزش طول عمر برابر پیش‌پرداخت سالانه × ماندگاری چندساله است؛ حتی ۲–۳ سال پلاس/پرو می‌تواند نسبت سالمی بسازد اگر جذب ارزان بماند. تا وقتی کوهورت پولی نباشد، این‌ها هدف مدل‌اند.",
      "rev.u4t": "شکل جریان نقد",
      "rev.u4p":
        "پلن سالانهٔ پیش‌پرداخت نسبت به ماهانه نقد زودتری می‌آورد. فریمیوم اصطکاک جذب را کم می‌کند؛ تبدیل به پولی اهرم اصلی رشد است.",
      "rev.pathT": "مسیر: رایگان ← پولی",
      "rev.pathP":
        "یادگیری با گردش‌کار واقعی پروژه ← تبدیل تیم‌های فعال به پلاس/پرو/ارک ← گسترش منطقه‌ای با همان هستهٔ محصول ← تکمیل صورتحساب بین‌المللی. مقیاس از اهرم نرم‌افزار است، نه نیروی انسانی برای هر پروژه.",
      "rev.sumT": "در یک فهرست",
      "rev.s1": "نرم‌افزار اشتراکی سالانه: آغاز رایگان ← پلاس ← پرو ← ارک (قیمت‌ها در بخش پلن‌ها).",
      "rev.s2": "درآمد اصلی: ارتقا؛ افزونه‌های بعدی فقط اگر تقاضا ثابت شود.",
      "rev.s3": "ایران: مسیر زرین‌پال؛ پرداخت کارتی اروپا هنوز در حال توسعه.",
      "rev.s4": "آغاز رایگان + دموی برچسب‌خورده برای ارزیابی؛ بدون ادعای مشتری پرداخت‌کنندهٔ جعلی.",
      "rev.s5": "واحد اقتصادی به‌عنوان مدل/فرض اولیه برای ارزیاب — نه داشبورد شاخص زنده.",
      "rev.cta": "باز کردن اپ زنده",
      "rev.cta2": "راهنمای دمو",
      "ev.linkT": "شواهد بازار و اعتبارسنجی اولیه",
      "ev.linkP": "اثبات با کاربر واقعی بنیان‌گذار، حلقهٔ بازخورد کوچک، یک پروژهٔ زنده — مرحلهٔ اولیهٔ صادقانه، نه کشش مقیاس‌یافته.",
      "ev.print": "چاپ / ذخیره پی‌دی‌اف",
      "ev.h1": "شواهد بازار و اعتبارسنجی اولیه",
      "ev.lead":
        "متریکو امروز چطور در میدان اثبات می‌شود: بنیان‌گذاری که هنوز پروژهٔ ساختمانی می‌گرداند، حلقهٔ کوچکی از کاربران اولیه، و یک پروژهٔ فعال روی محصول زنده.",
      "ev.honestT": "اعتبارسنجی اولیه — نه کشش تجاری مقیاس‌یافته",
      "ev.honestP":
        "این صفحه برای معرفی صادقانهٔ محصول است. نام شرکت جعلی، تعداد مشتری پرداخت‌کننده، یا نمودار رشد ساختگی نداریم. آنچه می‌خوانید همان حلقهٔ واقعی استفاده و بازخورد امروز است — شرکای طراحی و اعتبارسنجی اولیه، نه ادعای مقیاس بازار.",
      "ev.founderT": "بنیان‌گذار به‌عنوان کاربر فعال",
      "ev.founderP":
        "متریکو را کسی ساخته که همان گردش‌کارهایی را زندگی می‌کند که محصول پوشش می‌دهد. حدود ده سال، بنیان‌گذار در پروژه‌های مسکونی و تجاری در سه نقش کار کرده — پس ایده‌های محصول از کارگاه می‌آید، نه فقط از اسلاید.",
      "ev.f1": "سرمایه‌گذار در پروژه‌های ساختمانی.",
      "ev.f2": "مهندس ناظر — نظارت رسمی بر کیفیت و انطباق ساخت.",
      "ev.f3": "سرپرست / ناظر اجرایی پروژه — تحویل روزبه‌روز در چند کارگاه.",
      "ev.painT": "خلأها قبل از متریکو",
      "ev.painP":
        "اطراف بنیان‌گذار کسی این خلأهای میدانی را به همین شدت حس نمی‌کرد — برای همین، به‌عنوان سازنده، مدیر پروژهٔ ساختمانی و سرپرست کارگاه که خودش از ابزار استفاده می‌کند، بهترین جایگاه را برای هدایت ایده‌های محصول دارد.",
      "ev.pain1": "پراکندگی اطلاعات بین دفترچه، اکسل، پیام و کاغذ.",
      "ev.pain2": "فرآیندهای دستی و کاغذی که وقتی چند پروژه هم‌زمان می‌شود می‌شکنند.",
      "ev.pain3": "آمار و گزارش‌های تکراری دستی با استفادهٔ مجدد کم.",
      "ev.pain4": "کنترل لحظه‌ای ضعیف هنگام نظارت هم‌زمان چند پروژه.",
      "ev.solvedT": "متریکو الان چه بخشی را پوشش می‌دهد",
      "ev.solvedP":
        "روی کار خود بنیان‌گذار، متریکو بخش بزرگی از این خلأها را پوشش می‌دهد — از مسائل مالی و حسابداری تا نظارت پیشرفت و ارتباط با مالک. برآورد بنیان‌گذار: حدود ۷۰٪ مشکلات و نقاط کور قبلی الان در محصول حل می‌شود.",
      "ev.sol1t": "از پول تا پیشرفت",
      "ev.sol1p":
        "مالی پروژه، زمینهٔ واحد/فروش، و نظارت پیشرفت در یک حلقهٔ عملیاتی می‌نشینند — نه در فایل‌های پراکنده.",
      "ev.sol2t": "ارتباط با مالک",
      "ev.sol2p":
        "به‌روزرسانی برای مالک و ذی‌نفعان بدون ساختن دوبارهٔ همان گزارش هر هفته.",
      "ev.circleT": "حلقهٔ کاربران اولیه و بازخورد",
      "ev.circleP":
        "علاوه بر دو بنیان‌گذار — که با هم محصول را طراحی و می‌سازند — الان چهار نفر متریکو را بررسی و استفاده می‌کنند. کمک می‌کنند ایرادها پیدا شود و بازخورد کاربردی بدهند. نقش‌ها در این حلقه:",
      "ev.cir1": "سرپرستان پروژه.",
      "ev.cir2": "معمار / طراح.",
      "ev.cir3": "نگاه سازنده و سرمایه‌گذار.",
      "ev.circleNote":
        "صادقانه بگوییم: اعتبارسنجی اولیه و شرکای طراحی — نه «چند مشتری پرداخت‌کننده». اینجا نام شرکت یا تعداد قرارداد تجاری نمی‌آوریم.",
      "ev.liveT": "استفادهٔ زندهٔ فعلی",
      "ev.liveP":
        "الان یک پروژهٔ ساختمانی زنده با متریکو مدیریت می‌شود. این همان اثبات عملی امروز است — واقعی و مفید، و هنوز اولیه.",
      "ev.pathT": "قصد عرضهٔ محصول",
      "ev.pathP":
        "هدف، خدمت به سازندگان در بازار محلی و بازارهای گسترده‌تر است — همان هستهٔ نرم‌افزار، رابط دوزبانه، گردش‌کار میدان‌محور. برنامه‌ها و امکانات متریکو برای کار روزمرهٔ تیم ساخت طراحی شده‌اند؛ ادعای کشش فقط همان چیزی است که بالا آمده.",
      "ev.sumT": "در یک فهرست",
      "ev.s1": "بنیان‌گذار کاربر فعال است با حدود ۱۰ سال در نقش‌های سرمایه‌گذار، مهندس ناظر و سرپرست پروژه.",
      "ev.s2": "درد اصلی: پراکندگی، کار دستی/کاغذی، گزارش تکراری، کنترل ضعیف چندپروژه‌ای.",
      "ev.s3": "برآورد بنیان‌گذار: حدود ۷۰٪ این خلأها پوشش داده شده — از مالی تا پیشرفت و ارتباط مالک.",
      "ev.s4": "حلقهٔ اولیه: دو بنیان‌گذار (مهرزاد سعیدی + سروه خوشکلام) به‌اضافهٔ چهار بازبین/کاربر در نقش سرپرست، معمار/طراح، سازنده و سرمایه‌گذار.",
      "ev.s5": "یک پروژهٔ فعال روی متریکو امروز؛ تمرکز روی ارزش عملی محصول و پلن‌ها — بدون آمار مشتری جعلی.",
      "ev.cta": "باز کردن اپ زنده",
      "ev.cta2": "راهنمای دمو",
      "mmap.linkT": "نقشه بازار ۲–۳ ساله",
      "mmap.linkP": "وزن تمرکز سال اول، مخاطب اولیه، اقدامات ۹۰ روزه، و جهت گسترش سال‌های بعد — به‌عنوان فرض برنامه، نه تضمین.",
      "mmap.print": "چاپ / ذخیره پی‌دی‌اف",
      "mmap.h1": "نقشه بازار ۲–۳ ساله",
      "mmap.lead":
        "متریکو در دو تا سه سال آینده کجا وقت و توجه می‌گذارد: بازار آشنای محلی به‌اضافهٔ گسترش بین‌المللی محصول، هدف‌های صادقانهٔ پذیرش اولیه، و اقدامات میدانی نزدیک.",
      "mmap.honestT": "فرض‌های برنامه / اهداف عملیاتی — نه تضمین",
      "mmap.honestP":
        "اعداد و وزن‌های این صفحه فرض برنامه‌ریزی بنیان‌گذار و اهداف ورود به بازارند. پیش‌بینی درآمد قراردادی، خط لولهٔ امضاشده، یا وعدهٔ نرخ تبدیل پرداخت نیستند. مشتری، لوگو یا نمودار کشش جعلی نمی‌سازیم.",
      "mmap.focusT": "وزن تمرکز جغرافیایی سال اول (تلاش، نه سهم درآمد)",
      "mmap.focusP":
        "این درصدها جایی را نشان می‌دهند که در سال اول وقت و توجه می‌گذاریم — نه سهم درآمد ادعا‌شده بر اساس کشور.",
      "mmap.f1t": "بازار آشنای محلی — حدود ۳۰٪ تلاش",
      "mmap.f1p":
        "بازاری که زبان، روابط و گردش‌کار میدانی‌اش را می‌شناسیم. برای بازخورد محصول و کاربران اولیه مفید است.",
      "mmap.f2t": "",
      "mmap.f2p": "",
      "mmap.f2tFa": "گسترش بین‌المللی محصول — حدود ۵۰٪ تلاش",
      "mmap.f2pFa":
        "تمرکز سنگین‌تر روی بازارهای محصول در اروپا و محیط فنی مناسب برای تیم و پایلوت‌های اولیه — به‌عنوان نقطهٔ اتکای یادگیری فروش بین‌المللی، نه وعدهٔ سهم درآمد از یک کشور خاص.",
      "mmap.f3t": "بازارهای دیگر — حدود ۲۰٪ تلاش",
      "mmap.f3p":
        "گسترش گزینشی اروپا و مناطق مرتبط بعد از تثبیت نقطهٔ اتکای اولیه — نه پخش ادعاهای منطقه‌ای ساختگی.",
      "mmap.focusNoteEn": "",
      "mmap.icpT": "مخاطب سال اول",
      "mmap.icpP": "خریداران و شرکای طراحی اولیه ترکیبی از فعالان ساخت هستند که شکاف واحد–مالی–پیشرفت را حس می‌کنند:",
      "mmap.icp1": "سازندگان / توسعه‌دهندگان.",
      "mmap.icp2": "مجریان و پیمانکاران.",
      "mmap.icp3": "دفاتر فنی و سرپرستان کارگاه.",
      "mmap.icpGtm":
        "فرض اصلی ورود به بازار: رشد متریکو به‌عنوان اپ پیشرو در حوزهٔ خودش از راه قدرت محصول و معرفی میدانی.",
      "mmap.adoptT": "هدف پذیرش ۱۲ ماهه (فرض)",
      "mmap.adoptP":
        "هدف عملیاتی: حدود ۳۰ تا ۶۰ کاربر اولیه در دوازده ماه اول. برخی با تخفیف جدی وارد می‌شوند؛ تخفیف معرفی همکار برای معرفی همتایان. این را به‌عنوان پذیرش اولیه و مکانیک ورود به بازار بخوانید — نه وعدهٔ درآمد سالانه یا تضمین تبدیل پرداخت.",
      "mmap.a1": "بازهٔ هدف: حدود ۳۰ تا ۶۰ کاربر اولیه (فرض).",
      "mmap.a2": "ورود تخفیف‌دار برای بخشی از کاربران اولیه.",
      "mmap.a3": "نردبان معرفی برای آوردن همتایان در کارگاه‌های دیگر.",
      "mmap.d90T": "۹۰ روز آینده — اقدامات مشخص",
      "mmap.d90P": "کار میدانی نزدیک که انجام می‌دهیم:",
      "mmap.d1": "حضور در یک نمایشگاه ساختمانی / صنعتی.",
      "mmap.d2": "ملاقات حضوری با چند شرکت ساختمانی.",
      "mmap.d3": "بازدید از کارگاه‌ها و سایت‌های ساخت.",
      "mmap.d4": "گفت‌وگوی فردی با سرپرستان کارگاه برای معرفی محصول و شروع شبکهٔ اولیهٔ بازاریابی.",
      "mmap.d90Thesis":
        "فرض: بهترین بازاریاب، کاربر قدرتمند است — سرپرست کارگاهی که متریکو را جدی استفاده کند، همتایان را معتبرتر از تبلیغ سرد معرفی می‌کند.",
      "mmap.channelsP":
        "کانال‌هایی که استفاده می‌کنیم: معرفی نفر‌به‌نفر، بازدید از شرکت‌های ساختمانی شناخته‌شده، نمایشگاه‌های مرتبط ساخت و فناوری، و بسترهای اجتماعی / تخصصی مرتبط. در صورت نیاز برای معرفی حضوری سفر می‌کنیم. لوگو یا آمار جعلی نمی‌سازیم.",
      "mmap.y23T": "گسترش سال ۲ و ۳ (جهت‌دار)",
      "mmap.y23P":
        "فقط جهت — بدون متریک ساختگی. بعد از یادگیری نقطهٔ اتکای سال اول:",
      "mmap.y1": "حضور در بسترهای مشترک / صنعتی مرتبط که خریداران ساخت آنجا می‌گردند.",
      "mmap.y2": "شرکای بازاریابی اروپایی هرجا تناسب واقعی باشد.",
      "mmap.y3": "ارتباط مستقیم با شرکت‌های ساختمانی شاخص.",
      "mmap.y4": "تحلیل پیوستهٔ شکاف رقبا برای روشن نگه‌داشتن نقاط قوت متریکو و مسیر محصول‌محور.",
      "mmap.notT": "چه کارهایی نمی‌کنیم",
      "mmap.n1": "ساخت مشتری، تعداد پرداخت‌کننده، یا نمودار رشد برای ظاهر کمیته.",
      "mmap.n2": "تلقی وزن تمرکز به‌عنوان سهم درآمد وعده‌داده‌شده بر اساس کشور.",
      "mmap.n3": "وعدهٔ نرخ تبدیل پرداخت دقیق قبل از اندازه‌گیری واقعی.",
      "mmap.crossT": "شواهد مرتبط",
      "mmap.crossP": "اعتبار میدانی بنیان‌گذار و حلقهٔ اولیه در برگهٔ شواهد بازار آمده است: ",
      "mmap.crossLink": "شواهد بازار و اعتبارسنجی اولیه",
      "mmap.sumT": "در یک فهرست",
      "mmap.s1": "وزن تلاش سال اول (نه درآمد): بازار محلی حدود ۳۰٪، گسترش بین‌المللی حدود ۵۰٪، سایر حدود ۲۰٪.",
      "mmap.s2": "مخاطب: سازنده، پیمانکار/مجری، دفتر فنی؛ ورود به بازار = رشد متریکو به‌عنوان اپ پیشرو.",
      "mmap.s3": "فرض پذیرش: حدود ۳۰ تا ۶۰ کاربر اولیه با تخفیف و معرفی — نه وعدهٔ درآمد.",
      "mmap.s4": "۹۰ روز: یک نمایشگاه، ملاقات شرکت‌ها، بازدید کارگاه، شبکهٔ سرپرستان.",
      "mmap.s5": "سال ۲–۳: بسترها، شرکا، ارتباط مستقیم، تحلیل شکاف رقبا — بدون کشش جعلی.",
      "mmap.cta": "باز کردن اپ زنده",
      "mmap.cta2": "راهنمای دمو",
      "ep.linkT": "برنامهٔ حضور استونی",
      "ep.linkP": "برگهٔ انگلیسی کمیته — در رابط فارسی نمایش داده نمی‌شود.",
      "bp.linkT": "بیزنس‌پلن و رزومهٔ بنیان‌گذار",
      "bp.linkP": "برگهٔ انگلیسی کمیته — در رابط فارسی نمایش داده نمی‌شود.",
      "footer.rights": "© متریکو",
      "about.h1": "دربارهٔ متریکو",
      "about.lead":
        "متریکو یک پلتفرم مدیریت پروژهٔ ساختمانی برای سازندگان، پیمانکاران، سرمایه‌گذاران و تیم فروش است — کسانی که چند پروژه، واحد، خریدار و دفتر مالی را هم‌زمان دنبال می‌کنند.",
      "about.p1":
        "به‌جای دفترچه، اکسل و پیام‌های پراکنده، جدول واحد، فروش اقساطی، مالی پروژه، مخاطبین و به‌روزرسانی مالک در یک جا جمع می‌شود — با نمایش شفاف و محاسبات خودکار.",
      "about.p2":
        "در مرورگر روی موبایل، تبلت و رایانه اجرا می‌شود و مثل اپ روی صفحهٔ اصلی نصب می‌شود. روی کارگاه آفلاین کار کنید؛ وقتی آنلاین شدید همگام کنید.",
      "about.p3":
        "محصول از ابتدا دوزبانهٔ انگلیسی و فارسی است. پلن‌ها از آغاز تا ارک با رشد تیم، پروژه، انبار، متره و انرژی را باز می‌کنند.",
      "about.marketT": "",
      "about.marketP": "",
      "about.demoT": "دادهٔ نمایشی",
      "about.demoP":
        "حساب دمو داخل اپ دادهٔ نمونه برای ارزیابی محصول است. برچسب دمو دارد و به‌عنوان مشتری پرداخت‌کننده معرفی نمی‌شود.",
      "about.baseT": "",
      "about.baseP": "",
      "about.cta": "باز کردن اپ زنده",
      "guide.h1": "راهنمای دمو برای ارزیاب",
      "guide.lead":
        "مرور حدود ۱۰ دقیقه‌ای محصول زندهٔ متریکو — برای شریک، سرمایه‌گذار و ارزیاب برنامه. نصب لازم نیست.",
      "guide.honestyT": "دادهٔ دمو نمونه است",
      "guide.honestyP":
        "حساب دمو پروژه‌های برچسب‌خوردهٔ نمونه برای ارزیابی محصول است و به‌عنوان مشتری پرداخت‌کننده یا کشش واقعی بازار معرفی نمی‌شود.",
      "guide.evalT": "باز کردن اپ زنده (حدود ۲ دقیقه)",
      "guide.evalP": "ابتدا روی مرورگر دسکتاپ؛ همان اپ روی موبایل و تبلت هم اجرا می‌شود.",
      "guide.e1": "اپلیکیشن زنده را باز کنید (دکمهٔ پایین).",
      "guide.e2": "در صفحهٔ ورود، زبان را با کلید FA/EN به انگلیسی ببرید (برای ارزیاب غیرفارسی).",
      "guide.e3": "منوی کناری را باز کنید و Guide را انتخاب کنید.",
      "guide.e4": "در راهنما بخش ورود به حساب دمو را پیدا کنید. ایمیل: demo@metrico.app",
      "guide.e5": "رمز دمو را از بنیان‌گذاران بگیرید (در صورت نداشتن به hello@metrico.app ایمیل بزنید). رمز در کد عمومی ذخیره نشده است.",
      "guide.e6": "وارد نمونهٔ فقط‌مشاهده در سطح ارک می‌شوید. آزادانه بگردید؛ ذخیرهٔ تغییرات عمداً غیرفعال است.",
      "guide.demoT": "اطلاعات ورود دمو",
      "guide.demoP": "فقط از حساب دموی برچسب‌خورده برای ارزیابی استفاده کنید.",
      "guide.demoEmailL": "ایمیل:",
      "guide.demoPass": "رمز: از بنیان‌گذاران از طریق hello@metrico.app درخواست کنید (در مخزن منتشر نمی‌شود).",
      "guide.demoScope": "محدوده: پروژهٔ نمونهٔ فقط‌مشاهده، جدول واحد، اقساط، نمای مالی، انبار نمونه، و جریان پورتال مالک.",
      "guide.tourT": "چه چیزهایی را ببینید (۸ تا ۱۰ دقیقه)",
      "guide.tourP": "مسیر پیشنهادی در سطح محصول:",
      "guide.t1": "داشبورد — کارت پروژه‌های نمونه و وضعیت کلی.",
      "guide.t2": "ورود به پروژهٔ نمونه — جدول رنگی واحدها (خالی / رزرو / فروخته).",
      "guide.t3": "باز کردن یک واحد فروخته‌شده — خریدار، مبلغ قرارداد، جدول اقساط.",
      "guide.t4": "نمای مالی / هزینه‌ها — ثبت هزینه و نقدینگی.",
      "guide.t5": "مفهوم پورتال مالک — لینک امن به‌روزرسانی برای خریدار بدون دسترسی کامل دفتر.",
      "guide.t6": "منو → پلن اشتراک — سطوح آغاز / پلاس / پرو / ارک (دمو برای نمایش در سطح ارک است).",
      "guide.t7": "اختیاری: بخش‌های راهنمای داخل اپ برای نقشه، انبار، انرژی و متره (پلن‌های بالاتر).",
      "guide.ownT": "اختیاری: ساخت حساب رایگان خودتان",
      "guide.ownP": "اگر می‌خواهید دادهٔ خودتان را وارد کنید (برای ارزیابی لازم نیست):",
      "guide.s1t": "۱. ساخت حساب",
      "guide.s1p":
        "با ایمیل و رمز ثبت‌نام کنید. فعال‌سازی با کد مدیر است. یا برای مرور سریع همان دموی برچسب‌خورده را بمانید.",
      "guide.s2t": "۲. تنظیم شرکت",
      "guide.s2p":
        "از آیکون چرخ‌دنده نام و لوگوی شرکت را ثبت کنید — در سربرگ و گزارش PDF دیده می‌شود.",
      "guide.s3t": "۳. ساخت پروژه",
      "guide.s3p":
        "طبقات و واحد بسازید. نقشهٔ رنگی واحدها را ببینید؛ واحد را برای خریدار و اقساط باز کنید.",
      "guide.s4t": "۴. مالی و مالک",
      "guide.s4p":
        "هزینه و درآمد ثبت کنید، سهم سرمایه‌گذار را مدیریت کنید و لینک پورتال مالک بدهید.",
      "guide.s5t": "۵. پشتیبان و حریم خصوصی",
      "guide.s5p":
        "از داخل اپ پشتیبان بگیرید. صفحهٔ حریم خصوصی را برای میزبانی و حقوق داده بخوانید.",
      "guide.linksT": "لینک‌های مفید",
      "guide.linkApp": "اپلیکیشن زنده",
      "guide.linkOnepager": "خلاصهٔ محصول (انگلیسی)",
      "guide.linkAbout": "دربارهٔ متریکو",
      "guide.linkPrivacy": "حریم خصوصی",
      "guide.linkContact": "تماس",
      "guide.time": "مرور معمول: حدود ۱۰ دقیقه روی دمو، به‌علاوهٔ عمیق‌شدن اختیاری در ماژول‌های پلن بالاتر.",
      "guide.cta": "باز کردن اپ زنده",
      "guide.ctaMail": "درخواست رمز دمو",
      "contact.h1": "تماس و پشتیبانی",
      "contact.lead": "به سوال‌های محصول و راه‌اندازی پاسخ می‌دهیم — معمولاً ظرف چند روز کاری.",
      "contact.emailLabel": "ایمیل",
      "contact.emailVal": "hello@metrico.app",
      "contact.appLabel": "اپلیکیشن زنده",
      "contact.appHint": "ورود، حالت دمو و راهنمای داخل اپ اینجاست.",
      "contact.privacyLabel": "حریم خصوصی و درخواست داده",
      "contact.privacyHint": "حذف حساب و خروجی داده داخل اپ است؛ جزئیات در صفحهٔ حریم خصوصی.",
      "privacy.h1": "سیاست حریم خصوصی",
      "privacy.updated": "آخرین به‌روزرسانی: ۱۴۰۵/۰۵/۰۳",
      "privacy.intro":
        "متریکو نرم‌افزار مدیریت پروژه ساختمانی است. این صفحه خلاصهٔ داده‌هایی که پردازش می‌کنیم و انتخاب‌های شماست.",
      "privacy.s1t": "داده‌هایی که نگه می‌داریم",
      "privacy.s1p":
        "ایمیل حساب، پروفایل شرکت، پروژه‌ها (واحد، خریدار، مالی، اسناد)، مخاطبین، یادآور، انبار، لینک پورتال مالک، بازخورد محصول و کش مرورگر برای استفادهٔ آفلاین.",
      "privacy.s2t": "میزبانی",
      "privacy.s2p":
        "داده در Supabase (PostgreSQL + Auth) با امنیت سطح ردیف برای هر حساب ذخیره می‌شود. منطقهٔ Supabase و DPA را برای انتقال EU انتخاب کنید.",
      "privacy.s3t": "اشتراک‌گذاری",
      "privacy.s3p":
        "دادهٔ شما فروخته نمی‌شود. Supabase میزبان است. کاشی نقشه ممکن است IP شما را به OpenStreetMap بفرستد. خروجی PDF/JSON در کنترل شماست.",
      "privacy.s4t": "خریداران (B2B)",
      "privacy.s4p":
        "معمولاً شما (سازنده/پیمانکار) کنترل‌کنندهٔ دادهٔ خریدار هستید؛ متریکو برای میزبانی و پورتال مالک پردازشگر است.",
      "privacy.s5t": "حقوق شما",
      "privacy.s5l1": "دسترسی / قابل‌حمل بودن: پشتیبان در اپ و خروجی سرور در صورت فعال بودن.",
      "privacy.s5l2": "حذف: اطلاعات شرکت → حذف حساب → تأیید ایمیل.",
      "privacy.s5l3": "برای سایر درخواست‌ها تماس بگیرید (هدف ۳۰ روز کاری).",
      "privacy.s6t": "دستیار",
      "privacy.s6p":
        "دستیار داخل اپ بر پایهٔ قوانین روی دادهٔ شماست؛ متن گفتگو به API مدل زبانی خارجی فرستاده نمی‌شود.",
      "privacy.back": "→ بازگشت به خانه",
      "privacy.moreT": "جزئیات بیشتر",
      "privacy.moreP": "مستندات مخزن در گیت‌هاب:",
      "privacy.more1": "سابقهٔ پردازش (RoPA)",
      "privacy.more2": "خلاصهٔ انطباق",
      "privacy.more3": "خلاصهٔ امنیت",
    },
  };

  function getLang() {
    if (document.body && document.body.getAttribute("data-force-lang") === "en") {
      return "en";
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fa") return saved;
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("fa") ? "fa" : "en";
  }

  function setLang(lang) {
    if (document.body && document.body.getAttribute("data-force-lang") === "en") {
      lang = "en";
    }
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function t(lang, key) {
    return (STR[lang] && STR[lang][key]) || STR.en[key] || key;
  }

  function applyLang(lang) {
    lang = lang || getLang();
    if (document.body && document.body.getAttribute("data-force-lang") === "en") {
      lang = "en";
    }
    const root = document.documentElement;
    root.lang = lang === "fa" ? "fa" : "en";
    root.dir = lang === "fa" ? "rtl" : "ltr";

    const page = document.body.getAttribute("data-page") || "home";
    const titleKey = "meta.title." + page;
    document.title = t(lang, titleKey);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(lang, el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(lang, el.getAttribute("data-i18n-alt")));
    });
    document.querySelectorAll("[data-i18n-mail]").forEach(function (el) {
      const v = t(lang, el.getAttribute("data-i18n-mail"));
      el.setAttribute("href", "mailto:" + v);
      if (el.hasAttribute("data-i18n-show-mail")) el.textContent = v;
    });

    document.querySelectorAll("[data-app-href]").forEach(function (el) {
      el.setAttribute("href", APP_URL);
    });
    document.querySelectorAll("[data-landing-href]").forEach(function (el) {
      const path = el.getAttribute("data-landing-href") || "";
      el.setAttribute("href", LANDING_BASE + path.replace(/^\//, ""));
    });

    document.querySelectorAll("[data-en-only]").forEach(function (el) {
      el.hidden = lang !== "en";
      el.style.display = lang === "en" ? "" : "none";
    });
    document.querySelectorAll("[data-fa-only]").forEach(function (el) {
      el.hidden = lang !== "fa";
      el.style.display = lang === "fa" ? "" : "none";
    });

    const switcher = document.getElementById("lang-switch");
    if (switcher) {
      switcher.textContent = t(lang, "lang.switch");
      switcher.setAttribute(
        "aria-label",
        lang === "fa" ? "Switch to English" : "تغییر به فارسی"
      );
    }
  }

  function toggleLang() {
    if (document.body && document.body.getAttribute("data-force-lang") === "en") return;
    setLang(getLang() === "fa" ? "en" : "fa");
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getLang());
    const sw = document.getElementById("lang-switch");
    if (sw) sw.addEventListener("click", function (e) {
      e.preventDefault();
      toggleLang();
    });
  });

  window.MetricoLanding = { getLang: getLang, setLang: setLang, t: t, APP_URL: APP_URL };
})();
