#!/usr/bin/env python3
"""Generate Metrico lunch teaser MP4 from storyboard slides (FA / EN)."""
from __future__ import annotations

import textwrap
from pathlib import Path

import arabic_reshaper
import imageio.v3 as iio
import numpy as np
from bidi.algorithm import get_display
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = Path(__file__).resolve().parent
FONT_CANDIDATES = [
    ROOT / "fonts" / "Vazirmatn[wght].woff2",
    Path(r"C:\Windows\Fonts\tahoma.ttf"),
    Path(r"C:\Windows\Fonts\segoeui.ttf"),
]

W, H = 1920, 1080
FPS = 30
BG = (7, 13, 24)
ACCENT = (142, 106, 254)
TEXT = (248, 249, 253)
MUTED = (148, 163, 184)
BAD = (255, 107, 107)
GOOD = (110, 231, 183)


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for p in FONT_CANDIDATES:
        if p.is_file():
            try:
                return ImageFont.truetype(str(p), size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def shape(text: str, lang: str) -> str:
    if lang != "fa":
        return text
    return get_display(arabic_reshaper.reshape(text))


def draw_centered(
    draw: ImageDraw.ImageDraw,
    y: int,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill,
    lang: str,
    max_width: int = 1600,
) -> int:
    text = shape(text, lang)
    lines: list[str] = []
    for paragraph in text.split("\n"):
        paragraph = paragraph.strip()
        if not paragraph:
            lines.append("")
            continue
        avg = max(20, int(max_width / (font.size * 0.55)))
        lines.extend(textwrap.wrap(paragraph, width=avg) or [""])
    line_h = int(font.size * 1.45)
    for line in lines:
        bbox = draw.textbbox((0, 0), line or " ", font=font)
        tw = bbox[2] - bbox[0]
        x = (W - tw) // 2
        draw.text((x, y), line, font=font, fill=fill)
        y += line_h
    return y


def slide(
    lang: str,
    label: str,
    title: str,
    body: str = "",
    accent_line: str = "",
    tone: str | None = None,
) -> np.ndarray:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    for cx, cy, r, col in [(1400, 180, 280, ACCENT), (300, 900, 240, (93, 120, 255))]:
        for i in range(r, 0, -8):
            a = int(18 * (1 - i / r))
            draw.ellipse(
                (cx - i, cy - i, cx + i, cy + i),
                fill=(col[0] * a // 255, col[1] * a // 255, col[2] * a // 255),
            )

    f_label = load_font(36)
    f_title = load_font(72)
    f_body = load_font(44)
    f_accent = load_font(40)

    y = 200
    y = draw_centered(draw, y, label, f_label, ACCENT, lang)
    y += 30
    y = draw_centered(draw, y, title, f_title, TEXT, lang)
    if body:
        y += 40
        draw_centered(draw, y, body, f_body, MUTED, lang)
    if accent_line:
        color = BAD if tone == "bad" else GOOD if tone == "good" else TEXT
        y = H - 280
        draw_centered(draw, y, accent_line, f_accent, color, lang, max_width=1500)

    return np.array(img)


def logo_slide(lang: str, tag: str, cta: str) -> np.ndarray:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    logo_path = OUT_DIR.parent / "logo.png"
    if logo_path.is_file():
        lg = Image.open(logo_path).convert("RGBA").resize((120, 120), Image.Resampling.LANCZOS)
        img.paste(lg, ((W - 120) // 2, 320), lg)
    f1 = load_font(96)
    f2 = load_font(44)
    f3 = load_font(40)
    draw_centered(draw, 480, "Metrico", f1, TEXT, lang)
    draw_centered(draw, 600, tag, f2, MUTED, lang)
    draw_centered(draw, 720, cta, f3, ACCENT, lang)
    return np.array(img)


SCENES_FA = [
    (4.0, "نمایشگاه ساخت", "دو سرپرست پروژه", "قرار ناهار — بدون کارگاه.", "«اگر کارفرما زنگ زد… جوابم آماده است.»", "good"),
    (2.0, "جمعه", "رستوران · ناهار", "", "", None),
    (5.0, "تماس کارفرما", "پرونده و حدس", "", "«فکر کنم ۹ یا ۱۱ واحد… دقیق نیست.»", "bad"),
    (5.0, "همان میز", "پاسخ در چند ثانیه", "", "«۳۷ فروخته، ۱۲ رزرو — PDF الان.»", "good"),
    (4.0, "تضاد", "اکسل · دفترچه", "در برابر متریکو · یک نگاه", "«همین الان می‌فرستم.»", "good"),
    (4.0, "سؤال", "«این آمار کجاست؟»", "همینجا — مرکز فرمان پروژه.", "", None),
    (4.0, "متریکو", "واحد · مالی · مالک · آفلاین", "FA / EN · PWA", "", None),
    (5.0, "LOGO", "مدیریت پروژه ساختمانی", "رایگان شروع کنید", "", None),
]

SCENES_EN = [
    (4.0, "Construction expo", "Two site leads", "Lunch date — no jobsite.", "\"If the client rings… I'm ready.\"", "good"),
    (2.0, "Friday", "Restaurant · Lunch", "", "", None),
    (5.0, "Client call", "Folder and guesswork", "", "\"Maybe nine or eleven units… not sure.\"", "bad"),
    (5.0, "Same table", "Answer in seconds", "", "\"37 sold, 12 reserved — PDF now.\"", "good"),
    (4.0, "Contrast", "Spreadsheets · notes", "vs Metrico · one glance", "\"Sending it now.\"", "good"),
    (4.0, "Question", "\"Where is all this data?\"", "Right here — one command center.", "", None),
    (4.0, "Metrico", "Units · finance · owners · offline", "FA / EN · PWA", "", None),
    (5.0, "LOGO", "Construction PM", "Start free", "", None),
]


def build(lang: str, scenes, out_name: str) -> Path:
    frames: list[np.ndarray] = []
    for dur, label, title, body, accent, tone in scenes:
        n = max(1, int(dur * FPS))
        if label == "LOGO":
            fr = logo_slide(lang, title, body)
        else:
            fr = slide(lang, label, title, body, accent, tone)
        for _ in range(n):
            frames.append(fr)
    out = OUT_DIR / out_name
    iio.imwrite(
        out,
        np.stack(frames),
        fps=FPS,
        codec="libx264",
        quality=8,
        pixelformat="yuv420p",
    )
    return out


if __name__ == "__main__":
    fa = build("fa", SCENES_FA, "metrico-teaser-fa.mp4")
    en = build("en", SCENES_EN, "metrico-teaser-en.mp4")
    print("Wrote:", fa, "\n", en)
