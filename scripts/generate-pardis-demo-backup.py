#!/usr/bin/env python3
"""Generates metrico backup JSON: 3 Pardis-area projects, 18 units each."""
from __future__ import annotations

import json
import random
import string
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "backups" / "metrico-demo-pardis-3projects-backup.json"

_n = 0
_rng = random.Random(42)


def new_id(prefix: str = "id") -> str:
    global _n
    _n += 1
    suffix = "".join(_rng.choices(string.ascii_lowercase + string.digits, k=5))
    return f"{prefix}{_n:x}{suffix}"


TINY_PNG = (
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
)
TINY_PDF = (
    "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cKL1BhZ2VzIDIgMCBSCj4+CmVuZG9iagoyIDAgb2IKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL0FnZS9QYXJlbnQgMiAwIFIKL01lZGlhQm94IFswIDAgMyAzXQo+PgplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwCjAwMDAwMDAwMTIgMDAwMDAgbiAKMDAwMDAwMDA2MCAwMDAwMCBuIAowMDAwMDAwMTMzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNC9Sb290IDEgMCBSCj4+CmVuZG9iagolJUVPRg=="
)

PROJECT_PHASES = [
    "اجرای اسکلت (بتنی/فلزی)",
    "سفت‌کاری (دیوارچینی و سقف‌ها)",
    "نازک‌کاری (تأسیسات، کاشی‌کاری، گچ‌کاری)",
]

BUYERS = [
    "علی رضایی", "مریم احمدی", "حسین کریمی", "زهرا موسوی", "رضا نوری", "فاطمه حسینی",
    "محمد جعفری", "سارا محمدی", "امیر کاظمی", "نرگس صادقی", "پارسا مرادی", "لیلا اکبری",
    "مهدی رحیمی", "نسرین فلاح", "کامران شریفی", "الهام باقری", "سعید نادری", "مینا حیدری",
    "بهرام زارعی", "شیما عباسی", "کوروش داوودی", "نگین طاهری", "فرهاد امینی", "آرزو شفیعی",
    "دانیال موسوی", "هانیه قاسمی", "پیمان نیکزاد", "سودابه مرادی", "یاسر حاتمی", "ندا کریمی",
    "مجید سلطانی", "رویا بهرامی", "حامد فتحی", "الناز جلیلی", "بابک رستمی", "شیدا عزیزی",
    "امید تهرانی", "گلناز شاهین", "کیوان محمودی", "پریسا یزدانی", "سینا اکبرزاده", "مژگان حبیبی",
    "فرزاد نعمتی", "آتنا رضوانی", "مصطفی قربانی", "نیلوفر سعیدی", "جواد ملکی", "ترانه وحیدی",
    "رامین پورحسینی", "ساناز فیروزی", "مهتاب انصاری", "وحید غلامی", "آرمان خسروی", "سمیرا جوان",
]

DEFAULT_CONSTRUCTION_ACTIVITIES = [
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
]


def doc(name: str, as_pdf: bool = False) -> dict:
    return {"id": new_id("doc"), "name": name, "dataUrl": TINY_PDF if as_pdf else TINY_PNG}


def build_inventory() -> list:
    items = [
        {"name": "سیمان (کیسه ۵۰kg)", "unit": "کیسه", "category": "مصالح عمومی", "qty": 2400},
        {"name": "ماسه شسته", "unit": "تن", "category": "مصالح عمومی", "qty": 180},
        {"name": "میلگرد سایز ۱۴", "unit": "کیلوگرم", "category": "سازه", "qty": 85000, "takeoffKey": "rebar"},
        {"name": "سرامیک کف", "unit": "متر مربع", "category": "نازک‌کاری", "qty": 4200},
        {"name": "گچ سفید", "unit": "تن", "category": "نازک‌کاری", "qty": 95},
        {"name": "لوله PVC آب", "unit": "متر", "category": "تأسیسات", "qty": 3200, "takeoffKey": "waterPipe"},
    ]
    out = []
    for x in items:
        row = {
            "id": new_id("inv"),
            "name": x["name"],
            "unit": x["unit"],
            "category": x["category"],
            "takeoffKey": x.get("takeoffKey"),
            "quantity": x["qty"],
            "allocations": (
                [{"id": new_id("al"), "activity": "اسکلت برج A", "quantity": 400, "at": datetime.now(timezone.utc).isoformat()}]
                if "سیمان" in x["name"]
                else []
            ),
            "itemType": "میلگرد" if "میلگرد" in x["name"] else "",
            "itemVariant": "سایز ۱۴" if "میلگرد" in x["name"] else "",
        }
        out.append(row)
    return out


