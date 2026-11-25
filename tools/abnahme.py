# Abnahme Einstieg „Lichtschlitze“: je Panel Storyboard-Ausschnitt + Seite Laptop + Seite Handy (Vorlage KEHRWERK)
import asyncio
from playwright.async_api import async_playwright
from PIL import Image
SB = 'vorschau/S2-samt-lichtschlitze.jpg'; OUT = 'abnahme/'
P = [.02, .125, .275, .385, .545, .665, .79, .9, .02]   # Scroll-Anteil im Abschnitt #nacht je Panel 1–9
sb = Image.open(SB).convert('RGB'); W, H = sb.size; pw, ph = W / 3, H / 3
for i in range(9):
    r, c = divmod(i, 3); sb.crop((int(c * pw), int(r * ph), int((c + 1) * pw), int((r + 1) * ph))).save(f'{OUT}{i+1}-storyboard.jpg', quality=88)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(channel='chrome')
        for tag, w, h, mob in (("desktop", 1600, 900, False), ("handy", 390, 844, True)):
            pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2 if mob else 1, is_mobile=mob, has_touch=mob)
            await pg.goto("http://localhost:4436/"); await pg.wait_for_timeout(3000)
            for i, q in enumerate(P):
                await pg.evaluate(f"(()=>{{const s=document.getElementById('nacht');scrollTo({{top:s.offsetTop+(s.offsetHeight-innerHeight)*{q},behavior:'instant'}})}})()"); await pg.wait_for_timeout(1500)
                await pg.screenshot(path=f'{OUT}{i+1}-{tag}.jpg', type='jpeg', quality=82)
        await b.close()
asyncio.run(main())
