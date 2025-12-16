import { useState } from "react";
import { Gallery } from "../components/Gallery";
import type { Artwork } from "../schemas/artwork.schema";
import { getGallery, removeFromGallery } from "../storage/galleryStorage";

export function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>(() => getGallery());

  function handleDelete(id: number) {
    const next = removeFromGallery(id);
    setArtworks(next);
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

      <Gallery artworks={artworks} title="My Gallery" onDelete={handleDelete} />
    </div>
  );
}
