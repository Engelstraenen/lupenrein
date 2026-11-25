# Dreamina-Originale aus der Zwischenablage (Präfix LRDL + JSON {"LRT5": url}) laden → assets-roh/2k/<ID>D.png + assets-roh/4k/<ID>.png
# 4K-Dateien von sjinn werden NICHT überschrieben (nur wenn dort noch keine größere Datei liegt).
import subprocess, json, urllib.request, os, shutil
from PIL import Image
t = subprocess.run(['pbpaste'], capture_output=True, text=True).stdout
assert t.startswith('LRDL'), 'Zwischenablage gehört nicht uns: ' + t[:12]
d = json.loads(t[4:]); os.makedirs('assets-roh/2k', exist_ok=True)
for k, u in d.items():
    assert 'aigc_resize:0:0' in u, k
    p = f'assets-roh/2k/{k}D.png'; urllib.request.urlretrieve(u, p)
    w, h = Image.open(p).size; q = f'assets-roh/4k/{k}.png'
    if os.path.exists(q) and Image.open(q).size[0] > w:
        print(k, w, h, '→ 4K schon da, nur in 2k abgelegt')
    else:
        shutil.copy(p, q); print(k, w, h, '→', q)
