import { z } from "zod/v4";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  image_id: z.string(),
  date_display: z.string(),
  artist_display: z.string(),
});

export const ArtworkArraySchema = z.object({
  pagination: z.object(),
  data: z.array(ArtworkSchema),
});

export const ArtworkWrapperSchema = z.object({
  data: z.array(z.unknown()),
});

export type Art = z.infer<typeof ArtworkSchema>;

export type SavedArt = Art & { note?: string };
