#!/usr/bin/env python3
"""Mehrskalen-Template-Match: sucht Nahbild B (verkleinert) im Weitbild A. Ausgabe Rechteck in Anteilen + Korrelation.
Start: python3 tools/einpassen2.py LRB01 LRB25"""
import sys, os, json, cv2, numpy as np
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ld = lambda i: cv2.imread(next(p for p in (os.path.join(R, 'assets-roh', '4k', i + e) for e in ('.png', '.jpg')) if os.path.exists(p)))
A, B = ld(sys.argv[1]), ld(sys.argv[2])
a = cv2.resize(A, (1792, 1008)); best = None
for s in np.arange(.15, .60, .005):
    b = cv2.resize(B, (int(1792 * s), int(1008 * s)))
    r = cv2.matchTemplate(a, b, cv2.TM_CCOEFF_NORMED); _, mv, _, ml = cv2.minMaxLoc(r)
    if not best or mv > best[0]: best = (mv, s, ml)
mv, s, (x, y) = best
print(json.dumps({'x': x / 1792, 'y': y / 1008, 'w': s, 'h': s, 'korrelation': round(float(mv), 3)}))
