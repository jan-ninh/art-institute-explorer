import { z } from "zod";
import { ArtworkSchema, type Artwork } from "../schemas/artwork.schema.ts";

const STORAGE_KEY = "aic-gallery-v1";
// Gallery entries extend the API model without changing the API schema.
// Missing or malformed notes must not invalidate existing saved artworks.
const GalleryArtworkSchema = ArtworkSchema.extend({
  note: z.string().catch(""),
});
export type GalleryArtwork = z.infer<typeof GalleryArtworkSchema>;
const GallerySchema = z.array(GalleryArtworkSchema);

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getGallery(): GalleryArtwork[] {
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

export function setGallery(items: GalleryArtwork[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToGallery(artwork: Artwork): GalleryArtwork[] {
  const current = getGallery();

  // Duplikate vermeiden
  if (current.some((a) => a.id === artwork.id)) return current;

  const next = [{ ...artwork, note: "" }, ...current];
  setGallery(next);
  return next;
}

export function removeFromGallery(id: number): GalleryArtwork[] {
  const current = getGallery();
  const next = current.filter((a) => a.id !== id);
  setGallery(next);
  return next;
}

export function updateGalleryNote(id: number, note: string): GalleryArtwork[] {
  const current = getGallery();
  if (!current.some((artwork) => artwork.id === id)) {
    throw new Error("This artwork is no longer in your gallery.");
  }

  const next = current.map((artwork) =>
    artwork.id === id ? { ...artwork, note: note.trim() } : artwork
  );
  setGallery(next);
  return next;
}
