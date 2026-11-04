---
name: softlight-design
description: ระบบออกแบบ softlight design สำหรับสร้างหรือปรับเว็บไซต์/เว็บแอปของ softlight (HR Paper Mill, softlight software, Finance, Quotation, เว็บพอร์ตโฟลิโอ softlight และโปรเจกต์ใหม่) — ใช้เมื่อผู้ใช้ขอให้ออกแบบเว็บใหม่ "ด้วย softlight design" หรือให้หน้าตาเหมือนเว็บ softlight เดิม มี tokens CSS คอมโพเนนต์ sl-* ไอคอน Feather โลโก้ และเทมเพลต Product/Studio พร้อมกฎภาษา responsive และการทดสอบ
---

# softlight design

ระบบออกแบบเดียวของทุกเว็บ softlight ชื่อ token เหมือนกัน 3 ธีม สลับด้วย `data-theme` บน `<html>`

- **Product** (`light` + `dark` ตามเครื่อง) — เว็บแอป/เว็บขายซอฟต์แวร์: พื้นขาว การ์ดสีอ่อน `field` มุม 24px ปุ่มแคปซูล ปุ่มหลักไล่สีน้ำเงิน `#126EE4 → #0850D1`
- **Studio** (`data-theme="studio"`) — เว็บพอร์ตโฟลิโอ/แบรนด์: พื้นเกือบดำ `#0A0A0B` เหลือง `sun` `#FFE66D` คำเน้น Instrument Serif ตัวเอียง

หน้าระบบออกแบบ (ดูสี ตัวอักษร คอมโพเนนต์ และไอคอนทั้งหมด): https://claude.ai/artifact/RDnqcG6Fcsyww6Ns8Zd9qi

## ไฟล์ในสกิลนี้

| ไฟล์ | ใช้ทำอะไร |
| --- | --- |
| `softlight.css` | tokens ทั้ง 3 ธีม + คอมโพเนนต์ `sl-*` — คัดลอกไปไว้ที่ `css/softlight.css` ของโปรเจกต์ |
| `icons.svg` | sprite ไอคอน Feather 64 ตัว (`#i-send` `#i-history` `#i-bell` …) วางท้าย `<body>` |
| `assets/softlight-mark.png` | โลโก้ S ของ softlight (ดำ) — โหมดมืดกลับสีด้วย `filter: invert(1)` (ใน CSS แล้ว) |
| `templates/product.html` | จุดเริ่มเว็บแอป: แถบหัว การ์ด ฟอร์ม ปุ่มหลัก เมนูล่างมือถือ |
| `templates/studio.html` | จุดเริ่มเว็บแบรนด์: แถบหัว pill nav hero kicker การ์ดผลงาน |

## ขั้นตอนเริ่มเว็บใหม่

1. เลือกธีม: คน **ใช้งาน** (กรอก ส่ง จัดการ) → Product · คน **ดู** (ผลงาน บริการ แบรนด์) → Studio
2. คัดลอก `softlight.css` → `css/softlight.css`, `assets/softlight-mark.png` → `img/`, เทมเพลตที่เลือก → `index.html` แล้ววาง `icons.svg` ท้าย body
3. โหลดฟอนต์ Google Fonts ตามเทมเพลต (Google Sans + Noto Sans Thai, + Google Sans Code สำหรับ Product, + Instrument Serif สำหรับ Studio)
4. เขียน CSS ของหน้าด้วย `var(--token)` เท่านั้น — ห้ามพิมพ์สี hex ใหม่ในคอมโพเนนต์ ถ้าต้องการสีที่ไม่มี ให้ถามก่อน
5. ใช้คลาสคอมโพเนนต์ที่มี ก่อนสร้างใหม่ (รายการด้านล่าง)
6. ทดสอบ responsive และบั๊กทุกครั้ง (หัวข้อ "ทดสอบ")

## Tokens ที่ใช้บ่อย

- พื้น: `--ground` (หน้า) `--surface` (การ์ดซ้อน แถบล่าง) `--field` (การ์ด Product ช่องรอง) `--container` (ชิป ราง กล่องรอง) `--hover`
- เส้น: `--line` `--line-soft` `--outline` (ขอบช่องกรอก/ปุ่มรอง)
- ข้อความ: `--ink` `--ink-2` `--muted` — ทุกคู่ ≥4.5:1 บน ground/surface/field ทุกธีม
- สีหลัก: `--accent` `--accent-hover` `--accent-soft` `--on-accent` `--on-accent-soft` · ปุ่มหลัก `--primary-hi` `--primary` `--on-primary`
- สถานะ: `--ok` `--warn` `--bad` + `-soft` + `--on-*` · `--bad-line`
- Studio: `--sun` `--on-sun` `--coral` `--teal` `--violet` (`--sun` เป็นข้อความได้บนพื้นมืดเท่านั้น)
- ระยะ: `--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--card-pad` 18 · `--gutter` 20 · `--space-6` 24 · `--tap` 44 · `--nav-h` 64 · `--content` 480 · `--wrap` 1160 · `--studio-max` 1200
- มุม: `--radius-sm` 12 · `--radius-box` 14 · `--radius-md` 16 · `--radius-lg` 24 · `--radius-xl` 28 · `--radius-pill` · Studio `--studio-radius-md/lg/xl` 18/26/34
- เงา: `--shadow-card` `--shadow-highlight` `--shadow-button-hover` (เฉพาะของที่ลอย)
- ฟอนต์: `--font-sans` `--font-mono` `--font-serif`

