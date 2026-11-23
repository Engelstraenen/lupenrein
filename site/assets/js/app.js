/* LUPENREIN · Juwelier-Demo */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ramp = (p, a, b) => clamp((p - a) / (b - a));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const IMG = window.IMG || {};
const mobile = () => innerWidth < 900;

/* Firmenname per ?firma= */
const firma = new URLSearchParams(location.search).get('firma');
if (firma) { const n = firma.slice(0, 40); $$('[data-brand]').forEach(e => e.textContent = n.toUpperCase()); document.title = n + ' · Juwelier'; }

/* Bilder: nur zeigen, was es gibt (nie Platzhalter) */
$$('[data-img]').forEach(el => {
  const id = el.dataset.img, m = IMG[id];
  if (!m) { el.classList.add('miss'); return; }
  const src = 'assets/img/' + id + (mobile() && m.m ? '-m' : '') + '.webp?v=' + (m.v || 1);
  const im = new Image();
  im.onload = () => { el.style.backgroundImage = 'url("' + src + '")'; el.classList.add('ld'); };
  im.onerror = () => el.classList.add('miss');
  im.src = src;
});
window.LR_IMG_OK = id => !!IMG[id];

/* Navigation */
const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
const onNav = () => nav.classList.toggle('solid', scrollY > 40);
burger.addEventListener('click', () => { const o = !menu.classList.contains('open'); menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Menü schließen' : 'Menü öffnen'); });
$$('a', menu).forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

/* Reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.reveal').forEach(e => io.observe(e));
const kio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $$('.kw', e.target).forEach((w, i) => setTimeout(() => w.classList.add('in'), i * 260)); kio.unobserve(e.target); } }), { threshold: .25 });
const kin = $('#kin'); if (kin) kio.observe(kin);

/* Scroll-Bühnen */
const stages = $$('.stage').map(s => { s.style.setProperty('--len', s.dataset.len || 3); return { s, a: $('.l-a', s), b: $('.l-b', s), ta: $('.t-a', s), tb: $('.t-b', s), rain: $('.rain', s), hint: $('.scroll-hint', s), steps: $$('.ank-steps li', s) }; });
const setT = (el, o, y = 0) => { if (!el) return; el.style.opacity = o; el.style.setProperty('--dy', y + 'px'); };
function frame() {
  const vh = innerHeight;
  for (const st of stages) {
    const r = st.s.getBoundingClientRect(); if (r.bottom < -vh || r.top > vh * 2) continue;
    const p = clamp(-r.top / (r.height - vh));
    if (st.s.id === 'hero') {
      const z = ease(ramp(p, 0, .62)), f = ramp(p, .42, .66);
      if (st.a) { st.a.style.transformOrigin = '72% 46%'; st.a.style.transform = 'scale(' + (1 + z * 3.2) + ')'; st.a.style.opacity = 1 - f; }
      if (st.b) { st.b.style.setProperty('--ob', f); st.b.style.transform = 'scale(' + (1.5 - .5 * ease(ramp(p, .42, 1))) + ') rotate(' + (p * 12) + 'deg)'; }
      setT(st.ta, 1 - ramp(p, .02, .22), -60 * ramp(p, 0, .22));
      setT(st.tb, ramp(p, .62, .78) * (1 - ramp(p, .95, 1)), 40 * (1 - ramp(p, .62, .78)));
      if (st.hint) st.hint.style.opacity = 1 - ramp(p, 0, .06);
    } else if (st.s.id === 'schaufenster') {
      const z = ease(ramp(p, .08, .6)), f = ramp(p, .4, .62);
      if (st.a) { st.a.style.transformOrigin = '50% 52%'; st.a.style.transform = 'scale(' + (1 + z * 1.9) + ')'; st.a.style.opacity = 1 - f; }
      if (st.b) { st.b.style.setProperty('--ob', f); st.b.style.transform = 'scale(' + (1.3 - .3 * ease(ramp(p, .4, 1))) + ')'; }
      if (st.rain) st.rain.style.setProperty('--rain', 1 - ramp(p, .3, .55));
      setT(st.ta, 1 - ramp(p, .12, .3), -40 * ramp(p, .12, .3));
      setT(st.tb, ramp(p, .66, .8), 40 * (1 - ramp(p, .66, .8)));
    } else if (st.s.id === 'ankauf') {
      if (st.a) st.a.style.transform = 'scale(' + (1.14 - .12 * p) + ') translateX(' + (-2 * p) + '%)';
      st.steps.forEach(li => li.classList.toggle('in', p >= +li.dataset.at));
    }
  }
}
let ticking = false;
addEventListener('scroll', () => { onNav(); if (!ticking) { ticking = true; requestAnimationFrame(() => { frame(); ticking = false; }); } }, { passive: true });
addEventListener('resize', frame); onNav(); frame();

/* 4C Diamant-Erklärer */
const CUT = [['Gut', 'Gibt Licht zurück, aber nicht alles. Der Stein wirkt ruhiger.'], ['Sehr gut', 'Viel Brillanz, kleine Verluste an den Rändern.'], ['Ausgezeichnet', 'Fast alles Licht kommt zurück. Lebendiges Funkeln.'], ['Exzellent', 'Perfekte Proportionen: maximales Feuer und Brillanz.']];
const COL = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
const colInfo = i => i <= 1 ? 'Hochfeines Weiß+: absolut farblos, sehr selten.' : i <= 2 ? 'Hochfeines Weiß: farblos für jedes Auge.' : i <= 4 ? 'Feines Weiß: nur im Vergleich minimal getönt. Beliebte Wahl.' : i <= 6 ? 'Weiß: ein Hauch Wärme, schön in Gelbgold.' : i <= 8 ? 'Leicht getönt: sichtbar warmer Ton.' : 'Getönt: deutlicher Gelbstich.';
const CLA = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'P1', 'P2'];
const claInfo = i => i === 0 ? 'Lupenrein: Unter 10-facher Lupe keine Einschlüsse im Inneren. Daher unser Name.' : i <= 2 ? 'Sehr, sehr kleine Einschlüsse: selbst mit 10-facher Lupe kaum zu finden.' : i <= 4 ? 'Sehr kleine Einschlüsse: mit der Lupe sichtbar, mit bloßem Auge nicht.' : i <= 6 ? 'Kleine Einschlüsse: mit der Lupe leicht zu erkennen.' : 'Piqué: Einschlüsse mit bloßem Auge erkennbar.';
const CT = [[.25, 4.1], [.5, 5.2], [.75, 5.8], [1, 6.5], [1.25, 6.9], [1.5, 7.4], [2, 8.2], [3, 9.3]];
const caInfo = i => i <= 1 ? 'Zart und alltagstauglich, schön als Beisteckring.' : i <= 3 ? 'Der Klassiker für Verlobungsringe.' : i <= 5 ? 'Präsent, ohne laut zu sein.' : 'Ein Stein, der jeden Blick fängt.';
const fmtCt = v => v.toFixed(2).replace('.', ',') + ' ct';
const INC = [[52, 40, 1], [44, 58, .8], [60, 55, 1.2], [36, 44, .7], [57, 33, .9], [48, 66, 1], [66, 46, .8], [40, 34, 1.1], [54, 50, .6], [30, 54, .9], [62, 64, 1], [46, 28, .7], [70, 38, .8], [34, 64, 1.2], [50, 74, .9], [26, 42, .8], [58, 72, 1], [42, 50, .7], [68, 58, 1.1], [38, 72, .9]];
const sCut = $('#sCut'), sCol = $('#sColor'), sCla = $('#sClar'), sCar = $('#sCarat');
const gem = $('#gem'), gImg = $('.gem-img', gem), tint = $('#gemTint'), inc = $('#gemInc'), spark = $('#gemSpark');
$('#clarScale').innerHTML = CLA.map(c => '<span>' + c + '</span>').join('');
const fillR = r => r.style.setProperty('--v', (r.value - r.min) / (r.max - r.min) * 100 + '%');
function c4() {
  const cu = +sCut.value, co = +sCol.value, cl = +sCla.value, ca = +sCar.value;
  $('#oCut').textContent = CUT[cu][0]; $('#iCut').textContent = CUT[cu][1];
  gImg.style.filter = 'brightness(' + (.72 + cu * .1) + ') contrast(' + (.85 + cu * .08) + ')';
  spark.style.setProperty('--sp', .25 + cu * .25);
  $('#oColor').textContent = COL[co]; $('#iColor').textContent = colInfo(co);
  tint.style.opacity = co < 3 ? 0 : (co - 2) * .065;
  $('#oClar').textContent = CLA[cl]; $('#iClar').textContent = claInfo(cl);
  $$('#clarScale span').forEach((s, i) => s.classList.toggle('on', i === cl));
  const n = [0, 1, 2, 3, 5, 7, 10, 14, 20][cl], sz = [0, .5, .7, .9, 1.1, 1.4, 1.8, 2.5, 3.2][cl], op = [0, .3, .4, .55, .65, .8, .9, 1, 1][cl];
  let svg = INC.slice(0, n).map(([x, y, s]) => '<circle cx="' + x + '" cy="' + y + '" r="' + (s * sz).toFixed(2) + '" opacity="' + op + '"/>').join('');
  if (cl >= 5) svg += '<path d="M38 48 q6 -5 12 1 q5 4 10 -2" fill="none" stroke-width="' + (cl - 4) * .5 + '" opacity="' + op + '"/>';
  inc.innerHTML = svg;
  $('#oCarat').textContent = fmtCt(CT[ca][0]); $('#iCarat').textContent = caInfo(ca);
  $('#c4mm').textContent = 'Ø ' + CT[ca][1].toFixed(1).replace('.', ',') + ' mm';
  gem.style.transform = 'scale(' + (.5 + .5 * CT[ca][1] / 9.3) + ')';
  [sCut, sCol, sCla, sCar].forEach(fillR);
  syncLoupe();
}
[sCut, sCol, sCla, sCar].forEach(r => r.addEventListener('input', c4));
/* Lupe: vergrößerte Kopie des Steins */
const stageEl = $('#c4stage'), loupe = $('#loupe'); let lclone = null;
function syncLoupe() { if (lclone) lclone.remove(); lclone = gem.cloneNode(true); lclone.removeAttribute('id'); $$('[id]', lclone).forEach(e => e.removeAttribute('id')); lclone.style.position = 'absolute'; lclone.style.transition = 'none'; loupe.appendChild(lclone); loupe.style.overflow = 'hidden'; }
function moveLoupe(x, y) {
  const r = stageEl.getBoundingClientRect(), L = loupe.offsetWidth, Z = 3;
  const lx = x - r.left, ly = y - r.top;
  loupe.style.transform = 'translate(' + (lx - L / 2) + 'px,' + (ly - L / 2) + 'px)';
  if (lclone) { const g = gem.getBoundingClientRect(); const w = g.width * Z; lclone.style.width = w + 'px'; lclone.style.height = w + 'px'; lclone.style.transform = 'none'; lclone.style.left = (L / 2 - (x - g.left) * Z) + 'px'; lclone.style.top = (L / 2 - (y - g.top) * Z) + 'px'; }
}
let lt;
stageEl.addEventListener('pointerenter', syncLoupe);
stageEl.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { stageEl.classList.add('lupe'); moveLoupe(e.clientX, e.clientY); } });
stageEl.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') stageEl.classList.remove('lupe'); });
stageEl.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') { syncLoupe(); stageEl.classList.add('lupe'); moveLoupe(e.clientX, e.clientY); clearTimeout(lt); lt = setTimeout(() => stageEl.classList.remove('lupe'), 2600); } });
c4();

