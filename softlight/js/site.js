// softlight — ผลงาน (ข้อมูลจากพอร์ตโฟลิโอ) · ตัวกรอง · หน้าต่างดูภาพ · เมนูมือถือ · แถบบนตอนเลื่อน
const W = n => `img/work/${n}.webp`;
const WORKS = [
  { id: 'grad', cat: 'photo', label: 'Graduate Photography', title: 'รับปริญญา Mass Comm CMU', sub: 'ถ่ายภาพรับปริญญาแบบกลุ่ม', wide: true,
    imgs: ['grad-1', 'grad-3', 'grad-2', 'grad-4', 'grad-5', 'grad-6'],
    desc: 'ภาพรับปริญญากลุ่มเพื่อน คณะการสื่อสารมวลชน มหาวิทยาลัยเชียงใหม่ ทั้งโทนสีและขาวดำ ใช้มุมกล้อง การเคลื่อนไหว และสถานที่ในมหาวิทยาลัยเล่าเรื่องของแต่ละกลุ่ม', roles: ['Photographer', 'Retouching'] },
  { id: 'ey', cat: 'photo', label: 'Event Photography', title: 'EY Outing 2024', sub: 'Freelance Photographer · 2 วัน',
    imgs: ['ey-2', 'ey-1', 'ey-3', 'ey-6', 'ey-4', 'ey-5'],
    desc: 'ถ่ายภาพงาน EY Outing 2024 ทั้ง Rainbow Light Party และกิจกรรมของวันที่สอง ตั้งแต่บรรยากาศบนเวที โต๊ะอาหาร จนถึงช่วงเวลาของผู้ร่วมงาน', roles: ['Freelance Photographer'] },
  { id: 'nok', cat: 'photo', label: 'Festival Photography', title: 'Nok Festival 4', sub: 'คอนเสิร์ตฟรีของมหาวิทยาลัยเชียงใหม่',
    imgs: ['nok-1', 'nok-2', 'nok-3', 'nok-6', 'nok-5', 'nok-4'],
    desc: 'ภาพงาน Nok Festival 4 ตั้งแต่บ่ายจนถึงคอนเสิร์ตกลางคืน — ศิลปินบนเวที การแสดง และผู้ชม นอกจากถ่ายภาพยังร่วมทีมเป็น Content & PR Media Planner และออกแบบกราฟิก/Motion Graphic ของงาน', roles: ['Photographer', 'Content & PR Planner', 'Graphic & Motion'] },
  { id: 'gov', cat: 'photo', label: 'Event Photography', title: 'GOV BYE', sub: 'งานเลี้ยงอำลา',
    imgs: ['gov-2', 'gov-1', 'gov-4', 'gov-3'],
    desc: 'ภาพงานเลี้ยงอำลา ทั้งภาพหมู่ ภาพแฟชั่นกลางแจ้ง และบรรยากาศปาร์ตี้ในร้าน', roles: ['Photographer'] },
  { id: 'camp', cat: 'photo', label: 'Event Photography', title: 'Neotizen Camp', sub: 'ค่ายเยาวชนคนรุ่นใหม่',
    imgs: ['camp-1', 'camp-2', 'camp-3'],
    desc: 'ภาพกิจกรรมค่ายเยาวชนคนรุ่นใหม่ ทั้งช่วงบรรยาย เวิร์กช็อป การโต้วาที และภาพหมู่ของผู้ร่วมค่าย', roles: ['Photographer'] },
  { id: 'studio', cat: 'photo', label: 'Studio Photography', title: 'Studio Portrait', sub: 'ถ่ายภาพในสตูดิโอ',
    imgs: ['studio-2', 'studio-1', 'studio-3', 'studio-4'],
    desc: 'ภาพพอร์ตเทรตและภาพสินค้ากับพรีเซนเตอร์ในสตูดิโอ จัดแสงให้ผิวและรายละเอียดดูเป็นธรรมชาติ', roles: ['Photographer', 'Lighting'] },
  { id: 'srichand', cat: 'ads', label: 'Advertising Photography', title: 'Srichand Skin Moisture Burst Gel Cream', sub: '"ผิวเด้งฉ่ำ ลืมเวลา"',
    imgs: ['srichand-1', 'srichand-2', 'srichand-3'],
    desc: 'ถ่ายภาพผลิตภัณฑ์และพรีเซนเตอร์ภายใต้การจัดแสงแบบ Softlight ใช้ Compositing น้ำกระเซ็นและหยดน้ำสื่อการกักเก็บความชุ่มชื้น 72 ชั่วโมง สร้าง Key Visual ทั้งแนวตั้ง 4:5 สำหรับโซเชียลและแนวนอนสำหรับแบนเนอร์ (Course 851368: Advertising Photography)', roles: ['Art Direction', 'Photography', 'Retouching', 'Key Visual'] },
  { id: 'mizumi', cat: 'ads', label: 'IMC Campaign', title: 'Mizumi Aloe Plus C Booster', sub: '"เริ่มต้นอย่างเต็มร้อยไปกับ Mizumi"',
    imgs: ['mizumi-1', 'mizumi-2', 'mizumi-4', 'mizumi-3'],
    desc: 'วางตำแหน่ง Mizumi เป็น "starter pack" ของมือใหม่หัดดูแลผิว ส่งมอบสื่อ 6 ชิ้น: TVC 30 วินาที "Guardian Angel", Print Ads & PR, Podcast "Beauty & History" 5 ตอน, Spot Ads วิทยุ และกิจกรรม O2O "Be 100% You"', roles: ['Director & Editor (TVC)', 'Photographer & Designer', 'Sound Director'] },
  { id: 'jabs', cat: 'ads', label: 'Media Planning · IMC', title: 'Jabs Watermelon Smoothie Lotion', sub: 'รองชนะเลิศอันดับ 1 · รางวัล 7,000 บาท', badge: 'รางวัล',
    imgs: ['jabs-1', 'jabs-2'],
    desc: 'แคมเปญ "แสงไหน ก็ไบร์ทฉ่ำ" วางตำแหน่ง Jabs SPF50+ PA+++ เป็นกันแดดไฮบริดสำหรับ Gen Z เชียงใหม่ — TikTok Challenge, Micro Influencer, ป้าย LED รอบ มช., Sampling และอีเวนต์ ได้รับรางวัลรองชนะเลิศอันดับ 1 การแข่งขัน Marketing Communication Planning (ลูกค้า: C.P. Consumer Products)', roles: ['Brand Competitor Analysis', 'Pitchman'] },
  { id: 'makro', cat: 'ads', label: 'Creative Idea', title: 'Makro PRO — Makro Haul-ler', sub: 'Creative Idea for 2026 Year Plan',
    imgs: ['makro-1'],
    desc: 'ไอเดียแผนทั้งปี 2026 "Makro PRO The Trendsetter — Shop ให้โลกจำ" แบ่ง 3 เฟส (The Discovery · The Experience · The Celebration) ด้วยคอนเทนต์ KOL บน TikTok ที่ Drive to Store', roles: ['Creative Idea', 'KOL Strategy'] },
  { id: 'plans', cat: 'ads', label: 'Marketing Plan', title: 'YOK-SOD · KitKat · คนแบกกุ้ง', sub: 'Digital Marketing & IMC Plans',
    imgs: ['kitkat', 'yoksod', 'lobster'],
    desc: 'แผนการตลาดดิจิทัลและ IMC: แผนทั้งปีของขนมไทย "หยกสด", แคมเปญ 3 เดือน "เกิดมาเพื่อขาย (Born to Sell KitKat)" และ IMC น้ำปลาตราคนแบกกุ้ง "แบกให้สุด ทุกเจนเนอเรชั่น"', roles: ['Market Analysis', 'Communication Strategy'] },
  { id: 'lemon8', cat: 'ads', label: 'Content Creator', title: '#Lemon8ท้าGenZ', sub: 'คอนเทนต์บน Lemon8',
    imgs: ['lemon8-1', 'lemon8-2'],
    desc: 'คอนเทนต์ไลฟ์สไตล์และเทคสำหรับผู้ชายวัยเริ่มทำงาน บนแพลตฟอร์ม Lemon8 (Course 705430: Content Marketing)', roles: ['Content Creator', 'Graphic'] },
  { id: 'hum60', cat: 'graphic', label: 'Logo Design', title: '60 ปี คณะมนุษยศาสตร์ มช.', sub: 'ตราสัญลักษณ์ครบรอบ 60 ปี',
    imgs: ['hum60-1', 'hum60-2', 'hum60-3'],
    desc: 'ร่วมออกแบบตราสัญลักษณ์ในวาระครบรอบ 60 ปี คณะมนุษยศาสตร์ มหาวิทยาลัยเชียงใหม่ พร้อม Mockup บนสินค้าที่ระลึก', roles: ['Logo Designer'] },
  { id: 'fmn', cat: 'graphic', label: 'Graphic Design', title: 'CMU Freshmen Night 2023 · CMU SOSAFE', sub: 'สโมสรนักศึกษา มช.',
    imgs: ['fmn-1', 'sosafe-1', 'sosafe-2'],
    desc: 'ออกแบบป้ายชื่อ Staff และโลโก้สำหรับเว็บไซต์ GMM Show ของงานรับขวัญลูกช้างเชือกใหม่ 2566 และชุด Digital Ads ของกิจกรรม CMU SOSAFE', roles: ['Graphic Designer'] },
  { id: 'masscomm', cat: 'graphic', label: 'Graphic Design', title: 'กิจกรรมคณะการสื่อสารมวลชน', sub: 'Digital Ads · Print Ads',
    imgs: ['nokposter', 'welcome66', 'poyfilm'],
    desc: 'โปสเตอร์ผู้สนับสนุน Nok Festival 4, สื่อกิจกรรมรับน้องแมสคอม 2566 และกิจกรรมปอยฟิล์ม เฟสติวัล', roles: ['Graphic Designer'] },
  { id: '3d', cat: 'graphic', label: '3D Modeling', title: 'CELINE · La Roche-Posay', sub: 'Blender 3D',
    imgs: ['celine', 'laroche'],
    desc: 'โมเดลและเรนเดอร์ภาพสินค้า CELINE Parade Eau de Parfum และ La Roche-Posay Effaclar Serum ด้วย Blender (Course 851368: Advertising Photography)', roles: ['3D Modeling', 'Lighting', 'Render'] },
  { id: 'hrpm', cat: 'dev', label: 'Web App', title: 'HR Paper Mill', sub: 'ระบบรายงานการขาย มาตรา 35', wide: true, link: '/hr-paper-mill/',
    imgs: ['hrpm'],
    desc: 'ระบบส่งรายงานการขายประจำวันสำหรับโครงการใช้สิทธิ์สัมปทานผู้พิการตามมาตรา 35 — ผู้ใช้สิทธิ์ส่งรายงานพร้อมพิกัด GPS และรูปหลักฐานจากมือถือ (ส่งได้แม้สัญญาณหลุด ติดตั้งเป็นแอปได้) ฝั่งเจ้าหน้าที่มี Dashboard แผนที่ ตรวจรูปซ้ำ แจ้งเตือน และส่งออกรายงาน ทำงานบน Google Workspace', roles: ['UX/UI', 'Web Development', 'Data'] }
];

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const CAT = { photo: 'ถ่ายภาพ', ads: 'โฆษณา & การตลาด', graphic: 'กราฟิก & 3D', dev: 'ระบบ & เว็บแอป' };

