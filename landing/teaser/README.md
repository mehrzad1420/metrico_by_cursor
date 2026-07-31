# تیزر «نهارِ پرتلفن» — پخش و ضبط

## فایل اصلی

`teaser.html` — تیزر ~۶۰ ثانیه، **پخش خودکار**، فارسی پیش‌فرض.

- انگلیسی: `teaser.html?lang=en`
- نسبت ۱۶:۹ (مناسب YouTube / لینکدین)؛ در موبایل letterbox.

## خروجی ویدیو (MP4)

در پوشهٔ پروژه (بعد از اجرای اسکریپت):

- `metrico-teaser-fa.mp4` — فارسی (~۳۳ ثانیه، اسلاید سینمایی + دیالوگ)
- `metrico-teaser-en.mp4` — انگلیسی

ساخت مجدد:

```text
python landing/teaser/generate_teaser_video.py
```

این MP4 **فیلمبرداری واقعی رستوران نیست**؛ برای نسخهٔ موشن غنی‌تر `teaser.html` را ضبط کن.

## ضبط HTML به MP4 (ویندوز)

1. `teaser.html` را در **Chrome** باز کن.
2. `F11` تمام‌صفحه.
3. **Win + G** (Xbox Game Bar) → Record یا **OBS** → Display Capture.
4. یک بار **Space** اگر پخش متوقف شد (معمولاً خودکار شروع می‌شود).
5. بعد از پایان (نوار پیشرفت ۱۰۰٪) ضبط را قطع کن.

موزیک را در CapCut/Premiere زیر تصویر بگذار (فایل صدا داخل تیزر نیست).

## دیپلوی

بعد از push:

`https://mehrzad1420.github.io/metrico_by_cursor/landing/teaser/teaser.html`

## فیلمنامه

`SCRIPT-BILINGUAL.md`

## نسخهٔ سادهٔ اسلایدی

`animatic.html`