/* Kollektion: Reservieren */
const modal = $('#resModal');
function days(box, n = 10) {
  const d = new Date(), out = []; const W = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  for (let i = 1; out.length < n; i++) { const t = new Date(d); t.setDate(d.getDate() + i); if (t.getDay() === 0) continue; out.push('<button type="button"' + (out.length === 0 ? ' class="on"' : '') + '><small>' + W[t.getDay()] + '</small><b>' + t.getDate() + '.</b></button>'); }
  box.innerHTML = out.join(''); pick(box, 'button');
}
function pick(box, sel) { box.addEventListener('click', e => { const b = e.target.closest(sel); if (!b || !box.contains(b)) return; $$(sel, box).forEach(x => { x.classList.toggle('on', x === b); if (x.hasAttribute('role')) x.setAttribute('aria-checked', x === b); }); }); }
days($('#resDays'), 8);
$$('[data-reserve]').forEach(b => b.addEventListener('click', () => { $('#resTitle').textContent = b.dataset.reserve; modal.showModal ? modal.showModal() : modal.setAttribute('open', ''); }));
modal.addEventListener('close', () => { if (modal.returnValue === 'ok') toast('Reserviert (Demo). Wir legen es für Sie bereit.'); });
function toast(t) { let el = $('.toast'); if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); Object.assign(el.style, { position: 'fixed', left: '50%', bottom: '54px', transform: 'translateX(-50%)', background: '#d9b878', color: '#1a1408', padding: '12px 20px', borderRadius: '999px', fontWeight: 600, zIndex: 70, fontSize: '15px', maxWidth: 'calc(100% - 32px)', textAlign: 'center' }); document.body.appendChild(el); } el.textContent = t; el.style.opacity = 1; clearTimeout(el._t); el._t = setTimeout(() => el.style.opacity = 0, 3200); }

