// software/js/product.js — แพ็กเกจและราคา HR Paper Mill (hr-paper-mill.html#packages)
//   ราคา: plans.public จากระบบหลังบ้านของ HR Paper Mill (Billing.gs) — แพลนที่ Dev ตั้งให้ "แสดงในหน้าแพ็กเกจ" + บัญชีรับเงิน
//         โหลดไม่ได้ → ใช้ข้อมูลที่จำไว้ หรือชุดตั้งต้นด้านล่าง (ตรงกับแพลนตั้งต้นใน Billing.gs)
//   ลิงก์ข้อเสนอเฉพาะลูกค้า (สร้างจาก Dev Console › แพลน › สร้างลิงก์ข้อเสนอ):
//     ?plans=lite,pro · ?cycle=yearly · ?to=ชื่อลูกค้า · ?ref=เลขที่ · ?valid=YYYY-MM-DD · ?off=10 (ส่วนลด %) · ?note=ข้อความ
//   ดาวน์โหลด PNG / PDF (html2canvas + jsPDF) · แชร์ลิงก์ (Web Share / คัดลอก)
(() => {
    const $ = id => document.getElementById(id);
    const esc = s => String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const ic = n => `<svg class="ic" aria-hidden="true"><use href="#i-${n}"/></svg>`;
    const baht = n => '฿' + Math.round(Number(n) || 0).toLocaleString('th-TH');
    const num = n => Math.round(Number(n) || 0).toLocaleString('th-TH');
    const thDate = iso => new Date(iso + 'T00:00:00+07:00').toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'long', year: 'numeric' });
    // ระบบหลังบ้านของ HR Paper Mill (เหมือน js/config.js ของแอป)
    const API = (() => { try { return { url: atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6X0ozZ1RyLTlPcUJ0LVpMOTBoZWtOcFQ1bVN1Q29NX0Qzcm5RSnlYa3JqSXdaQnZNd0xHSGdCVHdfZGtLZXRGQy0vZXhlYw=='), secret: atob('TVlfU1VQRVJfU0VDUkVUX0tFWV8yMDI2') }; } catch (e) { return null; } })();
    const EMAIL = 'contact.oannob@gmail.com';
    const CACHE = 'SL_HRPM_PLANS_V2';
    // ระบบหลังบ้านที่ยังเป็น Billing.gs รุ่นแรก (แพลน Starter 990 / Pro 2,490 ที่ไม่ได้แก้) = ราคาเก่า → ใช้ราคาปัจจุบันด้านล่างแทน
    const legacy = plans => { const sig = plans.map(p => p.id + ':' + p.priceMonthly).sort().join('|'); return /starter:990/.test(sig) && /pro:2490/.test(sig); };
    const DEFAULT = {
        plans: [
            { id: 'lite', name: 'Lite', tagline: 'เริ่มต้นสำหรับโครงการไม่เกิน 50 คน', priceMonthly: 1900, priceYearly: 19000, setupFee: 5000, maxUsers: 50, maxStaff: 3, trialDays: 30, highlight: false, fromPrice: false,
                features: ['แอปส่งรายงาน: GPS · ประเภทการขาย · ถ่ายรูปหลักฐาน · ประวัติ', 'กล้องพร้อมกรอบนำถ่าย + ประทับวันเวลา/พิกัด', 'Dashboard ภาพรวมวันนี้ + รายชื่อผู้ยังไม่ส่ง', 'รายงานพร้อมตัวกรอง · ส่งออก Excel / PDF รายเดือน', 'จัดการผู้ใช้สิทธิ์ · เจ้าหน้าที่เข้าสู่ระบบด้วย Google', 'ติดตั้ง + อบรมการใช้งาน 1 ชม.', 'ดูแลระบบ · อัปเดตฟังก์ชัน · สำรองข้อมูลรายสัปดาห์'] },
            { id: 'pro', name: 'Pro', tagline: 'คุ้มที่สุด รวมฟังก์ชันเสริมครบ', priceMonthly: 3900, priceYearly: 39000, setupFee: 5000, maxUsers: 200, maxStaff: 10, trialDays: 30, highlight: true, fromPrice: false,
                features: ['ทุกอย่างใน Lite', 'แจ้งเตือนผู้ที่ยังไม่ส่งรายงานทาง LINE และ Push', 'ส่งรายงานได้แม้สัญญาณหลุด + ติดตั้งเป็นแอป', 'โหมดตรวจรูปและอนุมัติรายงาน · ตรวจรูปซ้ำ / พิกัดผิดปกติ', 'โหมดอ่านง่ายสำหรับผู้พิการ', 'สถิติการใช้งานเรียลไทม์ · อีเมลรายงานประจำเดือน', 'อบรม 2 ชม. · ช่วยเหลือในวันทำการ'] },
            { id: 'enterprise', name: 'Enterprise', tagline: 'สำหรับองค์กรหลายโครงการ ปรับแต่งได้', priceMonthly: 7900, priceYearly: 79000, setupFee: 15000, maxUsers: 0, maxStaff: 0, trialDays: 30, highlight: false, fromPrice: true,
                features: ['ทุกอย่างใน Pro', 'ผู้ใช้สิทธิ์และเจ้าหน้าที่ไม่จำกัด · แยกหลายโครงการ/สาขา', 'แยกเก็บข้อมูลรายเดือน · ส่งออกข้อมูลทั้งหมดได้ทุกเมื่อ', 'ดูแลระบบรายปี (MA) รวมในแพ็กเกจ', 'ปรับแต่งรายงาน แบรนด์ และฟังก์ชันตามองค์กร', 'ผู้ดูแลเฉพาะ · ตอบกลับภายใน 4 ชม. ทำการ'] }
        ],
        accounts: [], trialDays: 30, contact: {}
    };
    // ฟังก์ชันเสริม (ใบเสนอราคา QT-2569-001) — รวมอยู่ในแพลนใด
    const ADDONS = [
        ['แจ้งเตือนผู้ที่ยังไม่ส่งรายงานทาง LINE', '2 สัปดาห์', 12000, ['pro', 'enterprise']],
        ['ส่งรายงานได้แม้สัญญาณหลุด + ติดตั้งเป็นแอป', '2 สัปดาห์', 9500, ['pro', 'enterprise']],
        ['โหมดตรวจรูปและอนุมัติรายงาน · ตรวจรูปซ้ำ', '2 สัปดาห์', 9500, ['pro', 'enterprise']],
        ['แยกเก็บข้อมูลรายเดือน', '1–2 สัปดาห์', 7000, ['enterprise']],
        ['โหมดอ่านง่ายสำหรับผู้พิการ', '1 สัปดาห์', 5500, ['pro', 'enterprise']]
    ];
    const MA = [['ดูแลระบบรายปี (MA): แก้ไขข้อผิดพลาด · สำรองข้อมูล · ปรับแก้เล็กน้อย 4 ชม./เดือน', '19,000 / ปี', 'รวมใน Enterprise'], ['งานแก้ไข/เพิ่มเติมนอกขอบเขต (ประเมินก่อนเริ่มงาน)', '800 / ชั่วโมง', '']];
    const TERMS = ['ชำระค่าติดตั้งเมื่อลงนาม · ค่าบริการชำระล่วงหน้าทุกเดือน (หรือรายปี)', 'สัญญาขั้นต่ำ 12 เดือน ต่ออายุอัตโนมัติ แจ้งยกเลิกล่วงหน้า 30 วัน',
        'ลูกค้าเป็นเจ้าของข้อมูล ส่งออกข้อมูลทั้งหมดได้ทุกเมื่อ (ซอฟต์แวร์เป็นสิทธิ์การใช้งาน)', 'อัปเกรดแพ็กเกจได้ทันที คิดส่วนต่างตามวันที่เหลือ', 'ผู้ใช้สิทธิ์เกินกำหนด: +250 บาท/เดือน ต่อทุก 25 คน',
        'ทดลองใช้ฟรี 30 วันก่อนเริ่มสัญญา · ราคาคงที่ตลอดสัญญาแรก', 'ราคาเป็นสกุลเงินบาท ยังไม่รวมภาษีมูลค่าเพิ่ม 7%'];

    // ---------- ลิงก์ข้อเสนอ ----------
    const q = new URLSearchParams(location.search);
    const offer = {
        plans: (q.get('plans') || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean).map(s => s === 'starter' ? 'lite' : s),
        to: (q.get('to') || '').slice(0, 120), ref: (q.get('ref') || '').slice(0, 40), note: (q.get('note') || '').slice(0, 300),
        valid: /^\d{4}-\d{2}-\d{2}$/.test(q.get('valid') || '') ? q.get('valid') : '',
        off: Math.max(0, Math.min(90, Math.round(Number(q.get('off')) || 0)))
    };
    let cycle = q.get('cycle') === 'yearly' ? 'yearly' : 'monthly';
    let data = DEFAULT, live = false;
    try { const c = JSON.parse(localStorage.getItem(CACHE) || 'null'); if (c && Array.isArray(c.plans) && c.plans.length) data = c; } catch (e) {}

    const visible = () => { const l = data.plans.filter(p => !offer.plans.length || offer.plans.includes(p.id)); return l.length ? l : data.plans; };
    const disc = v => (offer.off ? Math.round(v * (100 - offer.off) / 100) : v);
    const priceOf = p => { const base = cycle === 'yearly' ? (p.priceYearly || p.priceMonthly * 12) : p.priceMonthly; return { base, net: disc(base) }; };
    const lim = (n, unit) => (n ? `${num(n)} ${unit}` : 'ไม่จำกัด');
    const contactHref = plan => {
        const c = data.contact || {};
        const subject = `สนใจ HR Paper Mill แพ็กเกจ ${plan ? plan.name : ''}${offer.to ? ' — ' + offer.to : ''}${offer.ref ? ' (' + offer.ref + ')' : ''}`;
        if (c.line) return /^https?:/.test(c.line) ? c.line : 'https://line.me/R/ti/p/' + encodeURIComponent(c.line);
        return `mailto:${c.email || EMAIL}?subject=${encodeURIComponent(subject)}`;
    };

    // ---------- แสดงผล ----------
    function renderHead() {
        if (offer.to) {
            $('pkgEyebrow').textContent = 'ข้อเสนอแพ็กเกจ';
            $('pkgTitle').textContent = `ข้อเสนอสำหรับ ${offer.to}`;
            document.title = `ข้อเสนอ HR Paper Mill สำหรับ ${offer.to} — softlight`;
        }
        const today = new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10), expired = offer.valid && offer.valid < today;
        const chips = [
            offer.ref && `<span class="pkg-chip"><small>เลขที่</small><b>${esc(offer.ref)}</b></span>`,
            offer.valid && `<span class="pkg-chip ${expired ? 'is-bad' : ''}"><small>${expired ? 'หมดอายุแล้ว' : 'ยืนราคาถึง'}</small><b>${esc(thDate(offer.valid))}</b></span>`,
            offer.off && `<span class="pkg-chip is-accent"><small>ส่วนลดพิเศษ</small><b>${offer.off}%</b></span>`
        ].filter(Boolean).join('');
        $('pkgOffer').hidden = !chips && !offer.note;
        $('pkgOffer').innerHTML = `${chips ? `<div class="pkg-chips">${chips}</div>` : ''}${offer.note ? `<p class="pkg-msg">${esc(offer.note)}</p>` : ''}`;
        const trial = data.trialDays || 30;
        document.querySelectorAll('[data-trial]').forEach(el => { el.textContent = trial; });
        $('pkgLead').innerHTML = `ทุกแพ็กเกจ<b>ทดลองใช้ฟรี ${trial} วัน</b> ก่อนเริ่มสัญญา · ค่าติดตั้งชำระครั้งเดียว · ราคาคงที่ตลอดสัญญาแรก`;
    }

    function renderPlans() {
        const list = visible();
        const save = Math.max(0, ...list.filter(p => p.priceMonthly && p.priceYearly).map(p => Math.round((1 - p.priceYearly / (p.priceMonthly * 12)) * 100)));
        $('pkgSave').hidden = !save; $('pkgSave').textContent = `ประหยัด ${save}%`;
        $('pkgCycle').querySelectorAll('[data-c]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.c === cycle)));
        $('pkgPlans').dataset.n = list.length;
        $('pkgPlans').innerHTML = list.map(p => {
            const pr = priceOf(p), custom = !p.priceMonthly, per = cycle === 'yearly' ? '/ปี' : '/เดือน', href = contactHref(p);
            const sub = custom ? 'ราคาตามขนาดองค์กร' : cycle === 'yearly' ? `เฉลี่ย ${baht(pr.net / 12)}/เดือน` : (p.priceYearly ? `หรือ ${baht(disc(p.priceYearly))}/ปี (จ่ายรายปีประหยัดกว่า)` : '');
            return `<article class="pkg-card ${p.highlight ? 'is-hl' : ''}">
              ${p.highlight ? '<span class="pkg-badge">แนะนำ</span>' : ''}
              <h3>${esc(p.name)}</h3>
              <p class="pkg-tag">${esc(p.tagline || '')}</p>
              <div class="pkg-price">${custom ? '<b>ติดต่อฝ่ายขาย</b>' : `${p.fromPrice ? '<span class="from">เริ่มต้น</span>' : ''}${offer.off ? `<s>${baht(pr.base)}</s>` : ''}<b>${baht(pr.net)}</b><small>${per}</small>`}</div>
              <p class="pkg-sub">${esc(sub)}</p>
              <p class="pkg-setup">${p.setupFee ? `ค่าติดตั้ง ${baht(p.setupFee)} (ครั้งเดียว)` : 'ไม่มีค่าติดตั้ง'}</p>
              <a class="pkg-cta ${p.highlight ? 'is-primary' : ''}" href="${esc(href)}" ${/^https?:/.test(href) ? 'target="_blank" rel="noopener"' : ''}>${custom ? 'ติดต่อฝ่ายขาย' : `ทดลองใช้ฟรี ${p.trialDays || data.trialDays || 30} วัน`}</a>
              <ul class="pkg-feat">
                <li class="pkg-lim">${ic('users')}<span>ผู้ใช้สิทธิ์ ${lim(p.maxUsers, 'คน')} · เจ้าหน้าที่ ${lim(p.maxStaff, 'บัญชี')}</span></li>
                ${(p.features || []).map(f => `<li>${ic('check')}<span>${esc(f)}</span></li>`).join('')}
              </ul>
            </article>`;
        }).join('');
        $('pkgNote').textContent = `ราคายังไม่รวมภาษีมูลค่าเพิ่ม 7% · ผู้ใช้สิทธิ์เกินกำหนด +250 บาท/เดือน ต่อทุก 25 คน${offer.off ? ` · ราคารวมส่วนลด ${offer.off}% แล้ว` : ''}${live ? '' : ' · ราคาอ้างอิง กรุณายืนยันกับฝ่ายขาย'}`;
        renderCompare(list);
        renderAddons(list);
    }

    function renderCompare(list) {
        const row = (label, fn) => `<tr><th scope="row">${label}</th>${list.map(p => `<td>${fn(p)}</td>`).join('')}</tr>`;
        const money = (p, k) => (p[k] ? (p.fromPrice ? 'เริ่มต้น ' : '') + baht(disc(p[k])) : (p.priceMonthly ? '-' : 'ติดต่อฝ่ายขาย'));
        const has = (p, ids) => (ids.includes(p.id) ? ic('check') : p.id === 'lite' || !['pro', 'enterprise'].includes(p.id) ? '<span class="no">ฟังก์ชันเสริม</span>' : '<span class="no">–</span>');
        $('pkgCmp').innerHTML = `<thead><tr><th scope="col"><span class="sr-only">รายการ</span></th>${list.map(p => `<th scope="col" class="${p.highlight ? 'is-hl' : ''}">${esc(p.name)}</th>`).join('')}</tr></thead><tbody>
          ${row('ราคา/เดือน', p => money(p, 'priceMonthly'))}
          ${row('ราคา/ปี', p => money(p, 'priceYearly'))}
          ${row('ค่าติดตั้ง (ครั้งเดียว)', p => (p.setupFee ? baht(p.setupFee) : '-'))}
          ${row('ผู้ใช้สิทธิ์', p => lim(p.maxUsers, 'คน'))}
          ${row('บัญชีเจ้าหน้าที่', p => lim(p.maxStaff, 'บัญชี'))}
          ${row('ส่งรายงาน รูป + GPS · แดชบอร์ด · ส่งออกไฟล์', () => ic('check'))}
          ${ADDONS.map(a => row(esc(a[0]), p => has(p, a[3]))).join('')}
          ${row('ดูแลระบบรายปี (MA)', p => (p.id === 'enterprise' ? ic('check') : '<span class="no">19,000/ปี</span>'))}
          ${row('ทดลองใช้ฟรี', p => `${p.trialDays || data.trialDays || 30} วัน`)}</tbody>`;
    }

    function renderAddons(list) {
        const ids = list.map(p => p.id);
        $('pkgAddons').innerHTML = `<thead><tr><th>#</th><th>ฟังก์ชัน</th><th>ระยะเวลาพัฒนา</th><th class="num">ราคา (บาท)</th></tr></thead><tbody>${ADDONS.map((a, i) => `<tr>
            <td>${i + 1}</td><td>${esc(a[0])}${a[3].filter(x => ids.includes(x)).length ? ` <span class="included">รวมใน ${a[3].filter(x => ids.includes(x)).map(x => (list.find(p => p.id === x) || {}).name || x).join(' / ')}</span>` : ''}</td>
            <td>${esc(a[1])}</td><td class="num">${num(a[2])}</td></tr>`).join('')}</tbody>`;
        $('pkgMa').innerHTML = `<thead><tr><th>รายการ</th><th class="num">ราคา (บาท)</th></tr></thead><tbody>${MA.map(m => `<tr><td>${esc(m[0])}${m[2] && ids.includes('enterprise') ? ` <span class="included">${esc(m[2])}</span>` : ''}</td><td class="num">${esc(m[1])}</td></tr>`).join('')}</tbody>`;
        $('pkgTerms').innerHTML = TERMS.map(t => `<li>${esc(t)}</li>`).join('');
    }

    function renderPay() {
        const acc = data.accounts || [];
        $('pkgPaySec').hidden = !acc.length;
        const TYPE = { bank: 'บัญชีธนาคาร', promptpay: 'พร้อมเพย์', other: 'ช่องทางอื่น' };
        $('pkgPay').innerHTML = acc.map(a => `<div class="pay-acc ${a.isDefault ? 'is-default' : ''}">
            <span class="pay-ic">${ic('bank')}</span>
            <span class="pay-txt"><small>${esc(a.bank || TYPE[a.type] || '')}${a.branch ? ' · สาขา' + esc(a.branch) : ''}</small><b>${esc(a.number)}</b><small>${esc(a.name)}</small></span>
            <button type="button" class="pay-copy" data-copy="${esc(String(a.number).replace(/[\s-]/g, ''))}" aria-label="คัดลอกเลข ${esc(a.number)}">คัดลอก</button></div>`).join('');
    }
    function render() { renderHead(); renderPlans(); renderPay(); }

    async function load() {
        if (!API) return;
        try {
            const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 9000);
            const res = await fetch(API.url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'plans.public', secret: API.secret }), signal: ctl.signal });
            clearTimeout(t);
            const r = await res.json();
            if (r && r.success && Array.isArray(r.plans) && r.plans.length && !legacy(r.plans)) {
                data = { plans: r.plans, accounts: r.accounts || [], trialDays: r.trialDays || 30, contact: r.contact || {} };
                live = true;
                try { localStorage.setItem(CACHE, JSON.stringify(data)); } catch (e) {}
                render();
            } else if (r && r.success && Array.isArray(r.accounts) && r.accounts.length) {
                // แพลนยังเป็นรุ่นเก่า: ใช้ราคาปัจจุบัน แต่ยังแสดงบัญชีรับเงินจากระบบ
                data = Object.assign({}, DEFAULT, { accounts: r.accounts, contact: r.contact || {} });
                live = true;
                render();
            }
        } catch (e) { /* ใช้ข้อมูลที่จำไว้ / ชุดตั้งต้น */ }
    }

    // ---------- แจ้งผลสั้นๆ ----------
    let toastT;
    function toast(text) {
        let el = $('toast');
        if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
        el.textContent = text; el.classList.add('is-on');
        clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('is-on'), 2400);
    }
    async function copy(text) {
        try { await navigator.clipboard.writeText(text); return true; } catch (e) {
            const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
            let ok = false; try { ok = document.execCommand('copy'); } catch (er) {} ta.remove(); return ok;
        }
    }

    // ---------- ส่งออก PNG / PDF ----------
    // ชื่อไฟล์เป็นอักษรอังกฤษ (บางเบราว์เซอร์/มือถือไม่รับชื่อไฟล์ภาษาไทย) + เลขที่ข้อเสนอ ถ้ามี
    const fileBase = () => { const ref = offer.ref.replace(/[^A-Za-z0-9-]+/g, '-').replace(/^-+|-+$/g, ''); return `HR-Paper-Mill-Packages${ref ? '-' + ref : ''}-${new Date().toISOString().slice(0, 10)}`; };
    async function snapshot() {
        if (!window.html2canvas) throw new Error('ยังโหลดเครื่องมือไม่เสร็จ กรุณาลองอีกครั้ง');
        const root = document.documentElement, prev = root.getAttribute('data-theme');
        root.setAttribute('data-theme', 'light'); // ไฟล์สีสว่างเสมอ (พิมพ์/ส่งต่อได้)
        const box = document.createElement('div');
        box.className = 'export';
        const sub = [offer.ref && 'เลขที่ ' + offer.ref, 'วันที่ ' + new Date().toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'long', year: 'numeric' })].filter(Boolean).join(' · ');
        box.innerHTML = `<div class="x-top"><img src="img/softlight-logo.png" alt="" width="40" height="40"><b>softlight</b><span>${esc(sub)}</span></div>
          <p class="eyebrow">HR Paper Mill · ${offer.to ? 'ข้อเสนอแพ็กเกจ' : 'แพ็กเกจและราคา'}</p><h2 class="x-title">${esc(offer.to ? 'ข้อเสนอสำหรับ ' + offer.to : 'แพ็กเกจและราคา HR Paper Mill')}</h2>
          <p class="muted" style="margin-bottom:20px">ระบบรายงานการขายประจำวันสำหรับโครงการมาตรา 35 พร้อมแดชบอร์ดเจ้าหน้าที่ HR · ทดลองใช้ฟรี ${data.trialDays || 30} วัน</p>`;
        if (!$('pkgOffer').hidden) { const o = $('pkgOffer').cloneNode(true); o.removeAttribute('id'); o.style.margin = '0 0 24px'; box.appendChild(o); }
        const plans = $('pkgPlans').cloneNode(true); plans.removeAttribute('id'); box.appendChild(plans);
        const note = document.createElement('p'); note.className = 'pkg-note'; note.textContent = $('pkgNote').textContent; box.appendChild(note);
        ['cmpSec', 'addSec', 'maSec', 'termSec'].concat($('pkgPaySec').hidden ? [] : ['pkgPaySec']).forEach(id => {
            const s = $(id).cloneNode(true); s.removeAttribute('id'); s.hidden = false; s.style.marginTop = ''; box.appendChild(s);
        });
        box.insertAdjacentHTML('beforeend', `<div class="x-foot"><span>softlight · ${EMAIL} · IG @softlight.works</span><span>bysoftlight.github.io/software/hr-paper-mill.html</span></div>`);
        box.querySelectorAll('.pay-copy').forEach(n => n.remove());
        box.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
        box.querySelectorAll('.rv, .rv-in').forEach(n => n.classList.remove('rv', 'rv-in'));
        // html2canvas วาด <use href="#i-..."> ไม่ได้ → แทนด้วยเนื้อ SVG จริง
        box.querySelectorAll('svg use').forEach(u => {
            const sym = document.querySelector(u.getAttribute('href')), svg = u.closest('svg');
            if (!sym || !svg) return;
            svg.setAttribute('viewBox', sym.getAttribute('viewBox') || '0 0 24 24');
            svg.innerHTML = sym.innerHTML;
        });
        document.body.appendChild(box);
        try {
            box.querySelectorAll('svg.ic').forEach(svg => { const c = getComputedStyle(svg).color; svg.setAttribute('stroke', c); svg.setAttribute('fill', 'none'); svg.setAttribute('stroke-width', '2'); svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round'); });
            if (document.fonts && document.fonts.ready) await document.fonts.ready;
            await Promise.all([...box.querySelectorAll('img')].map(img => img.complete ? 0 : new Promise(r => { img.onload = img.onerror = r; })));
            return await window.html2canvas(box, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false, windowWidth: 1200 });
        } finally {
            box.remove();
            if (prev === null) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', prev);
        }
    }
    function download(blob, name) {
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }
    async function busy(btn, fn) {
        if (btn.disabled) return;
        const html = btn.innerHTML; btn.disabled = true; btn.textContent = 'กำลังสร้าง…';
        try { await fn(); } catch (e) { toast(e.message || 'สร้างไฟล์ไม่สำเร็จ'); } finally { btn.disabled = false; btn.innerHTML = html; }
    }
    async function savePng() {
        const canvas = await snapshot();
        download(await new Promise(r => canvas.toBlob(r, 'image/png')), fileBase() + '.png');
        toast('ดาวน์โหลด PNG แล้ว');
    }
    async function savePdf() {
        const canvas = await snapshot();
        const JsPDF = window.jspdf && window.jspdf.jsPDF;
        if (!JsPDF) throw new Error('ยังโหลดเครื่องมือ PDF ไม่เสร็จ กรุณาลองอีกครั้ง');
        const pdf = new JsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
        const W = 210, H = 297, M = 8, cw = W - 2 * M, ch = H - 2 * M, pxPerMm = canvas.width / cw, pageH = Math.floor(ch * pxPerMm);
        const ctx = canvas.getContext('2d');
        // ตัดหน้าตรงแถวสีขาว (ระหว่างส่วน) ไม่ตัดกลางการ์ด/ตาราง
        const blank = y => { const d = ctx.getImageData(0, y, canvas.width, 1).data; for (let i = 0; i < d.length; i += 16) if (d[i] < 248 || d[i + 1] < 248 || d[i + 2] < 248) return false; return true; };
        let y = 0, first = true;
        while (y < canvas.height - 4) {
            let h = Math.min(pageH, canvas.height - y);
            if (y + h < canvas.height) for (let k = 0; k < pageH * 0.35; k += 2) if (blank(y + h - k)) { h -= k; break; }
            const part = document.createElement('canvas'); part.width = canvas.width; part.height = h;
            part.getContext('2d').drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);
            if (!first) pdf.addPage();
            pdf.addImage(part.toDataURL('image/jpeg', 0.92), 'JPEG', M, M, cw, h / pxPerMm);
            first = false; y += h;
        }
        pdf.save(fileBase() + '.pdf');
        toast('ดาวน์โหลด PDF แล้ว');
    }
    async function share() {
        const u = new URL(location.href); u.hash = 'packages';
        const url = u.href, title = offer.to ? `ข้อเสนอแพ็กเกจ HR Paper Mill สำหรับ ${offer.to}` : 'แพ็กเกจและราคา HR Paper Mill — softlight';
        if (navigator.share) { try { await navigator.share({ title, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
        toast((await copy(url)) ? 'คัดลอกลิงก์แล้ว' : url);
    }

    function init() {
        render();
        $('pkgCycle').addEventListener('click', e => {
            const b = e.target.closest('[data-c]'); if (!b || b.dataset.c === cycle) return;
            cycle = b.dataset.c;
            const u = new URL(location.href);
            if (cycle === 'yearly') u.searchParams.set('cycle', 'yearly'); else u.searchParams.delete('cycle');
            history.replaceState(null, '', u);
            renderPlans();
        });
        $('pkgPng').addEventListener('click', e => busy(e.currentTarget, savePng));
        $('pkgPdf').addEventListener('click', e => busy(e.currentTarget, savePdf));
        $('pkgShare').addEventListener('click', share);
        $('pkgPay').addEventListener('click', async e => { const b = e.target.closest('[data-copy]'); if (b) toast((await copy(b.dataset.copy)) ? 'คัดลอกเลขบัญชีแล้ว' : b.dataset.copy); });
        // ลิงก์ข้อเสนอ: เปิดมาที่แพ็กเกจเลย
        if ((offer.to || offer.plans.length || offer.ref) && !location.hash) location.hash = 'packages';
        // เปิดลิงก์ที่มี #packages: เลื่อนให้ตรงอีกครั้งเมื่อฟอนต์/รูปโหลดเสร็จ (ความสูงด้านบนเปลี่ยน)
        if (location.hash === '#packages') {
            const fix = () => { if (scrollY < 40 || Math.abs($('packages').getBoundingClientRect().top) < 400) $('packages').scrollIntoView({ block: 'start' }); };
            (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(fix));
            addEventListener('load', () => requestAnimationFrame(fix), { once: true });
        }
        load();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
    window.Product = { snapshot, get data() { return data; }, get live() { return live; } };
})();
