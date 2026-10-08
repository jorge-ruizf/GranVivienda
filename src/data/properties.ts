import {
  FEATURES,
  getFeatureMeta,
  type FeatureKey,
  type FeatureMeta,
  type PropertyFeature,
} from "./features";

export { FEATURES, getFeatureMeta };
export type { FeatureKey, FeatureMeta, PropertyFeature };

import {
  getYoutubeThumb,
  parseYoutubeId,
  type YoutubeOrientation,
} from "./youtube";

export interface PropertyImageMedia {
  type?: "image";
  src: string;
  alt: string;
}

export interface PropertyYoutubeMedia {
  type: "youtube";
  url: string;
  alt: string;
  orientation?: YoutubeOrientation;
}

export type PropertyMedia = PropertyImageMedia | PropertyYoutubeMedia;

export interface Property {
  id: string;
  slug: string;
  title: string;
  operation: "rent" | "sale";
  propertyType: "apartment" | "house" | "studio" | "penthouse";
  price: number;
  currency: "COP";
  location: {
    city: string;
    neighborhood: string;
  };
  description: string[];
  features: PropertyFeature[];
  media: PropertyMedia[];
  featured: boolean;
}

export interface VisibleFeature {
  key: FeatureKey;
  value: number;
  meta: FeatureMeta;
}

export function isYoutube(media: PropertyMedia): media is PropertyYoutubeMedia {
  return "type" in media && media.type === "youtube";
}

export function getYoutubeId(media: PropertyYoutubeMedia): string | null {
  return parseYoutubeId(media.url);
}

export function getFirstImage(property: Property): PropertyImageMedia | null {
  const image = property.media.find(
    (item): item is PropertyImageMedia => !isYoutube(item)
  );
  if (image) return image;
  const youtube = property.media.find(
    (item): item is PropertyYoutubeMedia =>
      isYoutube(item) && parseYoutubeId(item.url) !== null
  );
  if (youtube) {
    const id = parseYoutubeId(youtube.url)!;
    return { src: getYoutubeThumb(id), alt: youtube.alt };
  }
  return null;
}

export function getVisibleFeatures(
  property: Property,
  options?: { card?: boolean }
): VisibleFeature[] {
  const result: VisibleFeature[] = [];
  for (const feature of property.features ?? []) {
    const meta = getFeatureMeta(feature.key);
    if (!meta) continue;
    if (typeof feature.value !== "number" || !Number.isFinite(feature.value)) continue;
    if (feature.value === 0) continue;
    if (options?.card && !meta.showOnCard) continue;
    result.push({ key: feature.key, value: feature.value, meta });
  }
  result.sort((a, b) => a.meta.order - b.meta.order);
  return options?.card ? result.slice(0, 3) : result;
}

const propertyFiles: Record<string, { default: Property }> = import.meta.glob(
  "./properties/*.json",
  { eager: true }
);

const properties: Property[] = Object.values(propertyFiles).map(
  (mod) => mod.default
);

export function getAllProperties(): Property[] {
  return properties;
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertiesByOperation(
  operation: "rent" | "sale"
): Property[] {
  return properties.filter((p) => p.operation === operation);
}

export function getPropertiesByType(
  propertyType: Property["propertyType"]
): Property[] {
  return properties.filter((p) => p.propertyType === propertyType);
}
