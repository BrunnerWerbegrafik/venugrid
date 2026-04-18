# VenuGrid – Frontend-Prototyp (Stufe 1)

> **So verwendest du diesen Prompt:** Füge den gesamten Inhalt unterhalb der Trennlinie in Replit (AI-Agent) oder Claude Code ein. Dies ist ein reiner Frontend-Prototyp ohne Datenbank und ohne Admin-Bereich – alle Inhalte sind als statische Daten im Code hinterlegt. Die Architektur ist jedoch so angelegt, dass ein Backend später ohne Umbau angedockt werden kann.

---

## Projektauftrag: VenuGrid – Frontend-Prototyp (Stufe 1)

Baue einen **reinen Frontend-Prototypen** einer webbasierten Anwendung namens **VenuGrid**. Das ist ein Tool, mit dem Endkunden (typischerweise Eventplaner oder Eventagenturen) sich durch die branding-fähigen Bereiche einer Event-Location klicken, einzelne Branding-Module auswählen und daraus eine gesammelte Anfrage stellen können.

---

## Wichtige Abgrenzung – was jetzt NICHT gebaut wird

Dies ist bewusst Stufe 1 und sehr schlank gehalten, um Entwicklungszeit und Tokens zu sparen:

- **Keine Datenbank** – alle Inhalte (Locations, Bereiche, Module) sind als TypeScript-Konstanten im Code hinterlegt
- **Keine Authentifizierung, kein Login**
- **Kein Admin-Bereich** – das Pflegen von Inhalten wird in Stufe 2 ergänzt
- **Kein echter E-Mail-Versand** – das Anfrageformular zeigt eine Bestätigungsseite an und loggt die Daten in die Browser-Konsole
- **Keine Bildupload-Funktion im Frontend** – Bilder werden manuell in einen fest definierten Bildordner gelegt (siehe Sektion "Bildnamen-Konvention & Image-Handling")
- **Kein Backend-Server nötig** – reine Client-Side-Anwendung

Das Ziel dieser Stufe ist, dass ich den visuellen und funktionalen Aufbau der Anwendung durchklicken und beurteilen kann. Alles Weitere wird in späteren Stufen ergänzt.

---

## Roadmap – was später kommt (muss jetzt schon mitgedacht werden)

Die Architektur des Prototyps **muss** so angelegt sein, dass folgende spätere Erweiterungen ohne grundlegenden Umbau möglich sind:

**Stufe 2 – Backend & Admin-Bereich (wir, als Betreiber):**
- Echtes Backend mit Datenbank (voraussichtlich PostgreSQL via Supabase)
- Admin-Login für uns
- CRUD-Oberfläche zum Anlegen/Bearbeiten/Löschen von Locations, Bereichen, Modulen, Bildern
- Anfragen-Übersicht und -Verwaltung
- E-Mail-Benachrichtigung bei neuen Anfragen

**Stufe 3 – Location-Inhaber-Rolle:**
- Login-Zugang für Location-Inhaber (z.B. Location-Manager wie Anton vom Kesselhaus)
- Location-Inhaber können die eigene Location individualisieren (genaue Rechte werden später festgelegt – die Architektur muss hier flexibel bleiben)
- Location-Inhaber sehen die Anfragen, die ihre eigene Location betreffen

**Konsequenzen für den jetzigen Frontend-Code:**

1. **Typen als wären sie vom Backend** – alle Entitäten (Location, Area, Module, Request, User) haben UUIDs als IDs, `createdAt`/`updatedAt` Felder, Foreign Keys. Auch wenn die Daten aktuell hartkodiert sind, sollen die TypeScript-Interfaces so aussehen, als kämen sie von einer REST- oder GraphQL-API.
2. **Service-Schicht kapselt Datenzugriff** – Komponenten lesen niemals direkt aus einem Konstanten-Array. Stattdessen gibt es einen `locationService`, `moduleService`, `requestService` mit async-Funktionen (z.B. `await locationService.getBySlug(slug)`), die aktuell die Mock-Daten zurückgeben. Später wird nur die Implementierung ausgetauscht, die Komponenten bleiben unverändert.
3. **Rollen schon im User-Typ vorsehen** – obwohl es keinen Login gibt, existiert ein `User`-Interface mit einem `role`-Feld (`'admin' | 'location_owner' | 'customer'`).
4. **Location hat ein `ownerId`-Feld** (vom Typ UUID, kann null sein), sodass später einer Location ein Location-Inhaber zugeordnet werden kann.
5. **Request-Submit als abstrahierte Funktion** – statt `console.log` direkt im Formular-Handler zu rufen, gibt es `requestService.submit(data)`, das aktuell loggt und eine Promise-basierte Antwort zurückgibt.

