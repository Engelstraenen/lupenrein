#!/usr/bin/env python3
"""Holt neue sjinn-Ergebnisse: python3 tools/holen.py '{"LRA06":"https://...png"}'  -> assets-roh/4k + vorschau/<id>.jpg"""
import json, os, sys, subprocess, urllib.request
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
m = json.loads(sys.argv[1]); neu = []
for k, u in m.items():
    dst = os.path.join(R, "assets-roh", "4k", k + os.path.splitext(u)[1])
    if any(os.path.exists(os.path.join(R, "assets-roh", "4k", k + e)) for e in (".png", ".jpg")):
        continue
    subprocess.run(["curl", "-sS", "-o", dst, u], check=True)
    subprocess.run(["sips", "-s", "format", "jpeg", "-Z", "1600", dst, "--out", os.path.join(R, "vorschau", k + ".jpg")], capture_output=True)
    w = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", dst], capture_output=True, text=True).stdout.split()
    neu.append(k); print("neu", k, w[-3], "x", w[-1])
print("NEU:", ",".join(neu))
