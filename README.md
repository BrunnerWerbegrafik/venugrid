# VenuGrid – Frontend-Prototyp (Stufe 1)

VenuGrid ist ein webbasiertes Tool, mit dem Endkunden (typischerweise Eventplaner oder
Eventagenturen) sich durch die branding-fähigen Bereiche einer Event-Location klicken, einzelne
Branding-Module auswählen und daraus eine gesammelte Anfrage stellen können. Dieser Prototyp ist
bewusst schlank gehalten: reine Client-Side-Anwendung auf Basis von React, TypeScript, Vite,
Tailwind CSS und React Router v6. Alle Inhalte sind aktuell als statische Mock-Daten im Code
hinterlegt.

---

## Setup

```bash
npm install
npm run dev
```

Der Dev-Server läuft anschließend unter [http://localhost:5173](http://localhost:5173) und leitet
automatisch auf die Location `/l/kesselhaus-kolbermoor` weiter.

Build für Produktion:

```bash
npm run build
npm run preview
```

---

## Struktur der Anwendung

```
public/
└── images/
    └── locations/        # hier liegen die Bilder der Locations
src/
├── main.tsx              # Einstiegspunkt (ReactDOM.render)
├── App.tsx               # BrowserRouter + AppRouter
├── router.tsx            # Routen + LocationLayout mit CartProvider
├── types/                # TypeScript-Interfaces (backend-ready)
├── data/                 # Mock-Daten (Locations, Areas, Modules)
├── services/             # Service-Schicht – einzig legitimer Datenzugriff für Komponenten
├── context/              # CartContext (React Context + localStorage)
├── components/
│   ├── layout/           # TopNav, Breadcrumb
│   ├── location/         # HeroSection, AreaCard
│   ├── module/           # ModuleCard, ModuleDetailPanel, VariantSelector
│   ├── cart/             # CartItem
│   └── ui/               # PlaceholderImage, Eyebrow, CyanButton, OutlineButton
├── pages/                # LocationHomePage, AreaPage, CartPage, RequestFormPage, RequestSuccessPage
└── styles/
    └── index.css         # Tailwind + globale Celonis-Style-Tokens
```

**Service-Schicht als Backend-Andockpunkt:** Komponenten greifen niemals direkt auf
`src/data/mockData.ts` zu, sondern ausschließlich über die Services in `src/services/`
(`locationService`, `areaService`, `moduleService`, `requestService`). Jede Service-Funktion ist
Promise-basiert. Sobald das echte Backend bereitsteht, wird ausschließlich die interne
Implementierung dieser Services gegen echte API-Calls getauscht – die Komponenten bleiben
unverändert.

---

## Routing

| Pfad | Beschreibung |
| --- | --- |
| `/` | Redirect zu `/l/kesselhaus-kolbermoor` |
| `/l/:slug` | Location-Startseite mit Hero und Bereichs-Grid |
| `/l/:slug/bereich/:areaId` | Bereichsansicht mit Modul-Grid; Module öffnen Slide-In-Detail-Panel |
| `/l/:slug/warenkorb` | Anfragekorb (localStorage-persistiert je Location-Slug) |
| `/l/:slug/anfrage` | Anfrageformular |
| `/l/:slug/anfrage/erfolg` | Bestätigungsseite |

Das Modul-Detail ist bewusst **keine eigene Route**, sondern ein Slide-In-Panel (von rechts), das
die aktuelle Seite überlagert.

---

## Bilder hinzufügen

Alle Bilder werden manuell in folgenden Ordner gelegt:

```
public/images/locations/
```

**Namenskonvention** (kleingeschrieben, Bindestriche für mehrteilige Wörter, Unterstriche als
Trenner zwischen Strukturebenen):

```
{location-slug}_{kategorie}_{bereich}_{modul}_{variante}.webp
```

- `{location-slug}` – z.B. `kesselhaus`
- `{kategorie}` – `titel`, `bereich` oder `modul`
- `{bereich}` – z.B. `aussenbereich`, `eingangsbereich`, `kesselhalle`
- `{modul}` – z.B. `glasfront`, `eingangstuer`
- `{variante}` – optional, nur bei Modulen mit mehreren Varianten: `variante-1`, `variante-2`, …

**Format & Größe:** Bilder werden als **WebP** ausgeliefert (Quality ~82), Titelbild max. 1920 px
Breite, alle übrigen max. 1440 px. Das hält die gesamte Bilder-Payload für das Kesselhaus unter
2,2 MB bei hoher Retina-Qualität.

**Aktuell erwartete Dateien für das Kesselhaus (12 Bilder):**

Titelbild (1):
- `kesselhaus_titel.webp`

Bereichs-Bannerbilder (3):
- `kesselhaus_bereich_aussenbereich.webp`
- `kesselhaus_bereich_eingangsbereich.webp`
- `kesselhaus_bereich_kesselhalle.webp`

Modulbilder (8):
- `kesselhaus_modul_aussenbereich_glasfront_variante-1.webp`
- `kesselhaus_modul_aussenbereich_glasfront_variante-2.webp`
- `kesselhaus_modul_aussenbereich_glasfront_variante-3.webp`
- `kesselhaus_modul_eingangsbereich_eingangstuer.webp`
- `kesselhaus_modul_eingangsbereich_schaukasten.webp`
- `kesselhaus_modul_kesselhalle_glastuer-kessel.webp`
- `kesselhaus_modul_kesselhalle_glastuer-toiletten.webp`
- `kesselhaus_modul_kesselhalle_treppe.webp`

**Neue Bilder hinzufügen:** JPG/PNG-Originale können mit einem Konverter (z.B.
[squoosh.app](https://squoosh.app), `cwebp` oder `sharp`) in WebP mit Quality 82 und max. 1440 px
Breite konvertiert und unter dem obigen Namensschema in `public/images/locations/` abgelegt
werden. Anschließend die `imageUrl` in `src/data/mockData.ts` entsprechend pflegen.

**Fallback:** Fehlt ein Bild, zeigt `<PlaceholderImage>` einen dunklen CSS-Gradient plus ein
dezentes Uppercase-Label als Platzhalter. Die App bleibt vollständig funktional.

---

## Warenkorb

Der Warenkorb ist pro Location-Slug in `localStorage` persistiert (Key:
`venugrid_cart_<slug>`). Das Hinzufügen eines Moduls mit Varianten speichert die aktuell ausgewählte
Variante mit. Das Leeren erfolgt automatisch nach erfolgreicher Anfrage.

---

## Visuelle Richtung

Die visuelle und stilistische Richtung orientiert sich eng an der Celonis-Website
([celonis.com/de](https://www.celonis.com/de)). Das gilt als bindend für alle zukünftigen
Änderungen und Erweiterungen. Kernmerkmale:

- Dunkler, fast schwarzer Hintergrund (`#0a0a0a`), weiße und hellgraue Texte
- Akzentfarbe Cyan `#1fb3da` (Firmenfarbe Brunner Werbegrafik)
- Sans-Serif (Inter), leichte Gewichte (300/400), keine schweren Gewichte
- Kursive Teilworte in Überschriften als Stilmittel
- Hairline-Borders und feine Raster, großzügige Abstände
- Pfeile (→) bei klickbaren Elementen, subtile Hover-Zustände
- Keine Gradienten-Dekoration, keine bunten Badges, keine Schatten/Glows

---

## Roadmap

**Stufe 1 (aktuell):**
Frontend-Prototyp mit Mock-Daten, Warenkorb via localStorage, Anfrage-Submission als
Konsolen-Log. Kein Backend, kein Login, kein Admin-Bereich.

**Stufe 2 (geplant):**
- Echtes Backend (voraussichtlich PostgreSQL via Supabase)
- Admin-Login für Betreiber
- Admin-CRUD-Oberfläche für Locations, Bereiche, Module, Bilder
- Anfragen-Übersicht und -Verwaltung
- Echte E-Mail-Benachrichtigung bei neuen Anfragen

**Stufe 3 (geplant):**
- Login-Zugang für Location-Inhaber (z.B. Anton / Kesselhaus)
- Eigene Dashboard-Ansicht pro Location-Inhaber
- Sicht auf die Anfragen, die die eigene Location betreffen
- Individualisierungsrechte der eigenen Location (Details später definiert)

Die Service-Schicht (`src/services/`) ist gezielt so aufgebaut, dass das Backend später ohne Umbau
der Komponenten angedockt werden kann.
