import { z } from "zod";
import { ArtworkSchema } from "../schemas/artwork.schema";
import type { Artwork } from "../schemas/artwork.schema";

const STORAGE_KEY = "aic-gallery-v1";
const GallerySchema = z.array(ArtworkSchema);

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getGallery(): Artwork[] {
  if (!isBrowser()) return [];

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
  if (!isBrowser()) return;
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

export function removeFromGallery(id: number): Artwork[] {
  const current = getGallery();
  const next = current.filter((a) => a.id !== id);
  setGallery(next);
  return next;
}
