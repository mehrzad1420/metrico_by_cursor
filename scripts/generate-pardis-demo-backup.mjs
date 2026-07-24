/**
 * Generates metrico backup JSON: 3 Pardis-area projects, 18 units each, full demo data.
 * Run: node scripts/generate-pardis-demo-backup.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dir, "..", "backups");
const outFile = join(outDir, "metrico-demo-pardis-3projects-backup.json");

let _n = 0;
const id = (p = "id") => `${p}${(++_n).toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const TINY_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const TINY_PDF =
  "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cKL1BhZ2VzIDIgMCBSCj4+CmVuZG9iagoyIDAgb2IKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL0FnZS9QYXJlbnQgMiAwIFIKL01lZGlhQm94IFswIDAgMyAzXQo+PgplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCjAwMDAwMDAwMTIgMDAwMDAgbiAKMDAwMDAwMDA2MCAwMDAwMCBuIAowMDAwMDAwMTMzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNC9Sb290IDEgMCBSCj4+CmVuZG9iagolJUVPRg==";

function doc(name, asPdf = false) {
  return { id: id("doc"), name, dataUrl: asPdf ? TINY_PDF : TINY_PNG };
}

const PROJECT_PHASES = [
  "اجرای اسکلت (بتنی/فلزی)",
  "سفت‌کاری (دیوارچینی و سقف‌ها)",
  "نازک‌کاری (تأسیسات، کاشی‌کاری، گچ‌کاری)",
];

const BUYERS = [
  "علی رضایی", "مریم احمدی", "حسین کریمی", "زهرا موسوی", "رضا نوری", "فاطمه حسینی",
  "محمد جعفری", "سارا محمدی", "امیر کاظمی", "نرگس صادقی", "پارسا مرادی", "لیلا اکبری",
  "مهدی رحیمی", "نسرین فلاح", "کامران شریفی", "الهام باقری", "سعید نادری", "مینا حیدری",
  "بهرام زارعی", "شیما عباسی", "کوروش داوودی", "نگین طاهری", "فرهاد امینی", "آرزو شفیعی",
  "دانیال موسوی", "هانیه قاسمی", "پیمان نیکزاد", "سودابه مرادی", "یاسر حاتمی", "ندا کریمی",
  "مجید سلطانی", "رویا بهرامی", "حامد فتحی", "الناز جلیلی", "بابک رستمی", "شیدا عزیزی",
  "امید تهرانی", "گلناز شاهین", "کیوان محمودی", "پریسا یزدانی", "سینا اکبرزاده", "مژگان حبیبی",
  "فرزاد نعمتی", "آتنا رضوانی", "مصطفی قربانی", "نیلوفر سعیدی", "جواد ملکی", "ترانه وحیدی",
  "رامین پورحسینی", "ساناز فیروزی", "مهتاب انصاری", "وحید غلامی", "آرمان خسروی", "سمیرا جوان",
];

function buildInventory() {
  const items = [
    { name: "سیمان (کیسه ۵۰kg)", unit: "کیسه", category: "مصالح عمومی", qty: 2400 },
    { name: "ماسه شسته", unit: "تن", category: "مصالح عمومی", qty: 180 },
    { name: "میلگرد سایز ۱۴", unit: "کیلوگرم", category: "سازه", qty: 85000, takeoffKey: "rebar" },
    { name: "سرامیک کف", unit: "متر مربع", category: "نازک‌کاری", qty: 4200 },
    { name: "گچ سفید", unit: "تن", category: "نازک‌کاری", qty: 95 },
    { name: "لوله PVC آب", unit: "متر", category: "تأسیسات", qty: 3200, takeoffKey: "waterPipe" },
  ].map((x) => ({
    id: id("inv"),
    name: x.name,
    unit: x.unit,
    category: x.category,
    takeoffKey: x.takeoffKey || null,
    quantity: x.qty,
    allocations: x.name.includes("سیمان")
      ? [{ id: id("al"), activity: "اسکلت برج A", quantity: 400, at: new Date().toISOString() }]
      : [],
    itemType: x.name.includes("میلگرد") ? "میلگرد" : "",
    itemVariant: x.name.includes("میلگرد") ? "سایز ۱۴" : "",
  }));
  return items;
}

function buildContacts() {
  const roles = [
    { name: "شرکت سرمایه‌گذاری افق پردیس", role: "investor", phone: "02176230001" },
    { name: "مهندس رضا شریفی", role: "investor", phone: "09121234567" },
    { name: "پیمانکار اسکلت — گروه سازه پارس", role: "contractor", phone: "09131234001" },
    { name: "پیمانکار نازک‌کاری — دکور سازه", role: "contractor", phone: "09131234002" },
    { name: "فروشگاه مصالح آریا پردیس", role: "supplier", phone: "02176231000" },
    { name: "آهن‌آلات بومهن", role: "supplier", phone: "02176232000" },
    { name: "دفتر فنی مهندسین مشاور راه", role: "other", phone: "02176233000" },
    { name: "کارگاه برق و تأسیسات تابان", role: "contractor", phone: "09151234003" },
  ];
  const list = roles.map((r) => ({ id: id("c"), name: r.name, phone: r.phone, role: r.role, note: "" }));
  BUYERS.slice(0, 54).forEach((name, i) => {
    list.push({
      id: id("c"),
      name,
      phone: `0919${String(1000000 + i * 173).slice(-7)}`,
      role: "buyer",
      note: "",
    });
  });
  return list;
}

function findContact(contacts, role, index = 0) {
  const filtered = contacts.filter((c) => c.role === role);
  return filtered[index]?.id || contacts[0]?.id;
}

function buildProject(config, contacts, inventory) {
  const invCement = inventory.find((i) => i.name.includes("سیمان"));
  const invRebar = inventory.find((i) => i.name.includes("میلگرد"));
  const investorId = findContact(contacts, "investor", config.investorIndex);
  const contractorId = findContact(contacts, "contractor", config.contractorIndex);
  const supplierId = findContact(contacts, "supplier", config.supplierIndex);
  const employerId = investorId;

  const accProject = id("acc");
  const accPetty = id("acc");
  const accCheck = id("acc");

  const floors = [];
  for (let f = 1; f <= 6; f++) floors.push({ number: f, count: 3 });

  const units = [];
  let buyerIdx = config.buyerOffset;
  let unitSeq = 0;

  for (let f = 1; f <= 6; f++) {
    for (let u = 1; u <= 3; u++) {
      unitSeq++;
      const unitId = id("u");
      const area = 78 + ((unitSeq + config.seed) % 6) * 5;
      const ppm = 38500000 + (config.seed % 5) * 1200000;
      const total = area * ppm;
      const down = Math.round(total * 0.3);
      const instCount = 4;
      const instAmt = Math.round((total - down) / instCount);

      let status = "vacant";
      if (unitSeq <= config.soldCount) status = "sold";
      else if (unitSeq <= config.soldCount + config.reservedCount) status = "reserved";

      const buyerContact = contacts.filter((c) => c.role === "buyer")[buyerIdx];
      buyerIdx++;

      const base = {
        id: unitId,
        floor: f,
        unitNumber: String(f * 10 + u),
        area: String(area),
        status,
        direction: ["north", "south", "east", "west"][(unitSeq + f) % 4],
        buyerName: status !== "vacant" ? buyerContact?.name || "خریدار" : "",
        buyerPhone: status !== "vacant" ? buyerContact?.phone || "" : "",
        buyerContactId: status !== "vacant" ? buyerContact?.id : null,
        postalCode: status !== "vacant" ? `${14471}${String(unitSeq).padStart(4, "0")}` : "",
        pricePerMeter: status !== "vacant" ? String(ppm) : "",
        downPayment: status !== "vacant" ? String(down) : "",
        depositAccountId: status !== "vacant" ? accProject : "",
        installments: [],
        contractDocs: status === "sold" ? [doc("مبایعه‌نامه.pdf", true)] : [],
        checkDocs: [],
        notes: "",
        downPaymentReceived: false,
      };

      if (status === "sold" || status === "reserved") {
        const installments = [];
        for (let k = 0; k < instCount; k++) {
          installments.push({
            id: id("inst"),
            date: `1404/${String(4 + k * 3).padStart(2, "0")}/15`,
            amount: String(k === instCount - 1 ? total - down - instAmt * (instCount - 1) : instAmt),
            paid: false,
            accountId: accProject,
            financeTxId: null,
          });
        }
        base.installments = installments;
      }
      units.push(base);
    }
  }

  const financeTransactions = [];
  const expenses = [];
  const auditLog = [];

  financeTransactions.push({
    id: id("ft"),
    date: "1403/11/01",
    type: "capital_in",
    amount: config.capitalIn,
    fromAccountId: null,
    toAccountId: accProject,
    investorContactId: investorId,
    note: "ورود سرمایه اولیه پروژه",
    docs: [doc("رسید واریز سرمایه.pdf", true)],
  });

  auditLog.push({
    id: id("aud"),
    at: "1403-11-01T10:00:00.000Z",
    action: "finance.add",
    details: { type: "capital_in", amount: config.capitalIn },
  });

  // Record income for sold units (down + 1–2 installments)
  units.filter((u) => u.status === "sold").forEach((u, idx) => {
    const down = Number(u.downPayment) || 0;
    if (down > 0) {
      const txId = id("ft");
      financeTransactions.push({
        id: txId,
        date: "1404/02/10",
        type: "income",
        amount: down,
        fromAccountId: null,
        toAccountId: accProject,
        unitId: u.id,
        installmentId: null,
        note: `پیش‌پرداخت واحد ${u.unitNumber}`,
        docs: [doc("رسید دریافت پیش‌پرداخت.png")],
      });
      u.downPaymentReceived = true;
    }
    const inst = u.installments?.[0];
    if (inst && idx % 2 === 0) {
      const txId = id("ft");
      financeTransactions.push({
        id: txId,
        date: "1404/05/20",
        type: "income",
        amount: Number(inst.amount),
        fromAccountId: null,
        toAccountId: accProject,
        unitId: u.id,
        installmentId: inst.id,
        note: `قسط اول واحد ${u.unitNumber}`,
        docs: [doc("رسید قسط.png")],
      });
      inst.paid = true;
      inst.financeTxId = txId;
    }
  });

  const expCash = id("exp");
  expenses.push({
    id: expCash,
    title: "خرید سیمان پروژه",
    amount: String(config.cementExpense),
    date: "1404/03/05",
    paymentMethod: "cash",
    contactId: supplierId,
    bankAccountId: accProject,
    materialId: invCement?.id,
    materialQty: 800,
    note: "رسید انبار — شارژ موجودی",
    docs: [doc("فاکتور سیمان.pdf", true)],
  });
  financeTransactions.push({
    id: id("ft"),
    date: "1404/03/05",
    type: "expense",
    amount: config.cementExpense,
    fromAccountId: accProject,
    toAccountId: null,
    expenseId: expCash,
    note: "خرید سیمان پروژه",
    docs: [doc("فاکتور سیمان.pdf", true)],
  });

  const expCredit = id("exp");
  expenses.push({
    id: expCredit,
    title: "میلگرد اسکلت — فاکتور نسیه",
    amount: String(config.rebarCredit),
    date: "1404/04/12",
    paymentMethod: "credit",
    contactId: supplierId,
    materialId: invRebar?.id,
    materialQty: 12000,
    note: "فاکتور ۱۴۰۴/۰۴/۱۲",
    docs: [doc("فاکتور میلگرد.pdf", true)],
  });

  const expCheck = id("exp");
  expenses.push({
    id: expCheck,
    title: "اجاره جرثقیل",
    amount: String(config.craneCheck),
    date: "1404/04/20",
    paymentMethod: "check",
    contactId: contractorId,
    bankAccountId: accCheck,
    note: "چک سررسید ۱۴۰۴/۰۶/۰۱",
    docs: [doc("چک جرثقیل.pdf", true)],
  });
  financeTransactions.push({
    id: id("ft"),
    date: "1404/04/20",
    type: "check_clear",
    amount: config.craneCheck,
    fromAccountId: accCheck,
    toAccountId: null,
    expenseId: expCheck,
    note: "اجاره جرثقیل",
    docs: [doc("چک جرثقیل.pdf", true)],
  });

  const payTx = id("ft");
  const payAmt = Math.round(config.rebarCredit * 0.6);
  financeTransactions.push({
    id: payTx,
    date: "1404/05/15",
    type: "contact_debt_pay",
    amount: payAmt,
    fromAccountId: accProject,
    toAccountId: null,
    contactId: supplierId,
    note: "تسویه بخشی بدهی میلگرد",
    docs: [doc("رسید پرداخت بدهی.pdf", true)],
    apAllocations: [{ expenseId: expCredit, amount: payAmt, expenseTitle: "میلگرد اسکلت — فاکتور نسیه" }],
  });

  financeTransactions.push({
    id: id("ft"),
    date: "1404/05/01",
    type: "contact_prepay",
    amount: 45000000,
    fromAccountId: accProject,
    toAccountId: null,
    contactId: contractorId,
    note: "پیش‌پرداخت پیمانکار نازک‌کاری",
    docs: [doc("رسید پیش‌پرداخت.pdf", true)],
  });

  financeTransactions.push({
    id: id("ft"),
    date: "1404/06/01",
    type: "transfer",
    amount: 120000000,
    fromAccountId: accProject,
    toAccountId: accPetty,
    note: "انتقال به تنخواه کارگاه",
    docs: [doc("حواله انتقال.png")],
  });

  const contractId = id("con");
  const contracts = [
    {
      id: contractId,
      createdAt: "1404-01-10T08:00:00.000Z",
      activityName: "اجرای اسکلت بتنی",
      activityId: null,
      employerContactId: employerId,
      contractorContactId: contractorId,
      contractNumber: `${config.code}-1404-01`,
      contractDate: "1404/01/10",
      quantity: config.builtArea * 0.85,
      unitPrice: 8500000,
      totalAmount: Math.round(config.builtArea * 0.85 * 8500000),
      unitLabel: "متر مربع",
      startDate: "1404/02/01",
      endDate: "1404/09/30",
      durationDays: 240,
      advancePercent: 15,
      retentionPercent: 10,
      warrantyDays: 365,
      penaltyPerDay: 5000000,
      activityNotes: "طبق نقشه‌های اجرایی و دستور کار",
      customClauses: "",
      customClausesOnly: false,
      amendments: [
        {
          id: id("amd"),
          createdAt: "1404-05-01T10:00:00.000Z",
          amendmentNo: 1,
          amendmentDate: "1404/05/01",
          quantity: 120,
          unitPrice: 9200000,
          totalAmount: 120 * 9200000,
          unitLabel: "متر مربع",
          notes: "متمم — اضافه‌کاری سقف طبقه شش",
        },
      ],
    },
  ];

  const stmtId = id("stmt");
  const progressStatements = [
    {
      id: stmtId,
      createdAt: "1404-04-15T09:00:00.000Z",
      statementNo: 1,
      date: "1404/04/15",
      contractLabel: `${config.code}-1404-01 — اسکلت`,
      contractorContactId: contractorId,
      netAmount: 680000000,
      completionStatus: "۴۵٪ پیشرفت فیزیکی",
      defectsNotes: "بدون نقص",
    },
  ];
  expenses.push({
    id: id("exp"),
    title: "صورت‌وضعیت 1",
    amount: "680000000",
    date: "1404/04/15",
    paymentMethod: "credit",
    contactId: contractorId,
    progressStatementId: stmtId,
    note: "صورت وضعیت — ۴۵٪ پیشرفت",
    docs: [doc("صورت وضعیت 1.pdf", true)],
  });

  return {
    id: id("proj"),
    name: config.name,
    floors,
    units,
    activities: DEFAULT_CONSTRUCTION_ACTIVITIES.slice(0, 12).map((name, order) => ({
      id: id("act"),
      name,
      order,
    })),
    investors: [{ id: id("inv"), contactId: investorId, sharePercent: 100 }],
    bankAccounts: [
      {
        id: accProject,
        name: `ملت — ${config.shortName}`,
        accountNumber: config.accountMain,
        accountType: "current",
        initialBalance: String(config.initialMain),
        ownerType: "project",
        investorContactId: null,
      },
      {
        id: accPetty,
        name: "تنخواه کارگاه",
        accountNumber: config.accountPetty,
        accountType: "petty",
        initialBalance: "50000000",
        ownerType: "project",
        investorContactId: null,
      },
      {
        id: accCheck,
        name: "حساب چک‌های پروژه",
        accountNumber: config.accountCheck,
        accountType: "current",
        initialBalance: "100000000",
        ownerType: "project",
        investorContactId: null,
      },
    ],
    financeTransactions,
    expenses,
    contracts,
    progressStatements,
    auditLog,
    documents: [doc("پروانه ساختمانی.pdf", true), doc("بیمه کارگاه.pdf", true)],
    address: config.address,
    landArea: String(config.landArea),
    totalBuiltArea: String(config.builtArea),
    phase: config.phase,
    lat: config.lat,
    lng: config.lng,
    financialLockedThrough: "1403/12/29",
    gallery: [
      { id: id("gal"), caption: "پیشرفت اسکلت", dataUrl: TINY_PNG, createdAt: new Date().toISOString() },
      { id: id("gal"), caption: "کارگاه", dataUrl: TINY_PNG, createdAt: new Date().toISOString() },
    ],
    quickNotes: [
      {
        id: id("qn"),
        text: `داده نمایشی — ${config.name} — برای تست پشتیبان‌گیری و حسابداری`,
        createdAt: new Date().toISOString(),
      },
    ],
    takeoff: {
      area: config.builtArea,
      bathroomsPerUnit: 1,
      kitchensPerUnit: 1,
      structureType: "concrete",
      wallType: "brick",
      coefficients: { wallRatio: 0.6, concrete: 0.45, rebar: 45 },
      results: { concrete: config.builtArea * 0.45, rebar: config.builtArea * 45 },
      savedAt: new Date().toISOString(),
    },
  };
}

const DEFAULT_CONSTRUCTION_ACTIVITIES = [
  "خاکبرداری و تسطیح زمین",
  "گودبرداری",
  "اجرای سازه نگهبان (راهبم)",
  "فونداسیون و کلنی",
  "اسکلت بتنی — همکف و طبقات",
  "اجرای سقف‌ها و دال بتنی",
  "دیوارچینی و تیغه‌چینی",
  "عایق‌کاری رطوبتی",
  "گچ و خاک",
  "کاشی‌کاری و سرامیک",
  "تأسیسات مکانیکی",
  "تأسیسات برق",
];

const contacts = buildContacts();
const inventory = buildInventory();

const projects = [
  buildProject(
    {
      name: "برج مسکونی نگین — پردیس فاز ۱",
      shortName: "نگین فاز ۱",
      code: "NGN-F1",
      address: "پردیس، فاز ۱، بلوار امام خمینی، پلاک ۱۲",
      lat: 35.7442,
      lng: 51.8223,
      landArea: 920,
      builtArea: 5400,
      phase: PROJECT_PHASES[1],
      seed: 1,
      soldCount: 11,
      reservedCount: 3,
      buyerOffset: 0,
      investorIndex: 0,
      contractorIndex: 0,
      supplierIndex: 0,
      capitalIn: 8500000000,
      cementExpense: 320000000,
      rebarCredit: 890000000,
      craneCheck: 185000000,
      initialMain: 1200000000,
      accountMain: "1122334455661",
      accountPetty: "9988776655441",
      accountCheck: "5544332211001",
    },
    contacts,
    inventory
  ),
  buildProject(
    {
      name: "مجتمع یاس — پردیس فاز ۸",
      shortName: "یاس فاز ۸",
      code: "YAS-F8",
      address: "پردیس، فاز ۸، خیابان گلستان ۳، قطعه ۴۵",
      lat: 35.7315,
      lng: 51.812,
      landArea: 1100,
      builtArea: 6200,
      phase: PROJECT_PHASES[2],
      seed: 2,
      soldCount: 9,
      reservedCount: 4,
      buyerOffset: 18,
      investorIndex: 1,
      contractorIndex: 1,
      supplierIndex: 0,
      capitalIn: 7200000000,
      cementExpense: 280000000,
      rebarCredit: 760000000,
      craneCheck: 160000000,
      initialMain: 950000000,
      accountMain: "2233445566772",
      accountPetty: "8877665544332",
      accountCheck: "6655443322112",
    },
    contacts,
    inventory
  ),
  buildProject(
    {
      name: "ساختمان مهر — بومهن (حومه پردیس)",
      shortName: "مهر بومهن",
      code: "MEHR-BM",
      address: "بومهن، شهرک گلستان، بلوار شهید مطهری، پلاک ۸",
      lat: 35.7289,
      lng: 51.8612,
      landArea: 780,
      builtArea: 4800,
      phase: PROJECT_PHASES[0],
      seed: 3,
      soldCount: 10,
      reservedCount: 2,
      buyerOffset: 36,
      investorIndex: 0,
      contractorIndex: 0,
      supplierIndex: 1,
      capitalIn: 6000000000,
      cementExpense: 240000000,
      rebarCredit: 620000000,
      craneCheck: 140000000,
      initialMain: 800000000,
      accountMain: "3344556677883",
      accountPetty: "7766554433223",
      accountCheck: "7766554433224",
    },
    contacts,
    inventory
  ),
];

const payload = {
  version: 3,
  exportedAt: new Date().toISOString(),
  company: {
    name: "شرکت ساختمانی نمونه — مجموعه پردیس",
    phone: "02176234567",
    address: "تهران — دفتر مرکزی: بلوار میرداماد",
    logo: null,
  },
  projects,
  contacts,
  reminders: [
    {
      id: id("rem"),
      text: "سررسید چک جرثقیل — پروژه نگین",
      datetime: "2026-08-22T09:00:00.000Z",
      projectId: projects[0].id,
      notified: false,
    },
    {
      id: id("rem"),
      text: "جلسه صورت‌وضعیت — یاس فاز ۸",
      datetime: "2026-10-01T10:30:00.000Z",
      projectId: projects[1].id,
      notified: false,
    },
  ],
  inventory,
  _meta: {
    description: "نمونه ۳ پروژه ۱۸ واحدی اطراف پردیس — برای بازیابی در حساب Plus",
    generatedBy: "scripts/generate-pardis-demo-backup.mjs",
  },
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(payload, null, 2), "utf8");
console.log("Written:", outFile);
console.log("Projects:", projects.length, "| Units:", projects.reduce((s, p) => s + p.units.length, 0));
console.log("Contacts:", contacts.length, "| Finance txs:", projects.reduce((s, p) => s + p.financeTransactions.length, 0));
