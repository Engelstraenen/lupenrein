# Einstieg „Schwarz mit Lichtschlitzen“ (Storyboard S2, Eugen 25.11.2026: „2 Lichtschlitze“)
Storyboard: `konzepte/S2-samt-lichtschlitze.png` (Vorschau `vorschau/S2-samt-lichtschlitze.jpg`).
Fotos = Panels als eigene 4K-Bilder auf sjinn GPT Image 2 Unlimited, Referenz 1 = Storyboard-Blatt, Referenz 2 = LRW1 (Weißgold-Ring). Prompts `tools/prompts_lichtschlitze.json`, Skript `tools/sjinn_lrd.js`.
Code: `site/assets/js/nacht.js`, Abschnitt `#nacht` in `index.html`, CSS-Block „Einstieg“ in `style.css`.

| Panel | Bild | Scroll | Übergang zum nächsten |
|---|---|---|---|
| 1 Lichtschlitz über dem Diamanten | Film 1 `assets/vid/ring1.mp4` (Start LRW1), sonst LRD1 | 0–15 % | Ring dreht sich im Film weiter (Panel 2) |
| 2 zweiter Schlitz entlang der Schiene | Film 1 Ende / LRD2 | | Kamera fährt auf den Diamanten zu |
| 3 in den Diamanten | Film 2 `ring2.mp4` (Start = letztes Bild Film 1), sonst LRD3 | 15–29 % | Facetten-Licht wird hell → Lichtstreifen auf der Hand (Match über Helligkeit) |
| 4 Hand im Lichtstreifen | LRD4 | 29–43 % | Kamera zieht zurück: Ring am Finger → rechter Ring der Dreierreihe (Zoom vom Ringpunkt aus) |
| 5 drei Ringe in drei Lichtsäulen | LRD5, Wahl Solitär/Halo/Klassisch | 43–57 % | Fahrt an den gewählten Ring |
| 6 Ring groß + Datenfeld | LRD6 / LRD6A / LRD6B | 57–71 % | Zoom in die obere Krappe |
| 7 Makro Krappe, Lichtstreifen | LRD7 | 71–81 % | Der Lichtstreifen öffnet sich diagonal als Maske, dahinter die Lounge |
| 8 Lounge „Privater Termin“ | LRD8 | 81–95 % | Fahrt in die beleuchtete Vitrine hinten, Dunkel blendet aus, helle Galerie („Treten Sie ein.“) übernimmt |
| 9 Handy | Handy-Layout (contain für LRD5, Karten unten) | | |