def build_contacts() -> list:
    roles = [
        {"name": "شرکت سرمایه‌گذاری افق پردیس", "role": "investor", "phone": "02176230001"},
        {"name": "مهندس رضا شریفی", "role": "investor", "phone": "09121234567"},
        {"name": "پیمانکار اسکلت — گروه سازه پارس", "role": "contractor", "phone": "09131234001"},
        {"name": "پیمانکار نازک‌کاری — دکور سازه", "role": "contractor", "phone": "09131234002"},
        {"name": "فروشگاه مصالح آریا پردیس", "role": "supplier", "phone": "02176231000"},
        {"name": "آهن‌آلات بومهن", "role": "supplier", "phone": "02176232000"},
        {"name": "دفتر فنی مهندسین مشاور راه", "role": "other", "phone": "02176233000"},
        {"name": "کارگاه برق و تأسیسات تابان", "role": "contractor", "phone": "09151234003"},
    ]
    lst = [{"id": new_id("c"), "name": r["name"], "phone": r["phone"], "role": r["role"], "note": ""} for r in roles]
    for i, name in enumerate(BUYERS[:54]):
        lst.append(
            {
                "id": new_id("c"),
                "name": name,
                "phone": f"0919{str(1000000 + i * 173)[-7:]}",
                "role": "buyer",
                "note": "",
            }
        )
    return lst


def find_contact(contacts: list, role: str, index: int = 0) -> str | None:
    filtered = [c for c in contacts if c["role"] == role]
    return (filtered[index]["id"] if index < len(filtered) else None) or (contacts[0]["id"] if contacts else None)


