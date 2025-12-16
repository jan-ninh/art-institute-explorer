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
  return `https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg`;
}

const TITLE_CLAMP_2 =
  "overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]";

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

  const title = (artwork.title ?? "").trim() || "Untitled";
  const artist = (artwork.artist_title ?? "").trim() || "Unknown artist";

  const artworkPageUrl = `https://www.artic.edu/artworks/${artwork.id}`;

  return (
    <article className="group overflow-hidden rounded-[1.35rem] border border-base-300/30 bg-base-100/50 shadow-lg backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <figure className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-base-200 via-base-200 to-base-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
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
              className={[
                "btn btn-ghost btn-xs btn-circle",
                "border border-base-300/40 backdrop-blur",
                "bg-base-content/5 text-base-content/70",
                "hover:bg-base-content/10 hover:text-base-content",
                "active:bg-base-content/15",
              ].join(" ")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </figure>

      {/* Gleiche Card-Höhe (Body hat min-h) */}
      <div className="flex min-h-[9rem] flex-col p-4">
        <div className="min-w-0">
          <h3
            className={[
              "mb-1 text-base font-bold leading-snug",
              TITLE_CLAMP_2,
            ].join(" ")}
            title={title}
          >
            {title}
          </h3>

          {/* Artist */}
          <p
            className="min-w-0 truncate text-sm leading-snug opacity-70"
            title={artist}
          >
            {artist}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <a
            className="btn btn-ghost btn-sm rounded-full hover:bg-base-content/10 active:bg-base-content/15"
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
            <span className="h-8 w-0" />
          )}
        </div>
      </div>
    </article>
  );
}