---

## Tech-Stack

- **Framework:** React mit Vite + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State für Warenkorb:** React Context + `localStorage` zur Persistenz (keyed pro Location-Slug, damit Warenkörbe getrennt bleiben)
- **Keine weiteren Libraries** außer den oben genannten und deren direkter Abhängigkeiten

---

## Visuelle Richtung (KRITISCH – genau lesen und befolgen)

**Die gesamte visuelle und stilistische Richtung der Anwendung orientiert sich sehr eng am Design der Celonis-Website: https://www.celonis.com/de**

Das ist nicht verhandelbar und gilt für **jede einzelne UI-Entscheidung**, die du triffst – auch bei späteren Änderungen. Bevor du mit dem Bauen beginnst, sieh dir die Celonis-Website genau an und übernimm ihren Gestaltungsansatz. Wenn du später etwas anpasst oder Neues hinzufügst, orientierst du dich ebenfalls an Celonis.

### Kernmerkmale des Celonis-Stils, die wir übernehmen

**Farbwelt:**
- Dunkler, fast schwarzer Hintergrund als Grundhaltung (`#0a0a0a` bis `#111111`)
- Weiße und hellgraue Textfarben (`#ffffff`, `rgba(255,255,255,0.7)`, `rgba(255,255,255,0.5)`)
- Hairline-Borders in `rgba(255,255,255,0.08)` bis `rgba(255,255,255,0.2)`
- **Akzentfarbe: Cyan `#1fb3da`** (unsere Firmenfarbe von Brunner Werbegrafik, NICHT das Celonis-Grün)
- Keine weiteren Farben – das System ist bewusst monochrom mit einer einzigen Akzentfarbe

**Typografie:**
- Sans-Serif durchgängig (die System-Sans oder Inter)
- Große, luftige Überschriften in leichten Gewichten (300 oder 400)
- Kursive Teilworte in Überschriften als Stilmittel (wie bei Celonis: "*funktioniert* KI") – z.B. "Kesselhaus *Kolbermoor*" oder "Drei Bereiche, *eine Bühne* für Ihre Marke"
- Uppercase-Labels mit Laufweite für Eyebrows, Breadcrumbs, kleine Labels
- Keine schweren Gewichte (kein 700, kein 800) – die Typografie wirkt durch Kontrast der Größen, nicht durch Gewicht

**Layout:**
- Viel Weißraum (bzw. Schwarzraum) und großzügige Abstände
- Klare Raster, oft mit feinen 1px-Linien als Trennung
- Bilder/Kacheln mit sehr dunklen Gradienten-Hintergründen, die wenig vom Inhalt ablenken
- Eyebrow-Labels mit horizontalem Strich davor oder danach als typisches Celonis-Element

**Interaktion:**
- Pfeile (→) bei klickbaren Elementen, die bei Hover nach rechts wandern und cyan leuchten
- Hover-Zustände sind subtil – Hintergrund wird minimal heller, Rahmen wird cyan
- Keine großen Animationen, keine bouncenden Effekte – alles ist ruhig und schnell

**Was explizit NICHT zur visuellen Richtung gehört:**
- Keine Gradienten-Flächen als Dekoration
- Keine bunten Badges, keine grünen/roten Status-Farben (außer Cyan als Akzent)
- Keine Schatten, keine Glows, keine abgerundeten Riesenecken
- Keine Serifen-Schrift
- Keine Emojis in der UI

### Hintergrund zur Designrichtung

Unsere Zielkunden sind primär Tech- und Softwareunternehmen (z.B. Databricks, Coupa, Celonis). Das Design muss zu dieser Zielgruppe passen: reduziert, klar, hochwertig-technisch. Die dunkle, zurückgenommene Optik stellt sicher, dass später das eigentliche Interesse – die Bilder der Event-Locations und die Branding-Module – maximal wirken kann. Das Design ist Bühne, nicht Hauptdarsteller.

---

## Bildnamen-Konvention & Image-Handling

Alle Bilder werden manuell in einen fest definierten Ordner im Projekt gelegt:

```
public/images/locations/
```

