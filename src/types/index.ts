// ---------- User ----------
export type UserRole = 'admin' | 'location_owner' | 'customer';

export interface User {
  id: string; // UUID
  email: string;
  name: string;
  role: UserRole;
  createdAt: string; // ISO timestamp
}

// ---------- Image ----------
export interface ImageAsset {
  id: string;
  url: string; // relative path, e.g. "/images/locations/kesselhaus_titel.jpg"
  placeholderGradient: string; // CSS gradient string as fallback on load error
  alt: string;
}

// ---------- Location ----------
export interface Location {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImage: ImageAsset;
  ownerId: string | null; // Reference to a User with role = 'location_owner' (null for now)
  showPrices: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------- Area ----------
export interface Area {
  id: string;
  locationId: string; // FK
  parentAreaId: string | null; // enables sub-areas in later stages
  slug: string;
  name: string;
  description: string;
  image: ImageAsset;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ---------- Module ----------
export interface ModuleSpec {
  label: string;
  value: string;
}

export interface ModuleVariant {
  id: string;
  name: string;
  images: ImageAsset[];
  sortOrder: number;
}

export interface Module {
  id: string;
  areaId: string; // FK
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  specifications: ModuleSpec[];
  price: number | null;
  variants: ModuleVariant[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ---------- Request ----------
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
  eventDate: string | null; // ISO date
  message: string;
  items: RequestItem[];
}

export interface Request extends RequestSubmission {
  id: string;
  status: 'new' | 'in_progress' | 'closed';
  createdAt: string;
}
