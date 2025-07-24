export function normalizeGame(rawGame: any): any {
  return {
    id: rawGame.id || rawGame.gameId,
    name: rawGame.name || rawGame.gameName,
    background_image: rawGame.background_image || rawGame.gameImage,
    released: rawGame.released || 'Desconocido',
    rating: rawGame.rating || 0,
    rating_top: rawGame.rating_top || 5,
    genres: rawGame.genres || [],

    playtime: rawGame.playtime || null,
    loadingPlaytime: rawGame.loadingPlaytime ?? false,
  };
}
