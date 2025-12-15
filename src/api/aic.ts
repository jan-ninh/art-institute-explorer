import { z } from "zod";
import { ArtworkSchema, type Artwork } from "../schemas/artwork.schema";

const AIC_SEARCH_URL = "https://api.artic.edu/api/v1/artworks/search";

const AicSearchResponseSchema = z.object({
  // NOTE: Response Felder sind mindestens #data und #pagination (top-level-fields)
  // NOTE: Schema nur auf data anwenden
  data: z.array(ArtworkSchema),
  config: z.object({ iiif_url: z.string() }).optional(),
});

//-----------------------------------------------------------------------
// function: searchArtworks ---------------------------------------------
//-----------------------------------------------------------------------
export async function searchArtworks(
  query: string,
  limit = 24
): Promise<Artwork[]> {
  const url =
    AIC_SEARCH_URL +
    "?" +
    new URLSearchParams({
      q: query,
      fields: "id,title,artist_title,image_id",
      limit: String(limit),
    });

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`AIC request failed (${res.status})`);
  }

  const json: unknown = await res.json();

  const parsed = AicSearchResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Invalid API data (failed Zod validation)");
  }

  // NOTE: 1st data: Zod
  // NOTE: 2nd data: API Field
  return parsed.data.data;
}