**Namenskonvention** (stets kleingeschrieben, Bindestriche für mehrteilige Wörter, Unterstriche als Trenner zwischen Strukturebenen):

```
{location-slug}_{kategorie}_{bereich}_{modul}_{variante}.jpg
```

- `{location-slug}` – Location-Slug, z.B. `kesselhaus`
- `{kategorie}` – `titel`, `bereich` oder `modul`
- `{bereich}` – Bereichs-Slug, z.B. `aussenbereich`, `eingangsbereich`, `kesselhalle`
- `{modul}` – Modul-Slug, z.B. `glasfront`, `eingangstuer`
- `{variante}` – optional, nur wenn Modul mehrere Varianten hat: `variante-1`, `variante-2`, `variante-3`

**Wichtig:** Dieses Namensschema ist verbindlich. Die `mockData.ts` muss exakt diese Dateinamen als `imageUrl`-Werte hinterlegen. Die Bilder selbst werden manuell vom Auftraggeber in den Ordner `public/images/locations/` gelegt. Ladet NICHT selbst Bilder herunter, generiert keine Platzhalter-PNGs und erfindet keine anderen Dateinamen.

**Komplette Liste aller Bilder für das Kesselhaus (insgesamt 12 Bilder):**

Titelbild (1):
- `kesselhaus_titel.jpg`

Bereichs-Bannerbilder (3):
- `kesselhaus_bereich_aussenbereich.jpg`
- `kesselhaus_bereich_eingangsbereich.jpg`
- `kesselhaus_bereich_kesselhalle.jpg`

Modulbilder (8):
- `kesselhaus_modul_aussenbereich_glasfront_variante-1.jpg`
- `kesselhaus_modul_aussenbereich_glasfront_variante-2.jpg`
- `kesselhaus_modul_aussenbereich_glasfront_variante-3.jpg`
- `kesselhaus_modul_eingangsbereich_eingangstuer.jpg`
- `kesselhaus_modul_eingangsbereich_schaukasten.jpg`
- `kesselhaus_modul_kesselhalle_glastuer-kessel.jpg`
- `kesselhaus_modul_kesselhalle_glastuer-toiletten.jpg`
- `kesselhaus_modul_kesselhalle_treppe.jpg`

**Fallback-Verhalten, wenn Bilder fehlen:**

Da die Bilder vom Auftraggeber manuell hochgeladen werden, kann es sein, dass zum Entwicklungszeitpunkt noch nicht alle Bilder vorhanden sind. Die Komponente `<PlaceholderImage>` (siehe Projektstruktur) muss folgendes Fallback-Verhalten implementieren:

1. Bildpfad wie in der mockData definiert laden.
2. Falls das Bild nicht geladen werden kann (onError-Event), stattdessen einen dunklen CSS-Gradient als Platzhalter anzeigen. Der Gradient wird aus der mockData (`placeholderGradient`-Feld) übernommen.
3. Zusätzlich wird bei Verwendung des Platzhalters ein kleines graues Uppercase-Label eingeblendet, das den erwarteten Inhalt beschreibt (z.B. "GLASFRONT – VARIANTE 1"). Das Label ist bewusst dezent (Farbe `rgba(255,255,255,0.2)`, Letterspacing, Uppercase) und verschwindet, sobald das echte Bild geladen wird.

So ist der Prototyp sofort lauffähig – auch wenn noch keine Bilder hochgeladen sind.

---

## Datenmodell (als TypeScript-Interfaces)

Definiere in `src/types/` folgende Interfaces. Sie müssen backend-ready sein, d.h. so aussehen, als würden sie von einer REST-API kommen:

