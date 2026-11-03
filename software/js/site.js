// softlight Software — สคริปต์ร่วมทุกหน้า: แถบเมนูบน (ย้อนกลับ · เมนูหน้าปัจจุบันอยู่กลางจอ · ขอบจาง) · ภาพเคลื่อนไหวตอนเลื่อน
(() => {
    // ย้อนกลับ: มาจากหน้าในเว็บนี้ = กลับไปหน้าเดิม · เปิดตรงจากลิงก์ = ไปหน้าแรก
    const back = document.querySelector('[data-back]');
    if (back) back.addEventListener('click', e => {
        let same = false;
        try { same = document.referrer && new URL(document.referrer).origin === location.origin; } catch (err) {}
        if (same && history.length > 1) { e.preventDefault(); history.back(); }
    });
    // เมนูบนจอแคบเลื่อนแนวนอนได้: ให้หน้าปัจจุบันอยู่กลางแถบ · ขอบที่ยังมีเมนูซ่อนอยู่จางลง
    const nav = document.querySelector('.topnav');
    if (nav) {
        const fade = () => { const max = nav.scrollWidth - nav.clientWidth; nav.style.setProperty('--fade-l', nav.scrollLeft > 2 ? '24px' : '0px'); nav.style.setProperty('--fade-r', max - nav.scrollLeft > 2 ? '24px' : '0px'); };
        const center = () => {
            const cur = nav.querySelector('a[aria-current="page"]');
            if (cur && nav.scrollWidth > nav.clientWidth) { nav.style.scrollBehavior = 'auto'; nav.scrollLeft = cur.offsetLeft - nav.offsetLeft - (nav.clientWidth - cur.offsetWidth) / 2; nav.style.scrollBehavior = ''; }
            fade();
        };
        nav.addEventListener('scroll', fade, { passive: true });
        addEventListener('resize', center);
        center();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(center);
    }
})();
(() => {
    const SEL = '.sec-head, .card, .stat, .steps li, .pkg-card:not(.pkg-skel), .gallery figure, .x-sec, .faq details, .cta-band, .contact-card';
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let batch = 0, at = 0;
    const show = el => {
        if (!el.classList.contains('rv') || el.classList.contains('rv-in')) return;
        io.unobserve(el);
        const now = performance.now(); if (now - at > 120) { batch = 0; at = now; }
        el.style.setProperty('--rv-d', Math.min(batch++ * 60, 360) + 'ms');
        el.classList.add('rv-in');
        setTimeout(() => { el.classList.remove('rv', 'rv-in'); el.style.removeProperty('--rv-d'); }, 1100);
    };
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) show(e.target); }), { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    // เลื่อนเร็วจนข้ามไปทั้งส่วน (ไม่ทันตรวจ): แสดงทุกส่วนที่เลื่อนผ่านมาแล้วด้วย
    let raf = 0;
    addEventListener('scroll', () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; document.querySelectorAll('.rv:not(.rv-in)').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) show(el); }); }); }, { passive: true });
    const scan = root => (root || document).querySelectorAll(SEL).forEach(el => {
        if (el.dataset.rv || el.closest('.export')) return;
        el.dataset.rv = '1';
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * .9 && r.bottom > 0 && performance.now() > 1500) return; // อยู่บนจออยู่แล้วหลังโหลดเสร็จ: ไม่ซ่อน
        el.classList.add('rv'); io.observe(el);
    });
    scan();
    new MutationObserver(ms => { if (ms.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && !n.classList.contains('export')))) scan(); }).observe(document.body, { childList: true, subtree: true });
    addEventListener('beforeprint', () => document.querySelectorAll('.rv').forEach(el => el.classList.remove('rv')));
})();
