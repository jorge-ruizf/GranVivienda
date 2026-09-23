export interface PropertyImage {
  src: string;
  alt: string;
}

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
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: PropertyImage[];
  featured: boolean;
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
