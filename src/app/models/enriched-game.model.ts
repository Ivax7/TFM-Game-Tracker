// models/enriched-game.model.ts
export interface EnrichedGame {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  rating: number;
  rating_top: number;
  released: string;
  genres: { name: string }[];
  playtimeMain: number | null;
  playtimeMainExtra: number | null;
  playtimeCompletionist: number | null;
  status: 'playing' | 'beaten' | 'completed' | 'abandoned' | null;
  isInWishlist: boolean;
}