// ---------- การ์ดผลงาน ----------
function renderWorks(f) {
  $('works').innerHTML = WORKS.filter(w => f === 'all' || w.cat === f).map(w => `
    <button class="work${w.wide && f === 'all' ? ' is-wide' : ''} reveal is-in" type="button" data-id="${w.id}" aria-haspopup="dialog">
      <span class="cover"><img src="${W(w.imgs[0])}" alt="" loading="lazy" decoding="async">
        ${w.badge ? `<span class="badge">${esc(w.badge)}</span>` : ''}
        ${w.imgs.length > 1 ? `<span class="count"><svg class="ic"><use href="#i-images"/></svg>${w.imgs.length}</span>` : ''}</span>
      <span class="meta"><small>${esc(w.label)}</small><b>${esc(w.title)}</b><span>${esc(w.sub)}</span></span>
    </button>`).join('');
}
$('filters').addEventListener('click', e => {
  const b = e.target.closest('[data-f]'); if (!b) return;
  $('filters').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  renderWorks(b.dataset.f);
});
$('works').addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b) openWork(b.dataset.id, b); });
renderWorks('all');

// ---------- หน้าต่างดูภาพ ----------
let CUR = null, IDX = 0, OPENER = null;
function openWork(id, opener) {
  CUR = WORKS.find(w => w.id === id); if (!CUR) return;
  IDX = 0; OPENER = opener || null;
  $('vCat').textContent = `${CAT[CUR.cat]} · ${CUR.label}`;
  $('vTitle').textContent = CUR.title;
  $('vDesc').innerHTML = `<p>${esc(CUR.desc)}</p><div class="roles">${CUR.roles.map(r => `<span>${esc(r)}</span>`).join('')}</div>`
    + (CUR.link ? `<p><a href="${CUR.link}">เปิด ${esc(CUR.title)} →</a></p>` : '');
  $('vThumbs').innerHTML = CUR.imgs.length > 1 ? CUR.imgs.map((n, i) => `<button type="button" data-i="${i}" aria-label="ภาพที่ ${i + 1}"><img src="${W(n)}" alt="" loading="lazy"></button>`).join('') : '';
  $('vThumbs').hidden = CUR.imgs.length < 2;
  show(0);
  $('viewer').showModal();
  $('viewer').querySelector('[data-close]').focus();
}
function show(i) {
  const n = CUR.imgs.length;
  IDX = (i + n) % n;
  $('vImg').src = W(CUR.imgs[IDX]);
  $('vImg').alt = `${CUR.title} — ภาพที่ ${IDX + 1} จาก ${n}`;
  $('vPrev').hidden = $('vNext').hidden = n < 2;
  $('vThumbs').querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-current', String(k === IDX)));
  const box = $('vThumbs'), t = box.querySelector(`[data-i="${IDX}"]`); // เลื่อนเฉพาะแถบภาพย่อ (ไม่ดึงทั้งหน้าต่าง)
  if (t) box.scrollLeft = Math.max(0, t.offsetLeft - (box.clientWidth - t.offsetWidth) / 2);
}
$('vPrev').addEventListener('click', () => show(IDX - 1));
$('vNext').addEventListener('click', () => show(IDX + 1));
$('vThumbs').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i); });
$('viewer').addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target === $('viewer')) $('viewer').close(); });
$('viewer').addEventListener('close', () => { if (OPENER && document.contains(OPENER)) OPENER.focus(); });
$('viewer').addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); show(IDX - 1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); show(IDX + 1); }
});
// ปัดซ้าย-ขวาบนภาพ
let sx = null;
$('vImg').addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
$('vImg').addEventListener('touchend', e => { if (sx === null) return; const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 40) show(IDX + (d < 0 ? 1 : -1)); sx = null; }, { passive: true });
// การ์ดในภาพเปิด: เปิดผลงานนั้นเลย
document.querySelectorAll('.fan-card[data-open]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openWork(a.dataset.open, a); }));

// ---------- เมนูมือถือ ----------
const menuBtn = $('menuBtn'), panel = $('menuPanel');
function setMenu(open) {
  panel.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
  menuBtn.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  if (open) $('nav').classList.add('is-scrolled'); else onScroll();
}
menuBtn.addEventListener('click', () => setMenu(panel.hidden));
panel.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { setMenu(false); menuBtn.focus(); } });
document.addEventListener('click', e => { if (!panel.hidden && !e.target.closest('#nav')) setMenu(false); });

// ---------- แถบบนโปร่งแสงเมื่อเลื่อน + เมนูที่กำลังดู ----------
function onScroll() { if (panel.hidden) $('nav').classList.toggle('is-scrolled', window.scrollY > 10); }
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
const links = [...document.querySelectorAll('.pill-nav a')];
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['services', 'work', 'packages', 'about', 'contact'].forEach(id => $(id) && io.observe($(id)));
  // ค่อยๆ ปรากฏเมื่อเลื่อนมาเห็น
  const rv = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); rv.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal:not(.is-in)').forEach(el => rv.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
