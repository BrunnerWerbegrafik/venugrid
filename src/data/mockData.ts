import type { Area, ImageAsset, Location, Module } from '../types';

// Shared defaults
const NOW = '2025-04-18T10:00:00.000Z';

const defaultSpecs = [
  { label: 'Material', value: 'Folie' },
  { label: 'Montage', value: 'rückstandsfrei' },
  { label: 'Maße', value: 'nach Vermessung' },
];

const defaultLongDescription =
  'Dieses Branding-Modul integriert sich nahtlos in die Architektur des Bereichs und setzt Ihre Marke wirkungsvoll in Szene. Material, Maße und Montage sind auf den konkreten Bereich abgestimmt und werden im Vorfeld gemeinsam festgelegt.';

// ---------------- Location ----------------
export const kesselhaus: Location = {
  id: '6f2a8b9a-4d11-4a1b-9d2e-1a2b3c4d5e00',
  slug: 'kesselhaus-kolbermoor',
  name: 'Kesselhaus Kolbermoor',
  description:
    'Ein historisches Industriedenkmal mit außergewöhnlichem Charakter — entdecken Sie die Möglichkeiten für Ihr Event-Branding.',
  heroImage: {
    id: 'img-hero-kesselhaus',
    url: '/images/locations/kesselhaus_titel.webp',
    placeholderGradient: 'linear-gradient(135deg, #1a2228 0%, #0a0e12 100%)',
    alt: 'Titelbild Kesselhaus Kolbermoor',
  },
  ownerId: null,
  showPrices: false,
  createdAt: NOW,
  updatedAt: NOW,
};

// ---------------- Areas ----------------
export const areas: Area[] = [
  {
    id: 'a1111111-1111-4111-8111-111111111111',
    locationId: kesselhaus.id,
    parentAreaId: null,
    slug: 'aussenbereich',
    name: 'Außenbereich',
    description:
      'Der Vorplatz und die Außenflächen des Kesselhauses bilden den ersten Eindruck Ihrer Marke — noch vor dem Eintreten.',
    image: {
      id: 'img-area-aussenbereich',
      url: '/images/locations/kesselhaus_bereich_aussenbereich.webp',
      placeholderGradient: 'linear-gradient(135deg, #2a3a36 0%, #0f1614 100%)',
      alt: 'Außenbereich Kesselhaus',
    },
    sortOrder: 1,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'a2222222-2222-4222-8222-222222222222',
    locationId: kesselhaus.id,
    parentAreaId: null,
    slug: 'eingangsbereich',
    name: 'Eingangsbereich',
    description:
      'Die erste Anlaufstelle der Gäste — hier entscheidet sich der erste Eindruck im Innenraum.',
    image: {
      id: 'img-area-eingangsbereich',
      url: '/images/locations/kesselhaus_bereich_eingangsbereich.webp',
      placeholderGradient: 'linear-gradient(135deg, #3a3226 0%, #16120c 100%)',
      alt: 'Eingangsbereich Kesselhaus',
    },
    sortOrder: 2,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'a3333333-3333-4333-8333-333333333333',
    locationId: kesselhaus.id,
    parentAreaId: null,
    slug: 'kesselhalle',
    name: 'Kesselhalle',
    description:
      'Der zentrale Eventbereich mit Bühne, Treppenaufgang und sanitärem Übergang — das Herzstück der Location.',
    image: {
      id: 'img-area-kesselhalle',
      url: '/images/locations/kesselhaus_bereich_kesselhalle.webp',
      placeholderGradient: 'linear-gradient(135deg, #2a3440 0%, #0f1318 100%)',
      alt: 'Kesselhalle',
    },
    sortOrder: 3,
    createdAt: NOW,
    updatedAt: NOW,
  },
];

// ---------------- Modules ----------------
const mkImage = (id: string, url: string, alt: string, gradient: string): ImageAsset => ({
  id,
  url,
  placeholderGradient: gradient,
  alt,
});

const aussen = areas[0];
const eingang = areas[1];
const halle = areas[2];

