#!/usr/bin/env python3
"""720p-Drafts auf 2K (2560x1440) nachschärfen + scroll-tauglich kodieren (nur ffmpeg, kein Download nötig).

Start:  python3 tools/schaerfen.py roh/LRV1.mp4 [name]
Ergebnis:
  site/assets/vid/<name>.mp4      2560x1440 (Ziel per --ziel 1920 änderbar), H.264, alle 4 Bilder ein Schlüsselbild (sauberes Scroll-Spulen)
  site/assets/vid/<name>-m.mp4    1080 breit für Handy
  vorschau/<name>_vergleich.jpg   links Original (hochgerechnet), rechts geschärft, 3 Zeitpunkte
Kette: leichtes Entrauschen (Kompressionsmatsch weg) -> Lanczos auf 1920 -> CAS (kantenadaptiv)
       -> feines Unsharp. Misst die Kantenschärfe vorher/nachher.
Ehrlich: Das macht Kanten schärfer, erfindet aber keine echten Details. Echte 1080p nur per Neu-Render.
"""
import os, subprocess, sys, json
import numpy as np
from PIL import Image

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
ZIEL = int(next((a.split("=")[1] for a in sys.argv if a.startswith("--ziel=")), 2560))
src = args[0]
name = args[1] if len(args) > 1 else os.path.splitext(os.path.basename(src))[0]
out = os.path.join(R, "site", "assets", "vid"); os.makedirs(out, exist_ok=True)
prev = os.path.join(R, "vorschau"); os.makedirs(prev, exist_ok=True)

ZH = ZIEL * 9 // 16
# Zwei Stufen: erst 1,5x mit Schärfen, dann auf Ziel – weniger Treppen und Halos als ein großer Sprung
CHAIN = (f"fps=30,hqdn3d=1.2:1.2:4:4,scale={ZIEL*3//4}:{ZH*3//4}:flags=lanczos,cas=strength=0.45,"
         f"scale={ZIEL}:{ZH}:flags=lanczos,cas=strength=0.5,unsharp=5:5:0.4:3:3:0.0")
ENC = ["-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-g", "4", "-keyint_min", "4",
       "-sc_threshold", "0", "-movflags", "+faststart", "-an"]


def run(cmd):
    subprocess.run(cmd, check=True, capture_output=True)


def frames(path, ts, w=None):
    w = w or ZIEL
    ims = []
    for t in ts:
        p = f"/tmp/_lr_{os.getpid()}.png"
        run(["ffmpeg", "-y", "-ss", str(t), "-i", path, "-frames:v", "1", "-vf", f"scale={w}:-2:flags=lanczos", p])
        ims.append(Image.open(p).convert("RGB")); os.remove(p)
    return ims


def edge(im):
    a = np.asarray(im.convert("L")).astype(np.float32)
    lap = a[1:-1, 1:-1] * 4 - a[:-2, 1:-1] - a[2:, 1:-1] - a[1:-1, :-2] - a[1:-1, 2:]
    return float(lap.var())


dur = float(json.loads(subprocess.run(["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", src],
                                      capture_output=True, text=True).stdout)["format"]["duration"])
d = os.path.join(out, name + ".mp4"); m = os.path.join(out, name + "-m.mp4")
run(["ffmpeg", "-y", "-i", src, "-vf", CHAIN] + ENC + [d])
run(["ffmpeg", "-y", "-i", d, "-vf", "scale=1440:-2:flags=lanczos"] + ENC + [m])

ts = [dur * .1, dur * .5, dur * .9]
a, b = frames(src, ts), frames(d, ts)
ea, eb = np.mean([edge(x) for x in a]), np.mean([edge(x) for x in b])
W = 960
sheet = Image.new("RGB", (W * 2, 540 * 3))
SC = ZIEL // 96
for i, (x, y) in enumerate(zip(a, b)):
    # Ausschnitt aus der Bildmitte in 1:1-Pixeln, damit man die Schärfe wirklich sieht
    g = np.asarray(y.convert("L").resize((96, 54))).astype(np.float32)
    e = np.abs(np.diff(g, axis=0))[:, :-1] + np.abs(np.diff(g, axis=1))[:-1, :]
    cy, cx = np.unravel_index(e.argmax(), e.shape)
    x0 = int(min(max(cx * SC - 480, 0), ZIEL - 960)); y0 = int(min(max(cy * SC - 270, 0), ZH - 540))
    box = (x0, y0, x0 + 960, y0 + 540)  # Ausschnitt um die schärfste Stelle
    sheet.paste(x.crop(box), (0, i * 540)); sheet.paste(y.crop(box), (W, i * 540))
sheet.save(os.path.join(prev, name + "_vergleich.jpg"), quality=85)
print(json.dumps({"name": name, "dauer": round(dur, 2), "kante_original_hochgerechnet": round(ea, 1),
                  "kante_geschaerft": round(eb, 1), "faktor": round(eb / max(ea, 1e-6), 2),
                  "mb_desktop": round(os.path.getsize(d) / 1e6, 1), "mb_handy": round(os.path.getsize(m) / 1e6, 1)}))
