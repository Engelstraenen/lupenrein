#!/usr/bin/env python3
"""LUPENREIN: Web-Bilder aus den sjinn-Originalen bauen (mit Cache).

Quelle: assets-roh/4k/LRAxx.(png|jpg)
Ziel:   site/assets/img/LRAxx.webp (Desktop) + LRAxx-m.webp (Handy)
        LRA13 (Magenta-Hintergrund) -> site/assets/img/ring-ar.png (freigestellt)
Schreibt site/assets/js/img.js. Unveränderte Quellen werden nicht neu geöffnet.
Start: python3 tools/assets.py
"""
import json, os, glob, hashlib
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "assets-roh", "4k")
OUT = os.path.join(ROOT, "site", "assets", "img")
CACHE = os.path.join(ROOT, "assets-roh", "cache.json")
os.makedirs(OUT, exist_ok=True)
cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}


def webp(im, name, w, q=82):
    im = im.convert("RGB")
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name), "WEBP", quality=q, method=6)
    return im.size


def key_magenta(im):
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mag = np.clip(((r + b) / 2 - g - 50) / 70, 0, 1)
    rgb = a.copy()
    # Magenta-Saum entfernen
    rgb[..., 0] = np.minimum(r, g + (r - g) * (1 - mag))
    rgb[..., 2] = np.minimum(b, g + (b - g) * (1 - mag))
    out = np.dstack([rgb, (1 - mag) * 255]).astype(np.uint8)
    im = Image.fromarray(out, "RGBA")
    bb = im.getbbox()
    return im.crop(bb) if bb else im


man = {}
for f in sorted(glob.glob(os.path.join(RAW, "*"))):
    base, ext = os.path.splitext(os.path.basename(f))
    if ext.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
        continue
    st = os.stat(f)
    sig = f"{st.st_size}-{int(st.st_mtime)}"
    c = cache.get(base)
    if c and c.get("sig") == sig and all(os.path.exists(os.path.join(OUT, n)) for n in c.get("files", [])):
        man.update(c["man"])
        continue
    im = Image.open(f)
    W, H = im.size
    v = hashlib.md5(sig.encode()).hexdigest()[:6]
    entry, files = {}, []
    if base == "LRA13":
        ring = key_magenta(im)
        if ring.width > 900:
            ring = ring.resize((900, round(ring.height * 900 / ring.width)), Image.LANCZOS)
        ring.save(os.path.join(OUT, "ring-ar.png"), optimize=True)
        entry["ring_ar"] = {"w": ring.width, "h": ring.height, "v": v}
        files.append("ring-ar.png")
    else:
        ratio = W / H
        dw, mw = (3840, 1800) if ratio > 1.2 else (2048, 1200) if ratio > .9 else (1400, 900)
        d = webp(im, base + ".webp", dw)
        m = webp(im, base + "-m.webp", mw, 80)
        entry[base] = {"w": d[0], "h": d[1], "m": 1, "v": v, "src": [W, H]}
        files += [base + ".webp", base + "-m.webp"]
    cache[base] = {"sig": sig, "files": files, "man": entry}
    man.update(entry)
    print("neu:", base, W, "x", H)

json.dump(cache, open(CACHE, "w"))
vid = {}
import subprocess
for f in sorted(glob.glob(os.path.join(ROOT, "site", "assets", "vid", "LRV*.mp4"))):
    b = os.path.basename(f)[:-4]
    if b.endswith("-m"):
        continue
    d = float(subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout or 0)
    vid[b] = {"d": round(d, 3), "v": str(int(os.stat(f).st_mtime))[-6:]}
with open(os.path.join(ROOT, "site", "assets", "js", "img.js"), "w") as fh:
    fh.write("window.IMG=" + json.dumps(man, separators=(",", ":")) + ";\nwindow.VID=" + json.dumps(vid, separators=(",", ":")) + ";\n")
print(len(man), "Bilder im Manifest")