```typescript
// User (aktuell nicht verwendet, aber Typen bereits definieren)
export type UserRole = 'admin' | 'location_owner' | 'customer';

export interface User {
  id: string; // UUID
  email: string;
  name: string;
  role: UserRole;
  createdAt: string; // ISO-Timestamp
}

// Location
export interface Location {
  id: string; // UUID
  slug: string; // URL-sicher, z.B. "kesselhaus-kolbermoor"
  name: string;
  description: string; // Einleitungstext
  heroImage: ImageAsset;
  ownerId: string | null; // Verweis auf User mit role='location_owner', aktuell null
  showPrices: boolean;
  createdAt: string;
  updatedAt: string;
}

// Area (Bereich)
export interface Area {
  id: string; // UUID
  locationId: string; // FK
  parentAreaId: string | null; // ermöglicht Unterbereiche in späteren Stufen
  slug: string; // URL-sicher, z.B. "aussenbereich"
  name: string;
  description: string;
  image: ImageAsset;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Module (Branding-Modul)
export interface Module {
  id: string; // UUID
  areaId: string; // FK
  slug: string; // URL-sicher, z.B. "glasfront"
  name: string;
  shortDescription: string; // für Kachel
  longDescription: string; // für Detail-Panel
  specifications: ModuleSpec[]; // Material, Montage, Maße etc.
  price: number | null; // wird nur angezeigt, wenn Location.showPrices = true
  variants: ModuleVariant[]; // mindestens ein Eintrag; bei einem Eintrag keine Varianten-UI
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ModuleVariant {
  id: string; // UUID
  name: string; // z.B. "Variante 1", "Variante 2"
  images: ImageAsset[]; // Bildergalerie pro Variante (für Stufe 1: meist nur ein Eintrag)
  sortOrder: number;
}

export interface ModuleSpec {
  label: string; // z.B. "Material"
  value: string; // z.B. "Folie"
}

// Image Asset
export interface ImageAsset {
  id: string;
  url: string; // relativer Pfad, z.B. "/images/locations/kesselhaus_titel.jpg"
  placeholderGradient: string; // CSS-Gradient-String als Fallback bei Ladefehler
  alt: string;
}

// Request (Anfrage)
export interface RequestItem {
  moduleId: string;
  moduleName: string;
  areaName: string;
  variantId: string | null;
  variantName: string | null;
  quantity: number;
}

export interface RequestSubmission {
  locationId: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  eventDate: string | null; // ISO-Date
  message: string;
  items: RequestItem[];
}

export interface Request extends RequestSubmission {
  id: string; // UUID
  status: 'new' | 'in_progress' | 'closed';
  createdAt: string;
}
```

---

## Service-Schicht (Datenzugriff kapseln)

Lege in `src/services/` folgende Service-Dateien an. Komponenten dürfen NIEMALS direkt auf Mock-Daten zugreifen, sondern immer über diese Services:

```typescript
// src/services/locationService.ts
export const locationService = {
  async getBySlug(slug: string): Promise<Location | null> { /* gibt aktuell Mock-Daten zurück */ },
  async getAll(): Promise<Location[]> { /* gibt aktuell Mock-Daten zurück */ },
};

// src/services/areaService.ts
export const areaService = {
  async getByLocationId(locationId: string): Promise<Area[]> { /* Mock */ },
  async getById(areaId: string): Promise<Area | null> { /* Mock */ },
};

// src/services/moduleService.ts
export const moduleService = {
  async getByAreaId(areaId: string): Promise<Module[]> { /* Mock */ },
  async getById(moduleId: string): Promise<Module | null> { /* Mock */ },
};

// src/services/requestService.ts
export const requestService = {
  async submit(data: RequestSubmission): Promise<{ success: boolean; requestId: string }> {
    // aktuell: in Konsole loggen, 500ms warten, Erfolg zurückgeben
    // später: echter API-Call
  },
};
```

Alle Services geben Promises zurück, auch wenn sie aktuell nur Mock-Daten bereitstellen. So ist der Übergang zu echten API-Calls später trivial.

---

## Seed-Daten (Mock)

Lege die Mock-Daten in `src/data/mockData.ts` an. Verwende feste UUIDs (du kannst sie selbst generieren, aber sie sollen realistisch aussehen). Jeder `ImageAsset.url` muss exakt dem in der Bildnamen-Konvention definierten Pfad entsprechen.

**Location: Kesselhaus Kolbermoor**
- Slug: `kesselhaus-kolbermoor`
- Name: "Kesselhaus Kolbermoor"
- Beschreibung: "Ein historisches Industriedenkmal mit außergewöhnlichem Charakter — entdecken Sie die Möglichkeiten für Ihr Event-Branding."
- showPrices: false
- ownerId: null
- Hero-Image:
  - url: `/images/locations/kesselhaus_titel.jpg`
  - placeholderGradient: `linear-gradient(135deg, #1a2228 0%, #0a0e12 100%)`
  - alt: "Titelbild Kesselhaus Kolbermoor"

**Bereiche (Areas) für das Kesselhaus, in dieser Reihenfolge:**

