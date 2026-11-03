// softlight Software — สคริปต์ร่วมทุกหน้า: ภาพเคลื่อนไหวตอนเลื่อน (ปิดเองเมื่อเครื่องตั้งลดการเคลื่อนไหว)
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
