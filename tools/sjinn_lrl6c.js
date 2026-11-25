// LUPENREIN Weiße Galerie: Einzelbilder auf sjinn GPT Image 2 Unlimited. Max 3 eigene gleichzeitig, fertig = <img alt> beginnt mit ID.
window.LB = window.LB || {}; LB.jobs = [{"id": "LRL6KIRB", "ar": "16:9", "res": "2K", "p": "LRL6KIRB Edit the reference image: keep EVERYTHING exactly the same - the same CUSHION CUT diamond (square with rounded corners, brilliant facets), the same four double claws, the same ring shape, camera angle, position, black velvet, lighting and background. Change ONLY the metal color of the band and the claws to polished 18k ROSE GOLD (soft pink copper tone). The diamond stays colorless white. Real photograph, razor sharp. NO text."}, {"id": "LRL6KIPB", "ar": "16:9", "res": "2K", "p": "LRL6KIPB Edit the reference image: keep EVERYTHING exactly the same - the same CUSHION CUT diamond (square with rounded corners, brilliant facets), the same four double claws, the same ring shape, camera angle, position, black velvet, lighting and background. Change ONLY the metal color of the band and the claws to polished PLATINUM (slightly greyer and cooler than white gold). Real photograph, razor sharp. NO text."}]; LB.sent = {}; LB.log = []; LB.lim = 0; LB.run = (LB.run||0)+1; const RID = LB.run; LB.MAX = 1;
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
  const d = LB.done(); const running = Object.keys(LB.sent).filter(id => !d.has(id) && Date.now() - LB.sent[id] < 20*60000).length;
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
LB.urls = () => Object.fromEntries([...document.querySelectorAll('img')].filter(i => /^LRL/.test(i.alt||'')).map(i => [i.alt.split(' ')[0], i.src]));
LB.tick(); 'start '+RID;