1. **Außenbereich** (slug: `aussenbereich`)
   - Beschreibung: "Der Vorplatz und die Außenflächen des Kesselhauses bilden den ersten Eindruck Ihrer Marke — noch vor dem Eintreten."
   - Image:
     - url: `/images/locations/kesselhaus_bereich_aussenbereich.jpg`
     - placeholderGradient: `linear-gradient(135deg, #2a3a36 0%, #0f1614 100%)`
     - alt: "Außenbereich Kesselhaus"

2. **Eingangsbereich** (slug: `eingangsbereich`)
   - Beschreibung: "Die erste Anlaufstelle der Gäste — hier entscheidet sich der erste Eindruck im Innenraum."
   - Image:
     - url: `/images/locations/kesselhaus_bereich_eingangsbereich.jpg`
     - placeholderGradient: `linear-gradient(135deg, #3a3226 0%, #16120c 100%)`
     - alt: "Eingangsbereich Kesselhaus"

3. **Kesselhalle** (slug: `kesselhalle`)
   - Beschreibung: "Der zentrale Eventbereich mit Bühne, Treppenaufgang und sanitärem Übergang — das Herzstück der Location."
   - Image:
     - url: `/images/locations/kesselhaus_bereich_kesselhalle.jpg`
     - placeholderGradient: `linear-gradient(135deg, #2a3440 0%, #0f1318 100%)`
     - alt: "Kesselhalle"

**Module pro Bereich:**

*Außenbereich:*
- **Glasfront Außenbereich** (slug: `glasfront`) – **3 Varianten**
  - Variante 1: `/images/locations/kesselhaus_modul_aussenbereich_glasfront_variante-1.jpg`
  - Variante 2: `/images/locations/kesselhaus_modul_aussenbereich_glasfront_variante-2.jpg`
  - Variante 3: `/images/locations/kesselhaus_modul_aussenbereich_glasfront_variante-3.jpg`
  - Placeholder-Gradients für die Varianten (reihenfolgemäßig):
    - `linear-gradient(135deg, #2a3a36 0%, #0f1614 100%)`
    - `linear-gradient(135deg, #3a3226 0%, #16120c 100%)`
    - `linear-gradient(135deg, #2a3440 0%, #0f1318 100%)`

*Eingangsbereich:*
- **Eingangstür** (slug: `eingangstuer`) – 1 Variante
  - Bild: `/images/locations/kesselhaus_modul_eingangsbereich_eingangstuer.jpg`
- **Schaukasten Eingang** (slug: `schaukasten`) – 1 Variante
  - Bild: `/images/locations/kesselhaus_modul_eingangsbereich_schaukasten.jpg`

*Kesselhalle:*
- **Glastür Kessel** (slug: `glastuer-kessel`) – 1 Variante
  - Bild: `/images/locations/kesselhaus_modul_kesselhalle_glastuer-kessel.jpg`
- **Glastür Toiletten** (slug: `glastuer-toiletten`) – 1 Variante
  - Bild: `/images/locations/kesselhaus_modul_kesselhalle_glastuer-toiletten.jpg`
- **Treppe** (slug: `treppe`) – 1 Variante
  - Bild: `/images/locations/kesselhaus_modul_kesselhalle_treppe.jpg`

Jedes Modul hat folgende Spezifikationen als Default:
- Material: "Folie"
- Montage: "rückstandsfrei"
- Maße: "nach Vermessung"

Die `longDescription` jedes Moduls ist generisch: "Dieses Branding-Modul integriert sich nahtlos in die Architektur des Bereichs und setzt Ihre Marke wirkungsvoll in Szene. Material, Maße und Montage sind auf den konkreten Bereich abgestimmt und werden im Vorfeld gemeinsam festgelegt."

---

## Routing & Seiten

Verwende React Router mit folgenden Routen:

- `/` – Redirect zu `/l/kesselhaus-kolbermoor` (im MVP gibt es nur eine Location)
- `/l/:slug` – Location-Startseite
- `/l/:slug/bereich/:areaId` – Bereichsansicht
- `/l/:slug/warenkorb` – Anfragekorb
- `/l/:slug/anfrage` – Anfrageformular
- `/l/:slug/anfrage/erfolg` – Bestätigungsseite

Ein Modul-Detail wird **nicht** als eigene Route realisiert, sondern als **Slide-In-Panel** (von rechts) über der aktuellen Seite.

---

## Seiten im Detail

### 1. Globaler Layout-Rahmen (auf allen Unterseiten)

