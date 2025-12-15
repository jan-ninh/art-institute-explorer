import type { ReactNode } from "react";
import type { Artwork } from "../schemas/artwork.schema";

type Props = {
  artwork: Artwork;
  actions?: ReactNode;
  imgWidth?: number; // IIIF width (400 für Cards)
};

function getIiifImageUrl(imageId: string, width: number) {
  // AIC IIIF pattern: /full/{width},/0/default.jpg :contentReference[oaicite:1]{index=1}
  return `https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg`;
}

//----------------------------------------------------------------------------
// function: ArtworkCard -----------------------------------------------------
//----------------------------------------------------------------------------
export function ArtworkCard({ artwork, actions, imgWidth = 400 }: Props) {
  const hasImage = Boolean(artwork.image_id);
  const imageUrl = hasImage
    ? getIiifImageUrl(artwork.image_id as string, imgWidth)
    : null;

  const artworkPageUrl = `https://www.artic.edu/artworks/${artwork.id}`;

  //-----------------------------------------------------------------------
  // return ---------------------------------------------------------------
  //-----------------------------------------------------------------------
  return (
    <div className="card bg-base-100 shadow">
      <figure className="aspect-[4/3] bg-base-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm opacity-60">
            No image
          </div>
        )}
      </figure>

      <div className="card-body gap-2">
        <div>
          <h3 className="card-title text-base">{artwork.title}</h3>
          <p className="text-sm opacity-70">{artwork.artist_title}</p>
        </div>

        <div className="card-actions items-center justify-between">
          <a
            className="link link-primary text-sm"
            href={artworkPageUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open on AIC
          </a>

          {actions}
        </div>
      </div>
    </div>
  );
}
