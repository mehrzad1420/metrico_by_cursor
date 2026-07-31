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
