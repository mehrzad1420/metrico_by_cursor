(function () {
  const APP_URL = "https://mehrzad1420.github.io/metrico_by_cursor/index.html";
  const STORAGE_KEY = "metrico-landing-lang";

  const STR = {
    en: {
      "meta.title.home": "Metrico — Construction Project Management",
      "meta.title.about": "About — Metrico",
      "meta.title.guide": "Evaluator demo guide — Metrico",
      "meta.title.contact": "Contact — Metrico",
      "meta.title.privacy": "Privacy — Metrico",
      "nav.home": "Home",
      "nav.platform": "Platform",
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
      "market.title": "Built to scale beyond one country",
      "market.sub": "Honest positioning for partners and evaluators — product first, then market expansion.",
      "market.m1t": "Wedge",
      "market.m1p":
        "Replace spreadsheet chaos for unit sales, installments, and owner questions — the daily pain of mid-size developers.",
      "market.m2t": "Go-to-market",
      "market.m2p":
        "Prove value with real projects in growth markets, then expand through Turkey, the Gulf, and Europe with an EU company base.",
      "market.m3t": "Roadmap",
      "market.m3p":
        "Next: EU billing, richer energy reporting, material takeoff depth, and aggregated local price insights — clearly marked as product roadmap.",
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
      "about.marketT": "Markets",
      "about.marketP":
        "Iran can be an early operating market for real project feedback. Expansion targets include Turkey, the Gulf, and later European adopters — with company operations intended from an EU base.",
      "about.demoT": "Demo data",
      "about.demoP":
        "The in-app demo account is sample data for product evaluation. It is labeled demo and is not presented as live paying customers or production traction.",
      "about.baseT": "Company direction",
      "about.baseP":
        "We are building Metrico as a scalable SaaS: hire specialized talent for engineering and international sales, complete EU-ready billing, and deepen energy, materials, and market-insight modules.",
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
      "meta.title.contact": "تماس — متریکو",
      "meta.title.privacy": "حریم خصوصی — متریکو",
      "nav.home": "خانه",
      "nav.platform": "بستر",
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
      "market.title": "طراحی‌شده برای مقیاس فراتر از یک کشور",
      "market.sub": "موقعیت‌گذاری صادقانه برای شریک و ارزیاب — اول محصول، بعد گسترش بازار.",
      "market.m1t": "نقطهٔ ورود",
      "market.m1p":
        "جایگزینی آشفتگی اکسل برای فروش واحد، اقساط و سوال‌های مالک — درد روزمرهٔ سازندگان متوسط.",
      "market.m2t": "ورود به بازار",
      "market.m2p":
        "ارزش را با پروژه‌های واقعی در بازارهای رشد اثبات کنید؛ سپس از طریق ترکیه، خلیج فارس و اروپا با پایگاه شرکتی در اتحادیه اروپا گسترش دهید.",
      "market.m3t": "نقشهٔ راه",
      "market.m3p":
        "بعدی: صورتحساب اروپایی، گزارش انرژی غنی‌تر، عمق متره مصالح، و بینش قیمت محلی تجمیعی — به‌وضوح به‌عنوان نقشهٔ راه محصول.",
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
      "about.marketT": "بازارها",
      "about.marketP":
        "ایران می‌تواند بازار اولیهٔ عملیاتی برای بازخورد واقعی پروژه باشد. هدف گسترش شامل ترکیه، خلیج و بعداً پذیرندگان اروپایی است — با عملیات شرکتی از پایگاه اتحادیهٔ اروپا.",
      "about.demoT": "دادهٔ نمایشی",
      "about.demoP":
        "حساب دمو داخل اپ دادهٔ نمونه برای ارزیابی محصول است. برچسب دمو دارد و به‌عنوان مشتری پرداخت‌کننده یا کشش واقعی بازار معرفی نمی‌شود.",
      "about.baseT": "جهت شرکت",
      "about.baseP":
        "متریکو را به‌عنوان نرم‌افزار مقیاس‌پذیر می‌سازیم: جذب نیروی تخصصی برای مهندسی و فروش بین‌المللی، تکمیل صورتحساب آمادهٔ اروپا، و عمق‌بخشی ماژول‌های انرژی، مصالح و بینش بازار.",
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
      "guide.linkAbout": "دربارهٔ متریکو و بازارها",
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
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fa") return saved;
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("fa") ? "fa" : "en";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function t(lang, key) {
    return (STR[lang] && STR[lang][key]) || STR.en[key] || key;
  }

  function applyLang(lang) {
    lang = lang || getLang();
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