## คอมโพเนนต์ (`sl-*`)

- ปุ่ม: `sl-btn` + `sl-btn-primary` (หนึ่งปุ่มต่อหน้าจอ) · `sl-btn-outline` · `sl-btn-danger` · `sl-btn-text` · `sl-btn-chip` · `sl-btn-block` · Studio `sl-btn-sun` (+ `<span class="sl-arrow">`) `sl-btn-light` `sl-btn-ghost`
- ฟอร์ม: `sl-label` `sl-input` (`aria-invalid="true"`) `sl-input-code` `sl-hint` (`is-error`)
- โครง: `sl-card` `sl-card-title` `sl-card-studio` `sl-tiles` `sl-tile`
- สถานะ: `sl-chip` (`is-ok` `is-warn` `is-bad` `is-info`) · `sl-banner-warn|bad|ok|info` · `sl-meter` (`is-warn` `is-bad`) + `sl-meter-top`
- นำทาง: `sl-topbar` `sl-brand` `sl-topnav` (`sl-nav-cta`) · `sl-bottomnav` + `sl-nav-item` (`aria-current="page"`) · `sl-seg` (role tablist) · Studio `sl-pillnav`
- อื่น ๆ: `sl-alert` (+ `sl-alert-icon` `sl-alert-actions`, ใช้ใน `<dialog>`) · `sl-avatar` (`-lg` `-xl`) · Studio `sl-kicker` `sl-sec-title` `sl-serif` `sl-sec-lead` `sl-work` (+ `-cover` `-badge` `-meta`)
- ไอคอน: `<svg class="sl-ic"><use href="#i-ชื่อ"/></svg>` (20px · `sl-ic-16` ในชิป/คำแนะนำ)

## ภาษาและเนื้อหา

- ภาษาไทยเป็นหลัก ประโยคสั้น ตรง ไม่มีอีโมจิ ไม่ใช้ "!" · คำเฉพาะคงชื่อเดิม (GPS, PDF, Google Sheets, LINE, PDPA)
- ป้ายเมนูอังกฤษสั้น ๆ ได้: Home, Products, Pricing, Contact · Services, Work, Packages, About · แอปมือถือ: Report, History, Alerts, Account
- ปุ่มเป็นคำกริยาบอกผล ("ส่งรายงาน" → แจ้ง "ส่งรายงานแล้ว") · ข้อผิดพลาดบอกวิธีแก้ ("กรอกเบอร์โทร 10 หลัก")
- ชื่อคนเป็นภาษาไทยเสมอ · เวลา "10:38 น." · ไทยใช้ พ.ศ. อังกฤษใช้ ค.ศ. · เบอร์/รหัสใช้ `sl-mono`
- ใช้เนื้อหาจริง ห้าม lorem ipsum

## กฎที่ต้องทำเสมอ

- มือถือก่อน · ห้ามหน้าเลื่อนแนวนอน · ป้ายปุ่ม/เมนู/ชิปอยู่บรรทัดเดียว (ย่อคำแทนการตัดบรรทัด) · คำภาษาไทยในตัวเน้นต้องไม่ถูกตัดกลางคำ
- เป้าแตะ ≥44px · ช่องกรอก 16px · ทุกช่องมี label · โฟกัสคีย์บอร์ดเห็นชัด (2px `accent`)
- ใส่ safe-area (`env(safe-area-inset-*)`) ที่แถบหัว/แถบล่าง · แถบหัว sticky ใช้ `top: env(safe-area-inset-top)`
- Product ต้องดีทั้งโหมดสว่างและมืด · สถานะบอกด้วยไอคอน/คำ ไม่ใช่สีอย่างเดียว
- การเคลื่อนไหวสั้น (.15–.32s) และปิดเมื่อ `prefers-reduced-motion`
- ห้าม: ไล่สีม่วง-น้ำเงิน แถบสีด้านซ้ายการ์ด เงาทุกการ์ด อีโมจิเป็นไอคอน วาดโลโก้ใหม่ ใช้โลโก้ลูกค้าเป็นของ softlight

## ทดสอบ (ทุกครั้งก่อนส่งงาน)

- ความกว้าง 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 และแนวนอนมือถือ (844×390) · โหมดสว่างและมืด
- ตรวจ: `scrollWidth - clientWidth` = 0 · ข้อความในปุ่ม/เมนูไม่ตัดบรรทัด (นับบรรทัดจาก text node ไม่ใช่ความสูงปุ่ม) · ไม่มีข้อความทับกัน · ไม่มี error ใน console
- ใช้ Playwright (`require('playwright')`) ถ่ายภาพหน้าจอดูด้วยตาทุกครั้ง
