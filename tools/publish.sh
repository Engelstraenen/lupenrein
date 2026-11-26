#!/bin/zsh
# Veröffentlichen auf GitHub Pages (Zweig gh-pages = Inhalt von site/ aus main, ein einzelner Commit ohne Verlauf).
# NIE `git push origin $(git subtree split …):refs/heads/gh-pages`: Bricht der Split ab (Dropbox mmap-Timeout),
# ist die Ausgabe leer und der Push LÖSCHT gh-pages, GitHub schaltet dann Pages ab (Fehler 26.11.2026).
set -e
cd "${0:A:h}/.."
T=$(git rev-parse main:site)
[[ ${#T} -eq 40 ]] || { echo "Baum site/ nicht gefunden – Abbruch"; exit 1; }
C=$(git commit-tree "$T" -m "gh-pages: site/ aus main $(git rev-parse --short main)")
[[ ${#C} -eq 40 ]] || { echo "Commit fehlgeschlagen – Abbruch"; exit 1; }
git -c http.postBuffer=524288000 push -f origin "${C}:refs/heads/gh-pages"
git ls-remote origin gh-pages
