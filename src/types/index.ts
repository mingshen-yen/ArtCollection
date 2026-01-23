import { z } from "zod/v4";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  image_id: z.string().nullable(),
  date_display: z.string(),
  artist_display: z.string(),
});

export const ArtworkDetail = z.object({
  data: ArtworkSchema,
});

export const ArtworkArraySchema = z.object({
  data: z.array(ArtworkSchema),
});

export type Art = z.infer<typeof ArtworkSchema>;

export type SavedArt = Art & { note?: string };

export const SearchHitSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const SearchResponseSchema = z.object({
  data: z.array(SearchHitSchema),
});

export type SearchArt = z.infer<typeof SearchHitSchema>;