/* Chips allgemein */
$$('.chips').forEach(c => pick(c, '.chip'));

/* Ring ansehen: Ziehen neigt den Ring, Licht wandert */
const rv = $('#r360'), rimg = $('.r360-img', rv), rdot = $('.r360-ring span', rv); let drag = null, ang = 0;
const setAng = a => { ang = Math.max(-35, Math.min(35, a)); rimg.style.transform = 'perspective(900px) rotateY(' + ang + 'deg)'; rimg.style.filter = 'brightness(' + (1 + Math.abs(ang) / 120) + ')'; rdot.style.left = (50 + ang * 1.3) + '%'; };
rv.addEventListener('pointerdown', e => { drag = { x: e.clientX, a: ang }; rv.setPointerCapture(e.pointerId); });
rv.addEventListener('pointermove', e => { if (drag) setAng(drag.a + (e.clientX - drag.x) * .35); });
rv.addEventListener('pointerup', () => { drag = null; const back = () => { if (drag) return; setAng(ang * .88); if (Math.abs(ang) > .3) requestAnimationFrame(back); else setAng(0); }; setTimeout(back, 900); });
$$('#ring360 [data-tone]').forEach(b => b.addEventListener('click', () => { const t = { white: 'Weißgold', yellow: 'Gelbgold', rose: 'Roségold' }[b.dataset.tone]; $('#ring360 .kicker').textContent = 'Solitär · 1,00 ct · ' + t; }));