**Top-Nav (sticky):**
- Links: Logo "VENU•GRID" (das "•" ist ein kleiner cyanfarbener Punkt, `#1fb3da`) + Location-Name in kleinerer, grauer Schrift rechts daneben
- Rechts: Button "Anfragekorb" mit cyanfarbener Badge für die Anzahl der enthaltenen Module
- Hintergrund: `rgba(10, 10, 10, 0.92)` mit `backdrop-filter: blur(12px)`
- Border-Bottom: Hairline

### 2. Location-Startseite (`/l/:slug`)

**Hero:**
- Höhe ca. 340px
- Titelbild als Hintergrund (Datei: `kesselhaus_titel.jpg`), mit dunklem Overlay für Lesbarkeit
- Leichter radialer Cyan-Schimmer oben rechts: `radial-gradient(ellipse at 70% 30%, rgba(31, 179, 218, 0.08) 0%, transparent 60%)`
- Unten links über dem Bild:
  - Eyebrow mit horizontalem Strich davor: "Event Location"
  - H1: "Kesselhaus *Kolbermoor*" (das "Kolbermoor" kursiv in Cyan)
  - Kurze Beschreibung darunter (max 460px breit)

**Sektion "Bereiche":**
- Padding oben 56px
- Eyebrow: "Bereiche" (mit Strich davor, Cyan, Uppercase, Letterspacing 3px)
- H2: Groß, Gewicht 300, ein Teil kursiv: "Drei Bereiche, *eine Bühne* für Ihre Marke"
- Kurzer Intro-Text darunter
- Grid mit Bereichs-Kacheln: `repeat(auto-fit, minmax(190px, 1fr))` mit 1px Hairline-Grid als Trenner
- Jede Kachel:
  - Bild-Bereich 180px hoch (Datei: z.B. `kesselhaus_bereich_aussenbereich.jpg`) – das Bild wird im `object-fit: cover`-Stil dargestellt
  - Oben links Nummer "01", "02", "03" in Cyan als Overlay auf dem Bild
  - Unten: Titel + Kurzbeschreibung + Pfeil "→" rechts
  - Hover: Hintergrund wird minimal heller, Pfeil wandert nach rechts und wird cyan

### 3. Bereichsansicht (`/l/:slug/bereich/:areaId`)

- Breadcrumb oben: "Kesselhaus / Außenbereich" (Uppercase, Letterspacing, aktuell in Weiß, Hover-Links in Cyan)
- Sektion mit Eyebrow "Bereich 01", H2 mit kursivem Teil (z.B. "Außen*bereich*"), Intro-Text
- Modul-Grid darunter: `repeat(auto-fit, minmax(200px, 1fr))` mit Hairline-Grid
- Jede Modul-Kachel:
  - Bild 140px hoch (Datei: z.B. `kesselhaus_modul_aussenbereich_glasfront_variante-1.jpg` für die Vorschau des Glasfront-Moduls – bei Varianten wird immer Variante 1 als Vorschaubild verwendet)
  - **Wenn Modul mehrere Varianten hat:** oben rechts Cyan-Badge "3 Varianten" (anpassbar je nach Anzahl)
  - Titel + "Einzelmodul" oder "3 Varianten verfügbar" als Sub

Klick auf eine Modul-Kachel öffnet das Detail-Panel.

### 4. Modul-Detail-Panel (Slide-In von rechts)

- Überlagert die aktuelle Seite mit einem halbtransparenten schwarzen Overlay (`rgba(0, 0, 0, 0.75)` mit Blur)
- Panel-Breite: 78% der Viewport-Breite, maximal 720px auf Desktop
- Schließbar durch: X-Button (als runder Button mit Border), Klick auf Overlay, oder Escape-Taste

**Panel-Header:**
- Eyebrow: "Bereich 01 · Außenbereich" in Cyan, Uppercase
- H3: Modulname, Gewicht 300
- Rechts oben: runder Schließen-Button (30x30px, 0.5px Hairline-Border, Hover in Cyan)

**Panel-Body:**
- Hauptbild oben (240px hoch, zeigt die Variante in `object-fit: cover`)
  - **Wenn Varianten existieren:** oben links cyanfarbene Badge mit transparentem dunklem Hintergrund und Cyan-Border: "VARIANTE 1" (wechselt bei Varianten-Wechsel)
