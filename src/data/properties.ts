import {
  FEATURES,
  getFeatureMeta,
  type FeatureKey,
  type FeatureMeta,
  type PropertyFeature,
} from "./features";

export { FEATURES, getFeatureMeta };
export type { FeatureKey, FeatureMeta, PropertyFeature };

export interface PropertyImageMedia {
  type?: "image";
  src: string;
  alt: string;
}

export interface PropertyVideoSource {
  src: string;
  type?: string;
}

export interface PropertyVideoMedia {
  type: "video";
  src: string;
  alt: string;
  poster?: string;
  sources?: PropertyVideoSource[];
}

export type PropertyMedia = PropertyImageMedia | PropertyVideoMedia;

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

export function isVideo(media: PropertyMedia): media is PropertyVideoMedia {
  if ("type" in media && media.type === "video") return true;
  if ("type" in media && media.type) return false;
  const src = "src" in media ? media.src : "";
  return /\.(mp4|m4v|webm|ogv|ogg)([?#].*)?$/i.test(src);
}

export function videoMime(src: string): string | undefined {
  const clean = src.split(/[?#]/)[0];
  const ext = clean.includes(".") ? clean.split(".").pop()!.toLowerCase() : "";
  switch (ext) {
    case "mp4":
    case "m4v":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "ogv":
    case "ogg":
      return "video/ogg";
    default:
      return undefined;
  }
}

export function getVideoSources(item: PropertyVideoMedia): PropertyVideoSource[] {
  const primary: PropertyVideoSource = { src: item.src, type: videoMime(item.src) };
  return [primary, ...(item.sources ?? [])];
}

export function getFirstImage(property: Property): PropertyImageMedia | null {
  const image = property.media.find(
    (item): item is PropertyImageMedia => !isVideo(item)
  );
  if (image) return image;
  const video = property.media.find(
    (item): item is PropertyVideoMedia => isVideo(item) && Boolean(item.poster)
  );
  if (video) return { src: video.poster!, alt: video.alt };
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