/* AR-Anprobe */
const arS = $('#arStart'), arX = $('#arStop'), vid = $('#arVideo'), cv = $('#arCanvas'), scr = $('#arScreen'), msg = $('#arMsg');
let stream = null, lm = null, raf = 0, tone = 'yellow';
const ringImg = new Image(); let ringOk = false; if (IMG.ring_ar) { ringImg.onload = () => ringOk = true; ringImg.src = 'assets/img/ring-ar.png?v=' + (IMG.ring_ar.v || 1); }
$$('[data-ar]').forEach(b => b.addEventListener('click', () => tone = b.dataset.ar));
async function arStart() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { msg.textContent = 'Ihr Browser erlaubt keine Kamera. Probieren Sie es auf dem Handy.'; return; }
  arS.disabled = true; msg.textContent = 'Kamera wird gestartet …';
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    vid.srcObject = stream; await vid.play(); scr.classList.add('ar-on'); arX.hidden = false;
    msg.textContent = 'Handerkennung wird geladen …';
    if (!lm) {
      const v = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs');
      const fs = await v.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
      lm = await v.HandLandmarker.createFromOptions(fs, { baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task', delegate: 'GPU' }, runningMode: 'VIDEO', numHands: 1 });
    }
    msg.textContent = 'Halten Sie Ihre Hand mit dem Handrücken zur Kamera.';
    loop();
  } catch (e) { msg.textContent = 'Kamera nicht verfügbar oder nicht erlaubt.'; arStop(); }
  arS.disabled = false;
}
function arStop() { cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; scr.classList.remove('ar-on'); arX.hidden = true; const c = cv.getContext('2d'); c.clearRect(0, 0, cv.width, cv.height); }
function drawRing(c, x, y, w, a) {
  c.save(); c.translate(x, y); c.rotate(a);
  c.filter = tone === 'white' ? 'saturate(0) brightness(1.18)' : tone === 'rose' ? 'hue-rotate(-18deg) saturate(1.35)' : 'none';
  if (ringOk) { const h = w * ringImg.height / ringImg.width; c.drawImage(ringImg, 0, 0, ringImg.width, ringImg.height * .56, -w / 2, -h * .62, w, h * .56); }
  else {
    const col = tone === 'white' ? '#e8e8ea' : tone === 'rose' ? '#e7b29a' : '#e2bd6c';
    c.fillStyle = col; c.fillRect(-w / 2, -w * .09, w, w * .18);
    c.beginPath(); c.arc(0, -w * .14, w * .2, 0, Math.PI * 2); c.fillStyle = '#f7fbff'; c.fill(); c.strokeStyle = col; c.lineWidth = w * .05; c.stroke();
  }
  c.restore();
}
let lastT = -1;
function loop() {
  raf = requestAnimationFrame(loop);
  if (!lm || vid.readyState < 2) return;
  if (cv.width !== vid.videoWidth) { cv.width = vid.videoWidth; cv.height = vid.videoHeight; }
  const t = performance.now(); if (t === lastT) return; lastT = t;
  const r = lm.detectForVideo(vid, t), c = cv.getContext('2d'); c.clearRect(0, 0, cv.width, cv.height);
  const h = r.landmarks && r.landmarks[0]; if (!h) return;
  const P = i => ({ x: h[i].x * cv.width, y: h[i].y * cv.height });
  const a = P(13), b = P(14), k9 = P(9), k17 = P(17);
  const x = a.x + (b.x - a.x) * .38, y = a.y + (b.y - a.y) * .38;
  const w = Math.hypot(k9.x - k17.x, k9.y - k17.y) * .62;
  drawRing(c, x, y, w, Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2);
}
arS.addEventListener('click', arStart); arX.addEventListener('click', arStop);