def build_project(config: dict, contacts: list, inventory: list) -> dict:
    inv_cement = next((i for i in inventory if "سیمان" in i["name"]), None)
    inv_rebar = next((i for i in inventory if "میلگرد" in i["name"]), None)
    investor_id = find_contact(contacts, "investor", config["investorIndex"])
    contractor_id = find_contact(contacts, "contractor", config["contractorIndex"])
    supplier_id = find_contact(contacts, "supplier", config["supplierIndex"])
    employer_id = investor_id

    acc_project = new_id("acc")
    acc_petty = new_id("acc")
    acc_check = new_id("acc")

    floors = [{"number": f, "count": 3} for f in range(1, 7)]
    units = []
    buyer_idx = config["buyerOffset"]
    unit_seq = 0
    buyers = [c for c in contacts if c["role"] == "buyer"]

    for f in range(1, 7):
        for u in range(1, 4):
            unit_seq += 1
            unit_id = new_id("u")
            area = 78 + ((unit_seq + config["seed"]) % 6) * 5
            ppm = 38500000 + (config["seed"] % 5) * 1200000
            total = area * ppm
            down = round(total * 0.3)
            inst_count = 4
            inst_amt = round((total - down) / inst_count)

            status = "vacant"
            if unit_seq <= config["soldCount"]:
                status = "sold"
            elif unit_seq <= config["soldCount"] + config["reservedCount"]:
                status = "reserved"

            buyer_contact = buyers[buyer_idx] if buyer_idx < len(buyers) else None
            buyer_idx += 1

            base = {
                "id": unit_id,
                "floor": f,
                "unitNumber": str(f * 10 + u),
                "area": str(area),
                "status": status,
                "direction": ["north", "south", "east", "west"][(unit_seq + f) % 4],
                "buyerName": buyer_contact["name"] if status != "vacant" and buyer_contact else "",
                "buyerPhone": buyer_contact["phone"] if status != "vacant" and buyer_contact else "",
                "buyerContactId": buyer_contact["id"] if status != "vacant" and buyer_contact else None,
                "postalCode": f"14471{unit_seq:04d}" if status != "vacant" else "",
                "pricePerMeter": str(ppm) if status != "vacant" else "",
                "downPayment": str(down) if status != "vacant" else "",
                "depositAccountId": acc_project if status != "vacant" else "",
                "installments": [],
                "contractDocs": [doc("مبایعه‌نامه.pdf", True)] if status == "sold" else [],
                "checkDocs": [],
                "notes": "",
                "downPaymentReceived": False,
            }

            if status in ("sold", "reserved"):
                installments = []
                for k in range(inst_count):
                    amt = total - down - inst_amt * (inst_count - 1) if k == inst_count - 1 else inst_amt
                    installments.append(
                        {
                            "id": new_id("inst"),
                            "date": f"1404/{4 + k * 3:02d}/15",
                            "amount": str(amt),
                            "paid": False,
                            "accountId": acc_project,
                            "financeTxId": None,
                        }
                    )
                base["installments"] = installments
            units.append(base)

    finance_transactions = []
    expenses = []
    audit_log = []

    finance_transactions.append(
        {
            "id": new_id("ft"),
            "date": "1403/11/01",
            "type": "capital_in",
            "amount": config["capitalIn"],
            "fromAccountId": None,
            "toAccountId": acc_project,
            "investorContactId": investor_id,
            "note": "ورود سرمایه اولیه پروژه",
            "docs": [doc("رسید واریز سرمایه.pdf", True)],
        }
    )
    audit_log.append(
        {
            "id": new_id("aud"),
            "at": "1403-11-01T10:00:00.000Z",
            "action": "finance.add",
            "details": {"type": "capital_in", "amount": config["capitalIn"]},
        }
    )

    for idx, u in enumerate([x for x in units if x["status"] == "sold"]):
        down = int(u["downPayment"] or 0)
        if down > 0:
            tx_id = new_id("ft")
            finance_transactions.append(
                {
                    "id": tx_id,
                    "date": "1404/02/10",
                    "type": "income",
                    "amount": down,
                    "fromAccountId": None,
                    "toAccountId": acc_project,
                    "unitId": u["id"],
                    "installmentId": None,
                    "note": f"پیش‌پرداخت واحد {u['unitNumber']}",
                    "docs": [doc("رسید دریافت پیش‌پرداخت.png")],
                }
            )
            u["downPaymentReceived"] = True
        inst = (u.get("installments") or [None])[0]
        if inst and idx % 2 == 0:
            tx_id = new_id("ft")
            finance_transactions.append(
                {
                    "id": tx_id,
                    "date": "1404/05/20",
                    "type": "income",
                    "amount": int(inst["amount"]),
                    "fromAccountId": None,
                    "toAccountId": acc_project,
                    "unitId": u["id"],
                    "installmentId": inst["id"],
                    "note": f"قسط اول واحد {u['unitNumber']}",
                    "docs": [doc("رسید قسط.png")],
                }
            )
            inst["paid"] = True
            inst["financeTxId"] = tx_id

    exp_cash = new_id("exp")
    expenses.append(
        {
            "id": exp_cash,
            "title": "خرید سیمان پروژه",
            "amount": str(config["cementExpense"]),
            "date": "1404/03/05",
            "paymentMethod": "cash",
            "contactId": supplier_id,
            "bankAccountId": acc_project,
            "materialId": inv_cement["id"] if inv_cement else None,
            "materialQty": 800,
            "note": "رسید انبار — شارژ موجودی",
            "docs": [doc("فاکتور سیمان.pdf", True)],
        }
    )
    finance_transactions.append(
        {
            "id": new_id("ft"),
            "date": "1404/03/05",
            "type": "expense",
            "amount": config["cementExpense"],
            "fromAccountId": acc_project,
            "toAccountId": None,
            "expenseId": exp_cash,
            "note": "خرید سیمان پروژه",
            "docs": [doc("فاکتور سیمان.pdf", True)],
        }
    )

    exp_credit = new_id("exp")
    expenses.append(
        {
            "id": exp_credit,
            "title": "میلگرد اسکلت — فاکتور نسیه",
            "amount": str(config["rebarCredit"]),
            "date": "1404/04/12",
            "paymentMethod": "credit",
            "contactId": supplier_id,
            "materialId": inv_rebar["id"] if inv_rebar else None,
            "materialQty": 12000,
            "note": "فاکتور ۱۴۰۴/۰۴/۱۲",
            "docs": [doc("فاکتور میلگرد.pdf", True)],
        }
    )

    exp_check = new_id("exp")
    expenses.append(
        {
            "id": exp_check,
            "title": "اجاره جرثقیل",
            "amount": str(config["craneCheck"]),
            "date": "1404/04/20",
            "paymentMethod": "check",
            "contactId": contractor_id,
            "bankAccountId": acc_check,
            "note": "چک سررسید ۱۴۰۴/۰۶/۰۱",
            "docs": [doc("چک جرثقیل.pdf", True)],
        }
    )
    finance_transactions.append(
        {
            "id": new_id("ft"),
            "date": "1404/04/20",
            "type": "check_clear",
            "amount": config["craneCheck"],
            "fromAccountId": acc_check,
            "toAccountId": None,
            "expenseId": exp_check,
            "note": "اجاره جرثقیل",
            "docs": [doc("چک جرثقیل.pdf", True)],
        }
    )

    pay_tx = new_id("ft")
    pay_amt = round(config["rebarCredit"] * 0.6)
    finance_transactions.append(
        {
            "id": pay_tx,
            "date": "1404/05/15",
            "type": "contact_debt_pay",
            "amount": pay_amt,
            "fromAccountId": acc_project,
            "toAccountId": None,
            "contactId": supplier_id,
            "note": "تسویه بخشی بدهی میلگرد",
            "docs": [doc("رسید پرداخت بدهی.pdf", True)],
            "apAllocations": [
                {"expenseId": exp_credit, "amount": pay_amt, "expenseTitle": "میلگرد اسکلت — فاکتور نسیه"}
            ],
        }
    )

    finance_transactions.append(
        {
            "id": new_id("ft"),
            "date": "1404/05/01",
            "type": "contact_prepay",
            "amount": 45000000,
            "fromAccountId": acc_project,
            "toAccountId": None,
            "contactId": contractor_id,
            "note": "پیش‌پرداخت پیمانکار نازک‌کاری",
            "docs": [doc("رسید پیش‌پرداخت.pdf", True)],
        }
    )

    finance_transactions.append(
        {
            "id": new_id("ft"),
            "date": "1404/06/01",
            "type": "transfer",
            "amount": 120000000,
            "fromAccountId": acc_project,
            "toAccountId": acc_petty,
            "note": "انتقال به تنخواه کارگاه",
            "docs": [doc("حواله انتقال.png")],
        }
    )

    contract_id = new_id("con")
    contracts = [
        {
            "id": contract_id,
            "createdAt": "1404-01-10T08:00:00.000Z",
            "activityName": "اجرای اسکلت بتنی",
            "activityId": None,
            "employerContactId": employer_id,
            "contractorContactId": contractor_id,
            "contractNumber": f"{config['code']}-1404-01",
            "contractDate": "1404/01/10",
            "quantity": config["builtArea"] * 0.85,
            "unitPrice": 8500000,
            "totalAmount": round(config["builtArea"] * 0.85 * 8500000),
            "unitLabel": "متر مربع",
            "startDate": "1404/02/01",
            "endDate": "1404/09/30",
            "durationDays": 240,
            "advancePercent": 15,
            "retentionPercent": 10,
            "warrantyDays": 365,
            "penaltyPerDay": 5000000,
            "activityNotes": "طبق نقشه‌های اجرایی و دستور کار",
            "customClauses": "",
            "customClausesOnly": False,
            "amendments": [
                {
                    "id": new_id("amd"),
                    "createdAt": "1404-05-01T10:00:00.000Z",
                    "amendmentNo": 1,
                    "amendmentDate": "1404/05/01",
                    "quantity": 120,
                    "unitPrice": 9200000,
                    "totalAmount": 120 * 9200000,
                    "unitLabel": "متر مربع",
                    "notes": "متمم — اضافه‌کاری سقف طبقه شش",
                }
            ],
        }
    ]

    stmt_id = new_id("stmt")
    progress_statements = [
        {
            "id": stmt_id,
            "createdAt": "1404-04-15T09:00:00.000Z",
            "statementNo": 1,
            "date": "1404/04/15",
            "contractLabel": f"{config['code']}-1404-01 — اسکلت",
            "contractorContactId": contractor_id,
            "netAmount": 680000000,
            "completionStatus": "۴۵٪ پیشرفت فیزیکی",
            "defectsNotes": "بدون نقص",
        }
    ]
    expenses.append(
        {
            "id": new_id("exp"),
            "title": "صورت‌وضعیت 1",
            "amount": "680000000",
            "date": "1404/04/15",
            "paymentMethod": "credit",
            "contactId": contractor_id,
            "progressStatementId": stmt_id,
            "note": "صورت وضعیت — ۴۵٪ پیشرفت",
            "docs": [doc("صورت وضعیت 1.pdf", True)],
        }
    )

    now_iso = datetime.now(timezone.utc).isoformat()
    return {
        "id": new_id("proj"),
        "name": config["name"],
        "floors": floors,
        "units": units,
        "activities": [
            {"id": new_id("act"), "name": name, "order": order}
            for order, name in enumerate(DEFAULT_CONSTRUCTION_ACTIVITIES[:12])
        ],
        "investors": [{"id": new_id("inv"), "contactId": investor_id, "sharePercent": 100}],
        "bankAccounts": [
            {
                "id": acc_project,
                "name": f"ملت — {config['shortName']}",
                "accountNumber": config["accountMain"],
                "accountType": "current",
                "initialBalance": str(config["initialMain"]),
                "ownerType": "project",
                "investorContactId": None,
            },
            {
                "id": acc_petty,
                "name": "تنخواه کارگاه",
                "accountNumber": config["accountPetty"],
                "accountType": "petty",
                "initialBalance": "50000000",
                "ownerType": "project",
                "investorContactId": None,
            },
            {
                "id": acc_check,
                "name": "حساب چک‌های پروژه",
                "accountNumber": config["accountCheck"],
                "accountType": "current",
                "initialBalance": "100000000",
                "ownerType": "project",
                "investorContactId": None,
            },
        ],
        "financeTransactions": finance_transactions,
        "expenses": expenses,
        "contracts": contracts,
        "progressStatements": progress_statements,
        "auditLog": audit_log,
        "documents": [doc("پروانه ساختمانی.pdf", True), doc("بیمه کارگاه.pdf", True)],
        "address": config["address"],
        "landArea": str(config["landArea"]),
        "totalBuiltArea": str(config["builtArea"]),
        "phase": config["phase"],
        "lat": config["lat"],
        "lng": config["lng"],
        "financialLockedThrough": "1403/12/29",
        "gallery": [
            {"id": new_id("gal"), "caption": "پیشرفت اسکلت", "dataUrl": TINY_PNG, "createdAt": now_iso},
            {"id": new_id("gal"), "caption": "کارگاه", "dataUrl": TINY_PNG, "createdAt": now_iso},
        ],
        "quickNotes": [
            {
                "id": new_id("qn"),
                "text": f"داده نمایشی — {config['name']} — برای تست پشتیبان‌گیری و حسابداری",
                "createdAt": now_iso,
            }
        ],
        "takeoff": {
            "area": config["builtArea"],
            "bathroomsPerUnit": 1,
            "kitchensPerUnit": 1,
            "structureType": "concrete",
            "wallType": "brick",
            "coefficients": {"wallRatio": 0.6, "concrete": 0.45, "rebar": 45},
            "results": {"concrete": config["builtArea"] * 0.45, "rebar": config["builtArea"] * 45},
            "savedAt": now_iso,
        },
    }