- **Wenn Varianten existieren (>1):** Varianten-Auswahl direkt unter dem Hauptbild:
  - Kleines Label-Zeile: links "Varianten" (grau), rechts "Variante 1" (Cyan, wechselt)
  - Darunter Grid mit 3 Spalten (oder so viele Varianten wie vorhanden), jede Variante ist ein 76px hohes Kachel-Thumbnail mit dem Variantenbild als Vorschau
  - Aktive Variante hat einen 1.5px Cyan-Border
  - Klick wechselt aktive Variante UND tauscht das Hauptbild durch das entsprechende Variantenbild
- Beschreibungstext (longDescription)
- Specs als 3-Spalten-Grid mit horizontalen Hairline-Trennern oben/unten:
  - "MATERIAL" (Label) + Wert, "MONTAGE" + Wert, "MASSE" + Wert
- Großer CTA-Button: Cyan-Hintergrund, schwarzer Text, Großbuchstaben, mit "+" rechts am Ende
  - Text: "Zur Anfrage hinzufügen" → bei Klick kurz "✓ Hinzugefügt" (1,4 Sekunden) → dann "Erneut hinzufügen"
  - "Hinzugefügt"-Zustand: dunkler Hintergrund mit Cyan-Text und Cyan-Border

**Warenkorb-Logik:**
- Bei "Zur Anfrage hinzufügen" wird ein Eintrag zum Warenkorb (React Context + localStorage) hinzugefügt
- Wenn das Modul Varianten hat, wird die aktuell ausgewählte Variante mitgespeichert
- Badge oben rechts im Nav-Bar aktualisiert sich sofort
- Der Warenkorb wird pro Location-Slug in `localStorage` persistiert (Key: `venugrid_cart_${slug}`)

### 5. Anfragekorb (`/l/:slug/warenkorb`)

- Breadcrumb: "Kesselhaus / Anfragekorb"
- Eyebrow "Anfrage", H2 "Ihr *Anfragekorb*"
- Liste der gewählten Module:
  - Jede Zeile: kleines Thumbnail (68x68px, zeigt das Variantenbild bzw. das Modulbild), Modulname, Bereichsname (als Uppercase-Meta darunter), Variante (wenn vorhanden) als Cyan-Chip mit 0.5px Cyan-Border, "Entfernen"-Button rechts (grau, Hover Rot)
  - Hairline-Trenner zwischen Zeilen
- **Wenn leer:** Freundliche Leerzustands-Meldung mit Cyan-Link "Zurück zur Location"
- Wenn gefüllt: großer Cyan-CTA "Anfrage stellen →" unten

### 6. Anfrageformular (`/l/:slug/anfrage`)

- Breadcrumb: "Anfragekorb / Anfrage senden"
- Eyebrow "Kontakt", H2 "Ihre *Anfrage*"
- Kurzer Intro-Text
- Formularfelder im Celonis-Stil mit **underline-Inputs** (transparente Inputs mit Hairline-Border-Bottom, die bei Focus Cyan wird):
  - Name (Pflicht)
  - E-Mail (Pflicht, mit Validierung)
  - Firma (Pflicht)
  - Eventdatum (optional, Datepicker)
  - Nachricht (Pflicht, textarea)
- Labels in Uppercase/Letterspacing/grau, klein
- Submit-Button: Cyan-CTA "Anfrage senden →"
- Bei Submit: `requestService.submit()` aufrufen, bei Erfolg zur Erfolgsseite navigieren und Warenkorb leeren

### 7. Bestätigungsseite (`/l/:slug/anfrage/erfolg`)

- Zentriert, viel Weißraum
- Cyan-Haken in einem cyanfarbenen Kreis (54x54px, 1.5px Border)
- H2: "Vielen Dank"
- Kurzer Text: "Wir haben Ihre Anfrage erhalten und melden uns innerhalb weniger Werktage persönlich bei Ihnen."
- Button "Zurück zur Location" (outline, Hover Cyan)

---

## Projektstruktur

