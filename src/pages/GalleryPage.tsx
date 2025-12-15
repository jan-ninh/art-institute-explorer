import { Gallery } from "../components/Gallery";
import type { Artwork } from "../schemas/artwork.schema";

export function GalleryPage() {
  const artworks: Artwork[] = [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Gallery</h2>
          <p className="text-sm opacity-70">
            Your saved artworks will live here (localStorage is next).
          </p>
        </div>
        <div className="badge badge-outline">Favorites</div>
      </div>

      <Gallery artworks={artworks} title="My Gallery" />
    </div>
  );
}
