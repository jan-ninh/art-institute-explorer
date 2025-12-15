import type { Artwork } from "../schemas/artwork.schema";
import { ArtworkCard } from "./ArtworkCard";

type Props = {
  artworks: Artwork[];
  title?: string;
};

export function Gallery({ artworks, title = "My Gallery" }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="badge badge-neutral">{artworks.length}</span>
        </div>
        <span className="text-xs opacity-60">Saved artworks</span>
      </div>

      {artworks.length === 0 ? (
        <div role="alert" className="alert alert-info">
          <span>No artworks saved yet.</span>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((a) => (
            <li
              key={a.id}
              className="rounded-box transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <ArtworkCard artwork={a} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
