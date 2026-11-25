# Abnahme Unterseite Verlobungsringe: je Panel Storyboard-Ausschnitt (U1) + Laptop + Handy
import asyncio
from playwright.async_api import async_playwright
from PIL import Image
SB = 'vorschau/U1-unterseite.jpg'; OUT = 'abnahme-lupe/'
# (Abschnitt, Anteil): 'p' = Anteil in der Lupen-Einleitung
P = [('lupe', .0), ('lupe', .75), ('groesse', 0), ('messen', 0), ('ringgroesse', 0), ('gestalten', 0), ('licht', 0), ('fragen', 0), ('ende', 0)]
sb = Image.open(SB).convert('RGB'); W, H = sb.size; pw, ph = W / 3, H / 3
for i in range(9):
    r, c = divmod(i, 3); sb.crop((int(c * pw), int(r * ph), int((c + 1) * pw), int((r + 1) * ph))).save(f'{OUT}{i+1}-storyboard.jpg', quality=88)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(channel='chrome')
        for tag, w, h, mob in (("desktop", 1600, 900, False), ("handy", 390, 844, True)):
            pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2 if mob else 1, is_mobile=mob, has_touch=mob)
            await pg.goto("http://localhost:4436/verlobungsringe.html"); await pg.wait_for_timeout(2500)
            for i, (sid, q) in enumerate(P):
                if i == 8 and mob: sid = 'groesse'
                if sid == 'lupe':
                    await pg.evaluate(f"(()=>{{const s=document.getElementById('lupe');scrollTo({{top:s.offsetTop+(s.offsetHeight-innerHeight)*{q},behavior:'instant'}})}})()")
                else:
                    await pg.evaluate(f"(()=>{{const s=document.getElementById('{sid}');scrollTo({{top:s.offsetTop,behavior:'instant'}})}})()")
                await pg.wait_for_timeout(1500)
                await pg.screenshot(path=f'{OUT}{i+1}-{tag}.jpg', type='jpeg', quality=82)
        await b.close()
asyncio.run(main())