/* Welcher Ring passt */
const PV = { solitaer: ['Solitär · Brillant · Weißgold', 'Zeitlos: ein Brillant, sechs Krappen, viel Licht. Der Klassiker, der zu allem passt.'], halo: ['Halo · Brillant mit Kranz', 'Glamourös: ein Kranz kleiner Brillanten lässt den Mittelstein größer wirken.'], oval: ['Oval · Roségold', 'Modern: die ovale Form streckt den Finger optisch und wirkt weich.'], emerald: ['Smaragdschliff · Gelbgold', 'Vintage: klare Treppenfacetten, ruhiger Glanz, viel Charakter.'] };
const sel = { stil: 'klassisch', fassung: 'krappe', form: 'brillant' };
const pvs = $$('.pv'); const has = v => pvs.some(p => p.dataset.v === v && !p.classList.contains('miss'));
function passt() {
  let v = sel.form === 'oval' ? 'oval' : sel.form === 'smaragd' ? 'emerald' : sel.fassung === 'halo' || sel.stil === 'glamour' ? 'halo' : 'solitaer';
  if (sel.stil === 'vintage' && sel.form === 'brillant') v = 'emerald';
  if (sel.stil === 'modern' && sel.form === 'brillant') v = 'oval';
  const show = has(v) ? v : 'solitaer';
  pvs.forEach(p => p.classList.toggle('on', p.dataset.v === show));
  $('#pvCap').textContent = PV[v][0]; $('#passtTxt').textContent = PV[v][1];
}
$$('.passt-steps .chips').forEach(c => c.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; sel[c.dataset.q] = b.dataset.val; passt(); }));
passt();

/* Trauring-Konfigurator */
const tv = $$('.tv'); let gold = 'gelb', surf = 'poliert', stone = '1';
const GN = { gelb: 'Gelbgold', weiss: 'Weißgold', rose: 'Roségold' }, SN = { 0: 'ohne Stein', 1: 'mit einem Brillanten', m: 'als Memoire' };
const tW = $('#tWidth'), prof = $('#profile'), eng = $('#tEngr');
function trau() {
  const w = +tW.value; $('#wOut').textContent = w.toFixed(1).replace('.', ',') + ' mm'; fillR(tW);
  const half = w * 10, cx = 100;
  prof.innerHTML = '<defs><linearGradient id="pg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="' + (gold === 'weiss' ? '#f2f2f4' : gold === 'rose' ? '#f0c3ad' : '#f3dfb2') + '"/><stop offset="1" stop-color="' + (gold === 'weiss' ? '#9a9aa0' : gold === 'rose' ? '#b47a63' : '#b8914f') + '"/></linearGradient></defs><path d="M' + (cx - half) + ' 46 Q' + (cx - half) + ' 14 ' + cx + ' 12 Q' + (cx + half) + ' 14 ' + (cx + half) + ' 46 Q' + cx + ' 52 ' + (cx - half) + ' 46Z"/>';
  const show = tv.some(t => t.dataset.gold === gold && !t.classList.contains('miss')) ? gold : 'gelb';
  tv.forEach(t => t.classList.toggle('on', t.dataset.gold === show));
  $('#engrOut').textContent = eng.value.trim() || ' ';
  $('#trauSum').textContent = 'Ihr Paar: ' + GN[gold] + ', ' + w.toFixed(1).replace('.', ',') + ' mm, ' + surf + ', Damenring ' + SN[stone] + (eng.value.trim() ? ', Gravur „' + eng.value.trim() + '“' : '') + '.';
}
$$('#trauForm [data-gold]').forEach(b => b.addEventListener('click', () => { gold = b.dataset.gold; trau(); }));
$$('#trauForm [data-surf]').forEach(b => b.addEventListener('click', () => { surf = b.textContent.toLowerCase(); trau(); }));
$$('#trauForm [data-stone]').forEach(b => b.addEventListener('click', () => { stone = b.dataset.stone; trau(); }));
tW.addEventListener('input', trau); eng.addEventListener('input', trau); trau();