```
public/
└── images/
    └── locations/         // Bilder werden hier manuell hinterlegt
        ├── kesselhaus_titel.jpg
        ├── kesselhaus_bereich_aussenbereich.jpg
        ├── kesselhaus_bereich_eingangsbereich.jpg
        ├── kesselhaus_bereich_kesselhalle.jpg
        ├── kesselhaus_modul_aussenbereich_glasfront_variante-1.jpg
        ├── kesselhaus_modul_aussenbereich_glasfront_variante-2.jpg
        ├── kesselhaus_modul_aussenbereich_glasfront_variante-3.jpg
        ├── kesselhaus_modul_eingangsbereich_eingangstuer.jpg
        ├── kesselhaus_modul_eingangsbereich_schaukasten.jpg
        ├── kesselhaus_modul_kesselhalle_glastuer-kessel.jpg
        ├── kesselhaus_modul_kesselhalle_glastuer-toiletten.jpg
        └── kesselhaus_modul_kesselhalle_treppe.jpg

src/
├── main.tsx
├── App.tsx
├── router.tsx
├── types/
│   └── index.ts           // alle TypeScript-Interfaces
├── data/
│   └── mockData.ts        // Seed-Daten (Locations, Areas, Modules)
├── services/
│   ├── locationService.ts
│   ├── areaService.ts
│   ├── moduleService.ts
│   └── requestService.ts
├── context/
│   └── CartContext.tsx    // Warenkorb-State mit localStorage-Persistenz
├── components/
│   ├── layout/
│   │   ├── TopNav.tsx
│   │   └── Breadcrumb.tsx
│   ├── location/
│   │   ├── HeroSection.tsx
│   │   └── AreaCard.tsx
│   ├── module/
│   │   ├── ModuleCard.tsx
│   │   ├── ModuleDetailPanel.tsx
│   │   └── VariantSelector.tsx
│   ├── cart/
│   │   └── CartItem.tsx
│   └── ui/
│       ├── PlaceholderImage.tsx   // Image mit Fallback-Gradient (siehe Sektion Image-Handling)
│       ├── Eyebrow.tsx             // Eyebrow-Label mit Strich
│       ├── CyanButton.tsx
│       └── OutlineButton.tsx
├── pages/
│   ├── LocationHomePage.tsx
│   ├── AreaPage.tsx
│   ├── CartPage.tsx
│   ├── RequestFormPage.tsx
│   └── RequestSuccessPage.tsx
└── styles/
    └── index.css          // Tailwind + CSS-Variablen für die Akzentfarbe
```

---

## Qualitätsanspruch & Abschließende Hinweise

- **Die visuelle Richtung Celonis ist bindend** – nicht nur für diesen Prototyp, sondern auch für alle späteren Änderungen. Orientiere dich immer an https://www.celonis.com/de.
- **Mobile-First-Design** – viele Eventplaner schauen unterwegs auf dem Handy. Alle Layouts müssen auf Mobile funktionieren.
- **Barrierefreiheit:** alle interaktiven Elemente sind per Tastatur erreichbar, das Detail-Panel schließt mit Escape, Focus-Ringe sind sichtbar (aber dezent).
- **Sentence Case** in der gesamten UI – keine willkürliche Title Case.
- **Keine Emojis in der UI** (nur in diesem Prompt zur Erklärung).

### README

Erstelle eine `README.md` mit:
- Kurzer Projektbeschreibung (2–3 Sätze)
- Setup-Anleitung (`npm install`, `npm run dev`)
- Struktur der Anwendung
- **Sektion "Bilder hinzufügen"** – dokumentiert die Namenskonvention, den Zielordner `public/images/locations/` und listet alle aktuell erwarteten Dateinamen auf (kopiert aus der Sektion "Bildnamen-Konvention & Image-Handling")
- **Explizit eine Roadmap-Sektion** mit:
  - Stufe 1 (aktuell): Frontend-Prototyp mit Mock-Daten
  - Stufe 2 (geplant): Backend mit Supabase, Admin-Login und Admin-CRUD-Oberfläche, echter E-Mail-Versand bei Anfragen
  - Stufe 3 (geplant): Location-Inhaber-Rolle mit eigenem Login und eigener Dashboard-Ansicht, inklusive Sicht auf die Anfragen für die jeweilige eigene Location
- Hinweis, dass die Service-Schicht (`src/services/`) gezielt so aufgebaut ist, dass das Backend später ohne Umbau der Komponenten angedockt werden kann

### Bitte vor dem Bauen Rückfragen stellen

**Bevor du mit dem Bauen beginnst:** Stelle mir alle Verständnisfragen, die du hast. Insbesondere zu:
- Welche React-Router-Version konkret (v6.x empfohlen)?
- Welche Tailwind-Version und welche Dark-Mode-Konfiguration?
- Ob du bereits Platzhalter-Bilder generieren und in den Ordner legen sollst oder ob der `PlaceholderImage`-Fallback genügt, bis der Auftraggeber die echten Bilder hochlädt.

Frage lieber einmal zu viel als einmal zu wenig.
