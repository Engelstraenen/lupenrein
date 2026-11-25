# Abnahme Unterseite Diamanten: je Panel Storyboard-Ausschnitt (LRQ3) + Laptop + Handy, dann abnahme-dia/abnahme.html
# Aufruf: python3 tools/abnahme_dia.py [nur-html]   Notizen je Panel: abnahme-dia/notizen.json {"1":"...", "status":[...]}
import asyncio, json, os, sys, html
from PIL import Image
SB = 'konzepte/LRQ3.png'; OUT = 'abnahme-dia/'
URL = 'https://engelstraenen.github.io/lupenrein/diamanten.html'
# (Abschnitt, Anteil in der Tresen-Einleitung)
P = [('tresen', .0), ('tresen', .45), ('tresen', .97), ('farbe', 0), ('groesse', 0), ('wahl', 0), ('fassung', 0), ('termin', 0), ('ende', 0)]
TIT = ['Diamanten: das Briefchen am Tresen', 'Nähe schafft Klarheit: die Pinzette', 'So sehen wir hin: die Lupe', 'Farbe im Vergleich: D bis K',
       'Wie groß wirkt er? Am Finger', 'Ihr Diamant. Ihre Wahl.', 'Im perfekten Rahmen', 'Persönlich beraten: Termin am Tresen', 'Überall ganz nah: Lupe zum Ziehen']

def shots():
    from playwright.async_api import async_playwright
    sb = Image.open(SB).convert('RGB'); W, H = sb.size; pw, ph = W / 3, H / 3
    for i in range(9):
        r, c = divmod(i, 3); sb.crop((int(c * pw), int(r * ph), int((c + 1) * pw), int((r + 1) * ph))).save(f'{OUT}{i+1}-storyboard.jpg', quality=88)
    async def main():
        async with async_playwright() as p:
            b = await p.chromium.launch(channel='chrome')
            for tag, w, h, mob in (("desktop", 1600, 900, False), ("handy", 390, 844, True)):
                pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2 if mob else 1, is_mobile=mob, has_touch=mob)
                await pg.goto("http://localhost:4436/diamanten.html"); await pg.wait_for_timeout(3000)
                for i, (sid, q) in enumerate(P):
                    if sid == 'tresen':
                        await pg.evaluate(f"(()=>{{const s=document.getElementById('tresen');scrollTo({{top:s.offsetTop+(s.offsetHeight-innerHeight)*{q},behavior:'instant'}})}})()")
                    else:
                        await pg.evaluate(f"(()=>{{const s=document.getElementById('{sid}');scrollTo({{top:s.offsetTop,behavior:'instant'}})}})()")
                    await pg.wait_for_timeout(1600)
                    await pg.screenshot(path=f'{OUT}{i+1}-{tag}.jpg', type='jpeg', quality=82)
            await b.close()
    asyncio.run(main())

def page():
    n = json.load(open(OUT + 'notizen.json')) if os.path.exists(OUT + 'notizen.json') else {}
    head = open(OUT + '_head.html').read(); tail = open(OUT + '_tail.html').read()
    st = ''.join(f'<span class="pill">{html.escape(s)}</span>' for s in n.get('status', ['Zwischenstand']))
    out = [head, '<div class="wrap">\n  <header class="top">\n    <h1>LUPENREIN · Unterseite Diamanten</h1>\n    <div class="status">' + st + '</div>\n',
           f'    <div class="actions">\n      <a class="btn" href="{URL}" target="_blank" rel="noopener">Unterseite öffnen</a>\n      <code class="url">{URL}</code>\n    </div>\n',
           '    <p class="note ok">Je Panel: links das Storyboard „Am Tresen, Schritt für Schritt“, Mitte die Seite am Laptop, rechts am Handy. Bild antippen = groß. In der Galerie öffnet „Mehr über Diamanten“ diese Seite.</p>\n  </header>\n']
    for i in range(9):
        k = str(i + 1); note = n.get(k, ''); cls = 'note' if note.startswith('Abweichung') else 'note ok'
        out.append(f'\n  <section class="ch"><div class="ch-h"><span class="n">{k}</span><h2>{TIT[i]}</h2></div>\n    <div class="grid">'
                   + ''.join(f'<figure><img src="{k}-{t}.jpg" alt="{c} Panel {k}"><figcaption>{c}</figcaption></figure>' for t, c in (('storyboard', 'Storyboard'), ('desktop', 'Seite · Laptop'), ('handy', 'Handy')))
                   + f'</div>\n    <p class="{cls}">{html.escape(note)}</p></section>\n')
    out.append('\n  ' + tail)
    open(OUT + 'abnahme.html', 'w').write(''.join(out))

if __name__ == '__main__':
    if 'nur-html' not in sys.argv: shots()
    page(); print('ok', OUT + 'abnahme.html')
