# LUPENREIN – offene Fotos (nach und nach, Eugen 26.11.2026)

Die Seite ist live und wird schon in der Akquise verschickt (projektex.de bettet https://engelstraenen.github.io/lupenrein/ ein).
Jede Änderung, die per `tools/publish.sh` veröffentlicht wird, sehen Kunden sofort. Deshalb: nur fertige, geprüfte Teile einbauen.
Täglich 1–3 Fotos erzeugen. Eine Serie erst einbauen, wenn sie komplett ist (Regler brauchen alle Stufen).

Regeln: nur kostenlos (sjinn GPT Image 2, Schalter „Unlimited · On“, „0 credits“ vor jedem Generate prüfen), höchstens 2 eigene sjinn-Aufträge gleichzeitig,
Dreamina nur nach Freigabe der Leitsitzung, nichts mit Credits. Prompts stehen fertig in `tools/prompts_groesse_reinheit.json`.
Download: `python3 tools/holen.py '{"ID":"<url>"}'`, danach `python3 tools/assets.py` (schärft nach, schreibt WebP + Manifest).

## 1. Diamanten-Unterseite „Wie groß wirkt er?“ – Hand mit echtem Ring in 7 Steingrößen
- IDs LRG025, LRG050, LRG075, LRG100, LRG150, LRG200, LRG300 (2K, 16:9), Referenz `vorschau/ref_LRT5H.jpg` (dieselbe Hand ohne Stein).
- Status: am 26.11. auf sjinn abgeschickt, evtl. schon fertig (im sjinn-Verlauf nach Alt-Text „LRG…“ suchen, sonst neu).
- Jedes Bild prüfen: Ring sitzt am RINGFINGER am Fingeransatz (vor dem Knöchel), Stein wird von Stufe zu Stufe sichtbar größer, Hand identisch.
- Einbau (`site/assets/js/dia.js`, `setCt`): Hintergrund `#grBg` wechselt je Karat-Stufe auf das passende LRG-Foto (vorladen, weich überblenden). Den freigestellten Stein `#grRing` und das mm-Lineal `#grRuler` dann ausblenden. Text in `site/diamanten.html` anpassen („Der Ring am Finger, in 7 Größen“).
- [ ] erledigt

## 2. Diamanten-Unterseite „Reinheit“ – Lupenblick je Reinheitsstufe
- IDs LRCVVS1 … LRCI3 (9 Stück, 4K, 16:9), Referenz `vorschau/ref_LRT3.jpg` (Lupenfoto LRT3). FL und IF = Original LRT3 (sauber).
- Prüfen: Rahmen/Stein deckungsgleich mit LRT3, Einschlüsse nehmen von VVS1 bis I3 sichtbar zu (VVS1 ist besser als VVS2!).
- Einbau (`dia.js`, `setCla`): `#rhBg` wechselt auf LRC<Stufe>, die gemalten Punkte (`#rhInc`) entfernen.
- [ ] erledigt

## 3. Stein von oben je Reinheitsstufe (für „Ihr Diamant“ und die Startseite)
- IDs LRKVVS1 … LRKI3 (9 Stück, 2K, 1:1), Referenz `vorschau/ref_LRSTEIN.jpg` (Original `assets-roh/sjinn4k/LRSTEIN.png`).
- Freisteller bauen wie `site/assets/img/stein_cut.webp` (Kreis per Helligkeitsschwelle, weicher Rand, UnsharpMask, 1400 px) → `site/assets/img/stein_<Stufe>.webp`.
- Einbau: `dia.js` (`#waImg`, `#waInc` raus) und `site/assets/js/app.js` (Karte `.gem-img` + großer Stein `#dStone`, `inc`-Punkte raus) wählen das Bild je Reinheit.
- [ ] erledigt

## 4. Startseite „Service“ – eigenes Foto
- Dunkler Service-Tresen: Uhrmacherlupe, geöffnete Uhr und ein Ring in einer Schale auf schwarzem Glas, dunkle Boutique, Kobalt-Samt (kein Werkbank-/Goldschmied-Look). ID LRSV1, 4K 16:9, Stilreferenz `vorschau/ref_LRD8.jpg`.
- Einbau: `site/index.html` Shot `data-s="6"` (heute LRB06 → LRB06N Uhrenwand) auf LRSV1 umstellen.
- [ ] erledigt

## 5. Startseite AR-Anprobe – Hand dunkel
- LRB23N: Edit von `vorschau/ref_LRB23.jpg` (Hand hochgehalten), Hintergrund dunkle Boutique statt weiß. Wird automatisch genommen (`dk()` in app.js).
- [ ] erledigt

Nach jedem Einbau: Desktop + Handy (`python3 tools/mobil_check.py http://localhost:4436/` bzw. `/diamanten.html`, 0 Befunde), Konsole ohne Fehler,
dann `git commit`, `git push`, `tools/publish.sh`, Haken setzen und eine Zeile in `verlauf/<Datum>.md`.
