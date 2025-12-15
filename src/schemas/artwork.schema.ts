import { z } from "zod";

// NOTE FROM DOCS: "We never show any empty strings"  --------> keine leeren Strings ("")
// NOTE FROM DOCS: "We prefer to always show all fields" -----> man muss mit #null rechnen

export const ArtworkSchema = z.object({
  id: z.coerce.number().int().positive(),

  title: z
    .string()
    .nullish()
    .transform((v) => (v && v.trim() ? v : "Untitled")),

  artist_title: z
    .string()
    .nullish()
    .transform((v) => (v && v.trim() ? v : "Unknown artist")),

  image_id: z
    .string()
    .nullish()
    .transform((v) => (v && v.trim() ? v : null)),
});

export type Artwork = z.infer<typeof ArtworkSchema>;