/* Feingehalt */
const FT = { 333: '333 = 33,3 % Feingold. Häufig bei älterem Alltagsschmuck.', 585: '585 = 58,5 % Feingold. Der Klassiker bei Ringen und Ketten.', 750: '750 = 75 % Feingold. Satte Farbe, typisch für hochwertigen Schmuck.', 999: '999 = 99,9 % Feingold. Fast reines Gold, meist Barren und Münzen.' };
const setF = f => { $('#feinFill').style.width = f / 10 + '%'; $('#feinTxt').textContent = FT[f]; $$('.stamp').forEach(s => s.classList.toggle('on', s.dataset.f == f)); };
$$('.stamp').forEach(s => s.addEventListener('click', () => setF(s.dataset.f))); setF(585);

/* Uhrenservice-Status */
$('#tGo').addEventListener('click', () => {
  const v = $('#tNr').value.trim(); const tl = $('#timeline');
  if (!v) { $('#tMsg').textContent = 'Bitte eine Auftragsnummer eingeben (Demo: beliebig).'; return; }
  const s = [...v].reduce((a, c) => a + c.charCodeAt(0), 0) % 3 + 1;
  $$('li', tl).forEach(li => li.className = '');
  $$('li', tl).forEach((li, i) => setTimeout(() => { li.className = i + 1 < s ? 'done' : i + 1 === s ? 'now' : ''; }, i * 450));
  $('#tMsg').textContent = 'Auftrag ' + v.toUpperCase() + ': ' + ['Angenommen', 'Beim Uhrmacher', 'Abholbereit'][s - 1] + '. (Demo-Daten)';
});

/* Termin */
days($('#days'));
const SL = ['10:00', '11:30', '14:00', '16:00', '17:30', '19:30', '20:30'];
$('#slots').innerHTML = SL.map((t, i) => '<button type="button" class="' + (i > 4 ? 'eve' : '') + (i === 5 ? ' on' : '') + '">' + t + (i > 4 ? ' · nach Ladenschluss' : '') + '</button>').join('');
pick($('#slots'), 'button');
$('#bookGo').addEventListener('click', () => { $('#bookMsg').hidden = false; toast('Terminanfrage gespeichert (Demo).'); });
$$('[data-topic]').forEach(a => a.addEventListener('click', () => { const t = a.dataset.topic; $$('#book .chip').forEach(c => { const m = c.textContent === t || (t === 'Verlobungsring' && c.textContent === 'Ringberatung'); if (m) c.click(); }); }));

/* Bewerbung in 60 Sekunden */
let tStart = 0, tInt = 0;
const ap = $('#apply'), run = $('.t-run', ap);
function startTimer() { if (tStart) return; tStart = Date.now(); tInt = setInterval(() => { const s = Math.max(0, 60 - Math.floor((Date.now() - tStart) / 1000)); $('#tSec').textContent = s; run.style.strokeDashoffset = 106.8 * (1 - s / 60); if (!s) clearInterval(tInt); }, 250); }
$$('.apply-step .chip', ap).forEach(c => c.addEventListener('click', () => { startTimer(); const st = c.closest('.apply-step'), n = +st.dataset.st; setTimeout(() => { st.classList.remove('on'); const nx = $('.apply-step[data-st="' + (n + 1) + '"]', ap); if (nx) nx.classList.add('on'); }, 350); }));
$('#applyGo').addEventListener('click', () => { clearInterval(tInt); const s = tStart ? Math.round((Date.now() - tStart) / 1000) : 0; $$('.apply-step', ap).forEach(x => x.classList.remove('on')); const m = $('#applyMsg'); m.hidden = false; m.textContent = 'Geschafft in ' + s + ' Sekunden! Wir melden uns innerhalb von 48 Stunden. (Demo: Es wurde nichts gesendet.)'; });

/* Bewertungen (Beispiele) */
const revs = $$('.rvc'); let ri = 0;
setInterval(() => { revs[ri].classList.remove('on'); ri = (ri + 1) % revs.length; setTimeout(() => revs[ri].classList.add('on'), 600); }, 6000);
})();
