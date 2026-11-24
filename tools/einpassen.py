#!/usr/bin/env python3
"""Findet ein Nahbild (z. B. LRB25) im Weitbild (LRB01) per SIFT + Ähnlichkeits-Transformation.
Ausgabe: Rechteck des Nahbilds im Weitbild in Anteilen (x, y, w, h), Skala, Drehung, Treffer, Fehler.
Start: python3 tools/einpassen.py LRB01 LRB25"""
import sys, json, cv2, numpy as np, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def load(i):
    for e in ('.png', '.jpg'):
        p = os.path.join(R, 'assets-roh', '4k', i + e)
        if os.path.exists(p): return cv2.imread(p, cv2.IMREAD_GRAYSCALE)
A, B = load(sys.argv[1]), load(sys.argv[2])
f = 1600 / A.shape[1]; a = cv2.resize(A, None, fx=f, fy=f); b = cv2.resize(B, None, fx=f, fy=f)
s = cv2.SIFT_create(8000); ka, da = s.detectAndCompute(a, None); kb, db = s.detectAndCompute(b, None)
m = cv2.BFMatcher().knnMatch(db, da, k=2); g = [x for x, y in m if x.distance < .72 * y.distance]
pb = np.float32([kb[x.queryIdx].pt for x in g]); pa = np.float32([ka[x.trainIdx].pt for x in g])
M, inl = cv2.estimateAffinePartial2D(pb, pa, method=cv2.RANSAC, ransacReprojThreshold=3)
sc = float(np.hypot(M[0, 0], M[1, 0])); rot = float(np.degrees(np.arctan2(M[1, 0], M[0, 0])))
H, W = a.shape; h, w = b.shape
x0, y0 = M[0, 2], M[1, 2]
res = {'x': x0 / W, 'y': y0 / H, 'w': w * sc / W, 'h': h * sc / H, 'skala': sc, 'drehung': rot, 'treffer': int(inl.sum()), 'von': len(g)}
# Deckung prüfen: Nahbild ins Weitbild warpen, Korrelation im Überlappungsbereich
warp = cv2.warpAffine(b, M, (W, H)); mask = cv2.warpAffine(np.ones_like(b), M, (W, H)) > 0
aa, bb = a[mask].astype(float), warp[mask].astype(float)
res['korrelation'] = float(np.corrcoef(aa, bb)[0, 1])
print(json.dumps(res))
