# PROJEKT-MASTERFILE – LUPENREIN
Gilt zusätzlich zur globalen Masterfile (~/.claude/CLAUDE.md).

## 1. Ziel und Endprodukt
Interaktive Demo-Webseite für einen erfundenen JUWELIER „LUPENREIN“ (Schmuckgeschäft: verkauft Schmuck, Ringe, Trauringe, Diamanten, Uhren). KEIN Goldschmied, keine Werkstatt, kein Schmieden/Gießen/Löten (Eugen 23.11.2026). Musterbeispiel für Akquise (PROJEKT EX), Niveau wie WARMHERZ, FARBKANTE, LICHTBOGEN.
Probleme, die die Seite löst: Online-Konkurrenz (online sehen, reservieren, im Laden anprobieren), Vertrauen beim Altgold-Ankauf, Verlobungs-/Trauringberatung, Diamant-Beratung (4C), Uhren (Kollektion + Uhrenservice-Status), Geschenkberatung, Nachwuchs im Verkauf (Ausbildung Verkäufer:in Schmuck & Uhren).

## 2. Qualitätsanspruch & Referenzen
- Aufbau wie FLUTLICHT27/FARBKANTE: Film-Kapitel (Scrollen spult das Video) im Wechsel mit Motion-Design-Kapiteln, Übergänge Film ↔ Grafik.
- Fotolook: DUNKEL wie der Einstieg (seit 26.11.2026): Schwarz, schmale Lichtschlitze, Kobalt-Samt, Platin, kleine Messing-Lichter. (24.–25.11. hell/weiß – von Eugen verworfen.)
- Leitmotiv eindeutig zum Juwelier: Beratung am Tresen, Juwelierlupe in der Hand der Beraterin (Diamant zeigen), Vitrine/Schaufenster, Samttablett, Anprobe am Finger, Uhrenwand. Nie Werkbank, Flamme, Amboss, Goldschmied.

## 3. Regeln für dieses Projekt
- Keine echten Firmen/Personen, keine Preise/Euro, kein Wort „KI“, keine Rechtsaussagen. Demo-Hinweis, Formulare senden nichts, `?firma=Name`.
- Bewertungen nur als markierte Beispiele, bis echte Daten vorliegen.
- Mobil-Prüfung 390×844, 360×740, 430×932, 844×390 + Kopfzeile 1081–1600 px.
- Recruiting-Kapitel (Film + Bewerbung in 60 s) Pflicht: Verkauf/Beratung Schmuck & Uhren, nicht Goldschmied.

- Ab 24.11.2026 (Eugen, über Leitsitzung): Fotos nur kostenlos auf sjinn mit GPT Image 2 (tool-mode/gpt-image-2, Schalter Unlimited → „Unlimited · On“, „0 credits“, vor jedem Generate prüfen). Höchstens 3 eigene Aufträge gleichzeitig (WURZELWERK 2), eigene per ID im Detail-Fenster zählen. Dreamina = KEHRWERK. Nichts mit Credits ohne Eugens OK.

## 4. Skills, Plugins, Agenten, MCP
claude-in-chrome (sjinn.ai Unlimited). Sonst nichts.

## 5. Zugänge
gh (Engelstraenen), sjinn in Chrome eingeloggt.

## 6. Workflow & Freigabepunkte
3 Storyboards (konzepte/) → Eugens Wahl → First Frames 4K → Video-Drafts gratis → Seite bauen → Storyboard-Abgleich → GitHub Pages.

## 7. Befehle
- Vorschau: `python3 tools/serve.py 4436` → http://localhost:4436 (Port 4436, vorher `<title>` prüfen)
- Bilder: `python3 tools/assets.py` (assets-roh/4k → site/assets/img)
- Handy-Prüfung: `python3 tools/mobil_check.py http://localhost:4436/`
- Veröffentlichen: `tools/publish.sh` (gh-pages = ein Commit aus main:site) → https://engelstraenen.github.io/lupenrein/. NIE `push $(git subtree split …)`: leerer Split löscht gh-pages und schaltet Pages ab (26.11.2026).
- Neue sjinn-Bilder holen: `python3 tools/holen.py '{"LRA16":"<url>"}'` dann `python3 tools/assets.py`

## 8. Offene Fragen
- (erledigt) Wahl: Mix.

