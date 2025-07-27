
export interface UpdateUserGameDto {
  gameId: number;
  gameName: string;
  gameImage: string;
  status: 'playing' | 'beaten' | 'completed' | 'abandoned';
}
