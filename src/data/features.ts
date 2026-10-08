export interface FeatureMeta {
  label: string;
  labelSingular?: string;
  shortLabel?: string;
  shortSingular?: string;
  unit?: string;
  icon: string;
  order: number;
  display: "count" | "flag" | "number";
  showOnCard?: boolean;
}

export const FEATURES = {
  bedrooms: {
    label: "Habitaciones",
    labelSingular: "Habitación",
    shortLabel: "Habs.",
    shortSingular: "Hab.",
    icon: '<path d="M3 22V8l9-6 9 6v14"/><path d="M9 22V12h6v10"/>',
    order: 10,
    display: "count",
    showOnCard: true,
  },
  bathrooms: {
    label: "Baños",
    labelSingular: "Baño",
    shortLabel: "Baños",
    shortSingular: "Baño",
    icon:
      '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><path d="m2 21 8-9"/><path d="M20 21 8 11"/>',
    order: 20,
    display: "count",
    showOnCard: true,
  },
  area: {
    label: "Área",
    unit: "m²",
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/>',
    order: 30,
    display: "number",
    showOnCard: true,
  },
  parkingSpaces: {
    label: "Parqueaderos",
    labelSingular: "Parqueadero",
    shortLabel: "Parq.",
    shortSingular: "Parq.",
    icon:
      '<path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
    order: 40,
    display: "count",
  },
  balconies: {
    label: "Balcones",
    labelSingular: "Balcón",
    shortLabel: "Balc.",
    shortSingular: "Balc.",
    icon:
      '<path d="M4 21h16"/><path d="M6 21v-9"/><path d="M18 21v-9"/><path d="M3 12h18"/><path d="M10 12v9"/><path d="M14 12v9"/><path d="M7 8V3h10v5"/>',
    order: 50,
    display: "count",
  },
  floors: {
    label: "Pisos",
    labelSingular: "Piso",
    shortLabel: "Pisos",
    shortSingular: "Piso",
    icon: '<path d="M4 20h4v-4h4v-4h4V8h4"/>',
    order: 60,
    display: "count",
  },
  strata: {
    label: "Estrato",
    shortLabel: "Estrato",
    icon: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    order: 70,
    display: "number",
  },
  yearBuilt: {
    label: "Año de construcción",
    shortLabel: "Año",
    icon:
      '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    order: 80,
    display: "number",
  },
  terrace: {
    label: "Terraza",
    shortLabel: "Terraza",
    icon:
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/>',
    order: 90,
    display: "flag",
  },
  garden: {
    label: "Jardín",
    shortLabel: "Jardín",
    icon:
      '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    order: 100,
    display: "flag",
  },
  pool: {
    label: "Piscina",
    shortLabel: "Piscina",
    icon:
      '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M7 21c1.5 0 2.3-1 2.5-1.5"/>',
    order: 110,
    display: "flag",
  },
  gym: {
    label: "Gimnasio",
    shortLabel: "Gimnasio",
    icon:
      '<path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="M2 6l4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>',
    order: 120,
    display: "flag",
  },
  elevator: {
    label: "Ascensor",
    shortLabel: "Ascensor",
    icon:
      '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 12h16"/><path d="m8.5 7 1.5-2 1.5 2"/><path d="m12.5 15 1.5 2 1.5-2"/>',
    order: 130,
    display: "flag",
  },
  security: {
    label: "Seguridad 24 horas",
    shortLabel: "Seguridad",
    icon:
      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    order: 140,
    display: "flag",
  },
  reception: {
    label: "Portería",
    shortLabel: "Portería",
    icon:
      '<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>',
    order: 150,
    display: "flag",
  },
  gas: {
    label: "Gas natural",
    shortLabel: "Gas",
    icon:
      '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    order: 160,
    display: "flag",
  },
  internet: {
    label: "Fibra óptica",
    shortLabel: "Internet",
    icon:
      '<path d="M12 20h.01"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/>',
    order: 170,
    display: "flag",
  },
  furnished: {
    label: "Amoblado",
    shortLabel: "Amoblado",
    icon:
      '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2"/><path d="M20 18v2"/>',
    order: 180,
    display: "flag",
  },
  petsAllowed: {
    label: "Admite mascotas",
    shortLabel: "Mascotas",
    icon:
      '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    order: 190,
    display: "flag",
  },
  laundry: {
    label: "Zona de lavandería",
    shortLabel: "Lavandería",
    icon:
      '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M4 10h16"/><circle cx="12" cy="16" r="3"/><path d="M8 6h.01"/><path d="M11 6h.01"/>',
    order: 200,
    display: "flag",
  },
  storage: {
    label: "Depósito",
    shortLabel: "Depósito",
    icon:
      '<rect x="2" y="4" width="20" height="5" rx="1"/><path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/>',
    order: 210,
    display: "flag",
  },
  bbq: {
    label: "Zona de BBQ",
    shortLabel: "BBQ",
    icon:
      '<path d="M12 4v3"/><path d="M4 10h16"/><path d="M6 10l1.2 6h9.6L18 10"/><path d="M7 20h10"/><path d="M9 16v4"/><path d="M15 16v4"/>',
    order: 220,
    display: "flag",
  },
  jacuzzi: {
    label: "Jacuzzi",
    shortLabel: "Jacuzzi",
    icon:
      '<circle cx="7" cy="8" r="2.5"/><circle cx="15" cy="5.5" r="1.8"/><circle cx="17" cy="11" r="2.2"/><path d="M2 18c1.4 0 2.1-1 3.5-1s2.1 1 3.5 1 2.1-1 3.5-1 2.1 1 3.5 1 2.1-1 3.5-1"/>',
    order: 230,
    display: "flag",
  },
  workSpace: {
    label: "Espacio de trabajo",
    shortLabel: "Escritorio",
    icon: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    order: 240,
    display: "flag",
  },
  adminIncluded: {
    label: "Administración incluida",
    shortLabel: "Admón.",
    icon:
      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5"/><path d="M8 13h8"/><path d="M8 17h5"/>',
    order: 250,
    display: "flag",
  },
} as const satisfies Record<string, FeatureMeta>;

export type FeatureKey = keyof typeof FEATURES;

export interface PropertyFeature {
  key: FeatureKey;
  value: number;
}

export function getFeatureMeta(key: string): FeatureMeta | undefined {
  return (FEATURES as Record<string, FeatureMeta>)[key];
}

export function formatFeatureValue(meta: FeatureMeta, value: number): string {
  return meta.unit ? `${value} ${meta.unit}` : String(value);
}

export function formatFeatureSpecValue(meta: FeatureMeta, value: number): string {
  if (meta.display === "flag") return "Sí";
  return formatFeatureValue(meta, value);
}

export function formatFeatureCardLabel(meta: FeatureMeta, value: number): string {
  if (meta.display === "flag") return meta.shortLabel ?? meta.label;
  if (meta.unit) return meta.unit;
  if (value === 1) return meta.shortSingular ?? meta.shortLabel ?? meta.label;
  return meta.shortLabel ?? meta.label;
}
