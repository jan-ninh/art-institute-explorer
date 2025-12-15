import type { Artwork } from "../schemas/artwork.schema";
import { ArtworkCard } from "./ArtworkCard";

type Props = {
  artworks: Artwork[];
  title?: string;
};

export function Gallery({ artworks, title = "My Gallery" }: Props) {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="badge badge-neutral">{artworks.length}</span>
      </div>

      {artworks.length === 0 ? (
        <div role="alert" className="alert alert-info">
          <span>No artworks saved yet.</span>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((a) => (
            <li key={a.id} className="rounded-box">
              <ArtworkCard artwork={a} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
