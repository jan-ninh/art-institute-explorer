import { z } from "zod";
import { ArtworkSchema } from "../schemas/artwork.schema";
import type { Artwork } from "../schemas/artwork.schema";

const STORAGE_KEY = "aic-gallery-v1";

const GallerySchema = z.array(ArtworkSchema);

export function getGallery(): Artwork[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const json: unknown = JSON.parse(raw);
    const parsed = GallerySchema.safeParse(json);
    if (!parsed.success) return [];
    return parsed.data;
  } catch {
    return [];
  }
}

export function setGallery(items: Artwork[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToGallery(artwork: Artwork): Artwork[] {
  const current = getGallery();

  // Duplikate vermeiden
  if (current.some((a) => a.id === artwork.id)) return current;

  const next = [artwork, ...current];
  setGallery(next);
  return next;
}
