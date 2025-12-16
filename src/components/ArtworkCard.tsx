import type { ReactNode } from "react";
import type { Artwork } from "../schemas/artwork.schema";
import { X } from "lucide-react";

type Props = {
  artwork: Artwork;
  actions?: ReactNode;
  imgWidth?: number; // IIIF width (400 für Cards)
  onDelete?: (id: number) => void;
};

function getIiifImageUrl(imageId: string, width: number) {
  // AIC IIIF pattern: /full/{width},/0/default.jpg
  return `https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg`;
}

//----------------------------------------------------------------------------
// function: ArtworkCard -----------------------------------------------------
//----------------------------------------------------------------------------
export function ArtworkCard({
  artwork,
  actions,
  imgWidth = 400,
  onDelete,
}: Props) {
  const hasImage = Boolean(artwork.image_id);
  const imageUrl = hasImage
    ? getIiifImageUrl(artwork.image_id as string, imgWidth)
    : null;

  const artworkPageUrl = `https://www.artic.edu/artworks/${artwork.id}`;

  return (
    <article className="group overflow-hidden rounded-[1.35rem] border border-base-300/30 bg-base-100/50 shadow-lg backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <figure className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-base-200 via-base-200 to-base-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-full border border-base-300/40 bg-base-100/60 px-4 py-2 text-sm opacity-70 backdrop-blur">
              No image
            </div>
          </div>
        )}

        {/* overlay for "museum label" vibe */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/0 to-base-100/0 opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="badge badge-ghost border border-base-300/40 bg-base-100/60 backdrop-blur">
              AIC #{artwork.id}
            </span>

            {hasImage && (
              <span className="badge badge-outline bg-base-100/40 backdrop-blur">
                IIIF
              </span>
            )}
          </div>

          {onDelete && (
            <button
              type="button"
              aria-label="Remove artwork"
              title="Remove"
              onClick={() => onDelete(artwork.id)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-base-300/40 bg-base-100/55 text-sm font-bold leading-none text-base-content/70 backdrop-blur transition hover:bg-base-100/70 hover:text-base-content hover:border-base-300/60 active:bg-base-100/80"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </figure>

      <div className="p-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-snug">{artwork.title}</h3>
          <p className="mt-1 text-sm opacity-70">{artwork.artist_title}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <a
            className="btn btn-ghost btn-xs rounded-full"
            href={artworkPageUrl}
            target="_blank"
            rel="noreferrer"
            title="Open on Art Institute of Chicago"
          >
            Open
          </a>

          {actions ? (
            <div className="flex items-center gap-2">{actions}</div>
          ) : (
            <span />
          )}
        </div>
      </div>
    </article>
  );
}