export const modules: Module[] = [
  // ---- Außenbereich ----
  {
    id: 'm1111111-0001-4000-8000-000000000001',
    areaId: aussen.id,
    slug: 'glasfront',
    name: 'Glasfront Außenbereich',
    shortDescription: 'Großflächige Glasfront als Markenträger zum Vorplatz.',
    longDescription: defaultLongDescription,
    specifications: defaultSpecs,
    price: null,
    sortOrder: 1,
    variants: [
      {
        id: 'v-glasfront-1',
        name: 'Variante 1',
        sortOrder: 1,
        images: [
          mkImage(
            'img-m-glasfront-1',
            '/images/locations/kesselhaus_modul_aussenbereich_glasfront_variante-1.webp',
            'Glasfront Variante 1',
            'linear-gradient(135deg, #2a3a36 0%, #0f1614 100%)'
          ),
        ],
      },
      {
        id: 'v-glasfront-2',
        name: 'Variante 2',
        sortOrder: 2,
        images: [
          mkImage(
            'img-m-glasfront-2',
            '/images/locations/kesselhaus_modul_aussenbereich_glasfront_variante-2.webp',
            'Glasfront Variante 2',
            'linear-gradient(135deg, #3a3226 0%, #16120c 100%)'
          ),
        ],
      },
      {
        id: 'v-glasfront-3',
        name: 'Variante 3',
        sortOrder: 3,
        images: [
          mkImage(
            'img-m-glasfront-3',
            '/images/locations/kesselhaus_modul_aussenbereich_glasfront_variante-3.webp',
            'Glasfront Variante 3',
            'linear-gradient(135deg, #2a3440 0%, #0f1318 100%)'
          ),
        ],
      },
    ],
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ---- Eingangsbereich ----
  {
    id: 'm2222222-0001-4000-8000-000000000002',
    areaId: eingang.id,
    slug: 'eingangstuer',
    name: 'Eingangstür',
    shortDescription: 'Branding direkt am Moment des Eintretens.',
    longDescription: defaultLongDescription,
    specifications: defaultSpecs,
    price: null,
    sortOrder: 1,
    variants: [
      {
        id: 'v-eingangstuer-1',
        name: 'Standard',
        sortOrder: 1,
        images: [
          mkImage(
            'img-m-eingangstuer',
            '/images/locations/kesselhaus_modul_eingangsbereich_eingangstuer.webp',
            'Eingangstür',
            'linear-gradient(135deg, #3a3226 0%, #16120c 100%)'
          ),
        ],
      },
    ],
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'm2222222-0002-4000-8000-000000000003',
    areaId: eingang.id,
    slug: 'schaukasten',
    name: 'Schaukasten Eingang',
    shortDescription: 'Vitrine im Eingangsbereich für gerahmte Markenbotschaften.',
    longDescription: defaultLongDescription,
    specifications: defaultSpecs,
    price: null,
    sortOrder: 2,
    variants: [
      {
        id: 'v-schaukasten-1',
        name: 'Standard',
        sortOrder: 1,
        images: [
          mkImage(
            'img-m-schaukasten',
            '/images/locations/kesselhaus_modul_eingangsbereich_schaukasten.webp',
            'Schaukasten Eingang',
            'linear-gradient(135deg, #2a3a36 0%, #0f1614 100%)'
          ),
        ],
      },
    ],
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ---- Kesselhalle ----
  {
    id: 'm3333333-0001-4000-8000-000000000004',
    areaId: halle.id,
    slug: 'glastuer-kessel',
    name: 'Glastür Kessel',
    shortDescription: 'Sichtachse zum historischen Kessel als Markenfläche.',
    longDescription: defaultLongDescription,
    specifications: defaultSpecs,
    price: null,
    sortOrder: 1,
    variants: [
      {
        id: 'v-glastuer-kessel-1',
        name: 'Standard',
        sortOrder: 1,
        images: [
          mkImage(
            'img-m-glastuer-kessel',
            '/images/locations/kesselhaus_modul_kesselhalle_glastuer-kessel.webp',
            'Glastür Kessel',
            'linear-gradient(135deg, #2a3440 0%, #0f1318 100%)'
          ),
        ],
      },
    ],
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'm3333333-0002-4000-8000-000000000005',
    areaId: halle.id,
    slug: 'glastuer-toiletten',
    name: 'Glastür Toiletten',
    shortDescription: 'Markenflächen am sanitären Übergang.',
    longDescription: defaultLongDescription,
    specifications: defaultSpecs,
    price: null,
    sortOrder: 2,
    variants: [
      {
        id: 'v-glastuer-toiletten-1',
        name: 'Standard',
        sortOrder: 1,
        images: [
          mkImage(
            'img-m-glastuer-toiletten',
            '/images/locations/kesselhaus_modul_kesselhalle_glastuer-toiletten.webp',
            'Glastür Toiletten',
            'linear-gradient(135deg, #2a3a36 0%, #0f1614 100%)'
          ),
        ],
      },
    ],
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 'm3333333-0003-4000-8000-000000000006',
    areaId: halle.id,
    slug: 'treppe',
    name: 'Treppe',
    shortDescription: 'Treppenaufgang als vertikale Markenfläche.',
    longDescription: defaultLongDescription,
    specifications: defaultSpecs,
    price: null,
    sortOrder: 3,
    variants: [
      {
        id: 'v-treppe-1',
        name: 'Standard',
        sortOrder: 1,
        images: [
          mkImage(
            'img-m-treppe',
            '/images/locations/kesselhaus_modul_kesselhalle_treppe.webp',
            'Treppe',
            'linear-gradient(135deg, #3a3226 0%, #16120c 100%)'
          ),
        ],
      },
    ],
    createdAt: NOW,
    updatedAt: NOW,
  },
];

export const locations: Location[] = [kesselhaus];
