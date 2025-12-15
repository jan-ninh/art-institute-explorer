import { z } from "zod";

export const ArtworkSchema = z.object({
  // coerce: wandel String in Nummer um (wichtig: auch Boolean (true/false))
  // int: Ganzzahl
  // positive: x > 0
  id: z.coerce.number().int().positive(),

  // nullish:  String || null || undefined
  // transform: falls null/undefined/""/nur Whitespaces → "Untitled"
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
