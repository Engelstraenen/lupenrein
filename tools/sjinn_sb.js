// LUPENREIN Weiße Galerie: Einzelbilder auf sjinn GPT Image 2 Unlimited. Max 3 eigene gleichzeitig, fertig = <img alt> beginnt mit ID.
window.LB = window.LB || {}; LB.jobs = [{"id": "LRS3", "ar": "16:9", "res": "2K", "p": "LRS3 Storyboard sheet for a premium jeweler HOMEPAGE, one single 16:9 image divided into a clean 3x3 grid of nine frames with thin black gutters, small white numbers 1 to 9 top left. Exactly the same look as the reference storyboard: deep black darkness, narrow slits of cool white light, deep cobalt navy velvet, platinum details, elegant German serif headlines, small LUPENREIN wordmark top left, slim top navigation and a pill button 'Privater Termin' top right. A luxury jewelry SHOP that sells and advises, never a workshop. VERSION 3 'Das Samttablett am Tresen'. All frames are the same fixed top-down view of a black smoked-glass counter in a narrow light slit, a consultant's black gloved hands bring a different navy velvet tray for every chapter. Frame 1: the existing opening ring in a slit of light, headline 'Lupenrein.'. Frame 2: the hands place a tray with three engagement rings, labels 'Solitär' 'Halo' 'Smaragd', headline 'Verlobungsringe.'. Frame 3: the tray slides closer, macro of four double claws, caption 'Unter der Lupe geprüft'. Frame 4: a tray with three pairs of wedding bands in yellow, white and rose gold, headline 'Trauringe.'. Frame 5: a large tray that fills the whole frame with jewelry in big sizes: a diamond collier, chains, earrings, a tennis bracelet, two luxury watches without brand, category pills 'Ringe Ketten Colliers Ohrschmuck Armbänder Uhren'. Frame 6: one piece lifted by the gloved hand fills the frame large and sharp. Frame 7: a precision scale with old gold jewelry, calculator panel 'Gramm' slider '333 585 750' rolling digits, headline 'Altgold-Ankauf.'. Frame 8: the hands present an appointment card 'Privater Termin' next to a ring box. Frame 9: smartphone vertical with the same counter view. Photorealistic, razor sharp, no CGI look, no glow, no lens flares, NO white backgrounds anywhere, correct German spelling."}]; LB.sent = LB.sent || {}; LB.log = []; LB.lim = 0; LB.run = (LB.run||0)+1; const RID = LB.run; LB.MAX = 2;
if (!LB.obs) { LB.obs = new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) { const t = (n.innerText||n.textContent||''); if (/maximum limit|concurrent tasks/i.test(t)) LB.lim++; } }); LB.obs.observe(document.body, {childList:true, subtree:true}); }
const sl = ms => new Promise(r => setTimeout(r, ms));
const bt = re => [...document.querySelectorAll('button')].find(b => re.test((b.innerText||'').trim()));
LB.done = () => new Set([...document.querySelectorAll('img')].map(i => (i.alt||'').split(' ')[0]));
LB.opt = async (re, txt) => { const b = bt(re); if (!b) return false; if ((b.innerText||'').trim() === txt.split(' ')[0]) return true; b.click(); await sl(900);
  const el = [...document.querySelectorAll('body *')].filter(e => (e.innerText||'').trim().startsWith(txt) && e.children.length < 8).map(e => e.closest('button,[role=radio],[role=option],label')||e).filter(Boolean).pop();
  if (el) el.click(); await sl(700); document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); await sl(700); return (bt(re)||{}).innerText?.trim() === txt.split(' ')[0]; };
LB.ok = () => { const u = bt(/^Unlimited/); const c = bt(/credits$/); return !!(u && /On/.test(u.innerText) && c && /^0 credits/.test(c.innerText.trim())); };
LB.setP = p => { const e = document.querySelector('[aria-label="Prompt input"]'); const s = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set; s.call(e,''); e.dispatchEvent(new Event('input',{bubbles:true})); s.call(e,p); e.dispatchEvent(new Event('input',{bubbles:true})); };
LB.tick = async () => {
  if (RID !== LB.run) return;
  const d = LB.done(); const running = Object.keys(LB.sent).filter(id => !d.has(id) && Date.now() - LB.sent[id] < 240*60000).length;
  const next = LB.jobs.find(j => !LB.sent[j.id] && !d.has(j.id));
  if (!next) { LB.log.push('alle gesendet'); if (running) setTimeout(LB.tick, 60000); return; }
  if (running >= LB.MAX) { setTimeout(LB.tick, 30000); return; }
  await LB.opt(/^(auto|1:1|16:9|9:16|3:2|2:3)$/, next.ar); await LB.opt(/^(1K|2K|4K)$/, next.res + ' resolution');
  if (bt(/^(auto|1:1|16:9|9:16|3:2|2:3)$/).innerText.trim() !== next.ar || bt(/^(1K|2K|4K)$/).innerText.trim() !== next.res) { LB.log.push('Einstellung falsch '+next.id); setTimeout(LB.tick, 20000); return; }
  if (!LB.ok()) { LB.log.push(new Date().toTimeString().slice(0,8)+' NICHT 0 credits -> stop'); return; }
  LB.setP(next.p); await sl(900); const l0 = LB.lim;
  bt(/^Generate/).click(); await sl(20000);
  if (LB.lim > l0) { LB.log.push('limit '+next.id); setTimeout(LB.tick, 45000); return; }
  LB.sent[next.id] = Date.now(); LB.log.push(new Date().toTimeString().slice(0,8)+' ok '+next.id); setTimeout(LB.tick, 2000);
};
LB.urls = () => Object.fromEntries([...document.querySelectorAll('img')].filter(i => /^LR/.test(i.alt||'')).map(i => [i.alt.split(' ')[0], i.src]));
LB.tick(); 'start '+RID;