## 9. Entschieden
- 26.11.2026 Eugen: Die GANZE Seite bleibt dunkel wie der Einstieg („weiß passt gar nicht“, „CI komplett scheiße“ sonst). Weiße Galerie ist abgelöst (`site/assets/css/dunkel.css`, dunkle Fotos `LRBxxN`, Eingang „Treten Sie ein“ entfällt). Keine Doppelungen: Einstiegs-Inhalte gehören unter Verlobungsringe/Trauringe; „Privater Termin“ als Reiter oben. Schmuck & Uhren mit großen Bildern, Uhren im Sortiment. Ankauf mit Gold-Rechner (Feingold in Gramm, keine Preise). Regler müssen den Diamanten sichtbar verändern, Steine hochauflösend. Neuer Aufbau entfällt: Eugen 26.11. „Die Seite ist perfekt, so wie sie jetzt ist“ → Storyboards LRS1–3 verworfen, aktueller dunkler Aufbau bleibt.
- 25.11.2026 Eugen: Unterseite Diamanten = Storyboard 3 „Am Tresen, Schritt für Schritt“ (LRQ3): Briefchen → Pinzette → Lupe → Farbe D–K → Größe am Finger → 4 Regler → Fassung → Termin am Tresen. Seite `site/diamanten.html`, Fotos LRT1–8.
- 25.11.2026 Eugen: „UNTERSEITE CONFIRMED“ (Verlobungsringe: Lupe in Glasform, Facetten-Hintergrund mit Bewegung, Karten-Abgleich, Ringgröße mit mitwachsendem Ring, Konfigurator 4×4, Licht-Vergleich, Fragen). Vorlage für weitere Unterseiten.
- 25.11.2026 Eugen (mehrfach, verärgert): JEDER Abschnitt hat ein echtes Foto im Hintergrund, nie nur Schwarz/Farbe, keine schwarzen Scrollstrecken. Fehlt ein neues Foto, sofort ein vorhandenes passendes Foto einsetzen statt auf eine Bild-Schlange zu warten. „Originalgröße“ = Facetten-Foto LRD3 (Blick in den Diamanten) als Anschluss an den Lupen-Zoom.
- 25.11.2026 Eugen: Unterseite Verlobungsringe = Storyboard „Lupe“ (U1). KEIN Weiß: die Lupen-Geschichte bleibt durchgehend dunkel, kein weißer Lichtschnitt, keine langen Scrollstrecken ohne Handlung („weißer Hintergrund komplett scheiße“). Konfigurator: jede angebotene Steinform muss in jedem Metall ein Foto haben.
- 25.11.2026 Eugen: Einstieg = Storyboard 2 „Schwarz mit Lichtschlitzen“ (vor der weißen Galerie, Abschnitt `#nacht`). Ring Weißgold Smaragdschliff dreht sich im Film, Auswahl Solitär/Halo/Klassisch. Drehbuch `docs/einstieg_s2.md`.
- 25.11.2026 Eugen: Übergänge = Kamerafahrt (Storyboard U3, `?uebergang=fahrt` jetzt Standard). Lichtstrahl „sieht billig aus“ → raus (nur noch per `?uebergang=licht`). Neuer Wunsch: Einstieg wie Hollywood/High-End-Werbung (Ring schwebt und dreht sich im dunklen Raum, harter Lichtstrahl, Makro-Nahaufnahmen, Diamant funkelt) → 3 Storyboards LRH1–3 (`tools/prompts_hollywood.json`). Keine „random“ Code-Effekte mehr statt echter Filmbilder.
- 24.11.2026 Regel V2.66: eine durchgehende Geschichte, Übergangs-Drehbuch `docs/uebergaenge.md`.
- 24.11.2026 Eugen: NEUAUFBAU „Weiße Galerie“ (Storyboard `konzepte/5-weisse-galerie.png`, LRT2) bestätigt. Leitidee Vitrinenflug: Scrollen zoomt durch die Glasvitrinen von Fach zu Fach (Fotos, keine WebGL-Kacheln – Screenshot-Entwurf war „richtig scheiße“). Farbwelt Kreideweiß + Kobalt (FARBWELTEN.md). Bilder LRB01–24 auf sjinn GPT Image 2 Unlimited (4K = 3584×2016). Alte Schwarz-Gold-Bilder in `assets-roh/alt-schwarzgold/`. Immer 2–3 Storyboards zur Wahl.
- 24.11.2026 Eugen: Knöpfe waren zu blass (Champagner wirkte weiß) → alle Knöpfe/aktive Chips in sattem Gold (#a8761f–#d9a441, Schrift fast schwarz), auch „Reservieren & anprobieren“ gefüllt statt Umriss.
- 23.11.2026 Eugen: MIX aus JW1 + JW2 (+ „Welcher Ring passt zu Ihnen?“ aus JW3). Aus JW1: Diamant-Erklärer mit Reglern (Reinheit IF/VVS/VS/SI …), Ring-/Trauring-Konfigurator, Altgold-Ankauf, Werde Juwelierin, Ringberatung buchen, Uhrenservice-Status (Design wie JW1). Aus JW2: Schaufenster/Vitrine, Anprobe am Handy per AR (Ring wandert auf die Hand), Konfigurator. Ganzes Sortiment zeigen: Ringe, Ketten, Colliers, Armbänder, Ohrschmuck, Uhren. Kapitelplan `docs/kapitel.md`. Hero = Lupe (Name LUPENREIN), Schaufenster = zweites Film-Kapitel (Annahme Claude).
- 23.11.2026: Juwelier ≠ Goldschmied (Eugen). Alte Storyboards LR1–LR3 (Werkstatt/Goldschmiedin) verworfen, neu JW1–JW3. Sitzung eigenständig (nicht mehr unter Fahrschule).
- 23.11.2026: Name LUPENREIN (Annahme). 3 Storyboards auf sjinn (Nano Banana 2.1, 2K, Unlimited), Prompts im sjinn-Verlauf, Alt-Text beginnt mit LR1/LR2/LR3.

## 10. Ablage
Code + Konzepte: Dropbox/CLAUDE/Projekte/LUPENREIN
