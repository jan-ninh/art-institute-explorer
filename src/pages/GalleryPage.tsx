import { useState } from "react";
import { Gallery } from "../components/Gallery";
import {
  getGallery,
  removeFromGallery,
  updateGalleryNote,
  type GalleryArtwork,
} from "../storage/galleryStorage";

export function GalleryPage() {
  const [artworks, setArtworks] = useState<GalleryArtwork[]>(() => getGallery());

  function handleDelete(id: number) {
    const next = removeFromGallery(id);
    setArtworks(next);
  }

  function handleSaveNote(id: number, note: string) {
    setArtworks(updateGalleryNote(id, note));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Gallery</h2>
          <p className="text-sm opacity-70">Saved artworks</p>
        </div>
        <div className="badge badge-outline">Favorites</div>
      </div>

      <Gallery
        artworks={artworks}
        title="My Gallery"
        onDelete={handleDelete}
        onSaveNote={handleSaveNote}
      />
    </div>
  );
}