def main() -> None:
    contacts = build_contacts()
    inventory = build_inventory()
    configs = [
        {
            "name": "برج مسکونی نگین — پردیس فاز ۱",
            "shortName": "نگین فاز ۱",
            "code": "NGN-F1",
            "address": "پردیس، فاز ۱، بلوار امام خمینی، پلاک ۱۲",
            "lat": 35.7442,
            "lng": 51.8223,
            "landArea": 920,
            "builtArea": 5400,
            "phase": PROJECT_PHASES[1],
            "seed": 1,
            "soldCount": 11,
            "reservedCount": 3,
            "buyerOffset": 0,
            "investorIndex": 0,
            "contractorIndex": 0,
            "supplierIndex": 0,
            "capitalIn": 8500000000,
            "cementExpense": 320000000,
            "rebarCredit": 890000000,
            "craneCheck": 185000000,
            "initialMain": 1200000000,
            "accountMain": "1122334455661",
            "accountPetty": "9988776655441",
            "accountCheck": "5544332211001",
        },
        {
            "name": "مجتمع یاس — پردیس فاز ۸",
            "shortName": "یاس فاز ۸",
            "code": "YAS-F8",
            "address": "پردیس، فاز ۸، خیابان گلستان ۳، قطعه ۴۵",
            "lat": 35.7315,
            "lng": 51.812,
            "landArea": 1100,
            "builtArea": 6200,
            "phase": PROJECT_PHASES[2],
            "seed": 2,
            "soldCount": 9,
            "reservedCount": 4,
            "buyerOffset": 18,
            "investorIndex": 1,
            "contractorIndex": 1,
            "supplierIndex": 0,
            "capitalIn": 7200000000,
            "cementExpense": 280000000,
            "rebarCredit": 760000000,
            "craneCheck": 160000000,
            "initialMain": 950000000,
            "accountMain": "2233445566772",
            "accountPetty": "8877665544332",
            "accountCheck": "6655443322112",
        },
        {
            "name": "ساختمان مهر — بومهن (حومه پردیس)",
            "shortName": "مهر بومهن",
            "code": "MEHR-BM",
            "address": "بومهن، شهرک گلستان، بلوار شهید مطهری، پلاک ۸",
            "lat": 35.7289,
            "lng": 51.8612,
            "landArea": 780,
            "builtArea": 4800,
            "phase": PROJECT_PHASES[0],
            "seed": 3,
            "soldCount": 10,
            "reservedCount": 2,
            "buyerOffset": 36,
            "investorIndex": 0,
            "contractorIndex": 0,
            "supplierIndex": 1,
            "capitalIn": 6000000000,
            "cementExpense": 240000000,
            "rebarCredit": 620000000,
            "craneCheck": 140000000,
            "initialMain": 800000000,
            "accountMain": "3344556677883",
            "accountPetty": "7766554433223",
            "accountCheck": "7766554433224",
        },
    ]
    projects = [build_project(c, contacts, inventory) for c in configs]

    payload = {
        "version": 3,
        "exportedAt": datetime.now(timezone.utc).isoformat(),
        "company": {
            "name": "شرکت ساختمانی نمونه — مجموعه پردیس",
            "phone": "02176234567",
            "address": "تهران — دفتر مرکزی: بلوار میرداماد",
            "logo": None,
        },
        "projects": projects,
        "contacts": contacts,
        "reminders": [
            {
                "id": new_id("rem"),
                "text": "سررسید چک جرثقیل — پروژه نگین",
                "datetime": "2026-08-22T09:00:00.000Z",
                "projectId": projects[0]["id"],
                "notified": False,
            },
            {
                "id": new_id("rem"),
                "text": "جلسه صورت‌وضعیت — یاس فاز ۸",
                "datetime": "2026-10-01T10:30:00.000Z",
                "projectId": projects[1]["id"],
                "notified": False,
            },
        ],
        "inventory": inventory,
        "_meta": {
            "description": "نمونه ۳ پروژه ۱۸ واحدی اطراف پردیس — برای بازیابی در حساب Plus",
            "generatedBy": "scripts/generate-pardis-demo-backup.py",
        },
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    units = sum(len(p["units"]) for p in projects)
    txs = sum(len(p["financeTransactions"]) for p in projects)
    print(f"Written: {OUT}")
    print(f"Projects: {len(projects)} | Units: {units}")
    print(f"Contacts: {len(contacts)} | Finance txs: {txs}")


if __name__ == "__main__":
    main()
