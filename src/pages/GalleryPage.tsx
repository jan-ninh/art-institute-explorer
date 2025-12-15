import { Gallery } from "../components/Gallery";
import type { Artwork } from "../schemas/artwork.schema";

export function GalleryPage() {
  const artworks: Artwork[] = []; // FR008/FR009 füllen wir gleich über localStorage
  return <Gallery artworks={artworks} title="My Gallery" />;
}
