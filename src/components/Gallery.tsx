import { Link } from "react-router";
import type { Artwork } from "../schemas/artwork.schema";
import { ArtworkCard } from "./ArtworkCard";

type Props = {
  artworks: Artwork[];
  title?: string;
};

export function Gallery({ artworks, title = "My Gallery" }: Props) {
  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-base-300/30 bg-base-100/50 p-6 shadow-xl backdrop-blur">
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-outline">Gallery</span>
              <span className="badge badge-neutral">{artworks.length}</span>
            </div>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-base-content via-primary to-secondary bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <p className="mt-2 text-sm opacity-70 sm:text-base">
              Saved works — your living moodboard.
            </p>
          </div>

          <Link to="/" className="btn btn-primary rounded-full">
            Explore more
          </Link>
        </div>
      </div>

      {artworks.length === 0 ? (
        <div className="card border border-base-300/30 bg-base-100/50 shadow-lg backdrop-blur">
          <div className="card-body">
            <h3 className="card-title">No artworks saved yet.</h3>
            <p className="opacity-70">
              Start curating: search something bold and hit “Add”.
            </p>
            <div className="card-actions">
              <Link to="/" className="btn btn-secondary rounded-full">
                Go to Explore
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artworks.map((a) => (
            <li key={a.id}>
              <ArtworkCard artwork={a} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
