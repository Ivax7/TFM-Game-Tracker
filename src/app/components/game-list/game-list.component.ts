import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: any[] = [];
  filteredGames: any[] = [];
  genreOptions: string[] = [];
  platformOptions: string[] = [];
  private maxGames = 20;

  constructor(
    private gameService: GameService,
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames(): void {
  this.gameService.getTopRatesGames().subscribe({
    next: (data) => {
      const rawGames = data.results.slice(0, this.maxGames);
      console.log(rawGames)

      this.games = rawGames.map((game: any) => ({
        ...game,
        loadingPlaytime: true,
        playtimeMain: null
      }));
      
      this.filteredGames = [...this.games];

      this.genreOptions = [
        ...new Set(this.games.flatMap(game => game.genres?.map((g: any) => g.name) || []))
      ];

      this.platformOptions = [
        ...new Set(this.games.flatMap(game => game.platforms?.map((p: any) => p.platform.name) || []))
      ]
      
      this.games.forEach((game, index) => {
        console.log('🔍 Cargando duración para:', game.name, 'Slug:', game.slug);
        this.gameService.getGameWithPlaytime(game.slug).subscribe({
          next: (fullGameData) => {
            const updatedGame = {
              ...game,
              ...fullGameData,
              loadingPlaytime: false
            }

            this.games[index] = updatedGame;
            this.filteredGames[index] = updatedGame;
          },
          error: (err) => {
            console.error('Error cargando duración del juego:', err);
            this.games[index].loadingPlaytime = false;
          }
        });
      });
    },
    error: (err) => console.error('Error al cargar juegos:', err)
  });
}

  onFiltersChanged(filters: any): void {
    this.filteredGames = this.games.filter(game => {
      const matchGenre = filters.genre
        ? game.genres?.some((g: any) => g.name === filters.genre)
        : true;

      const matchPlatform = filters.platforms?.length
        ? game.platforms?.some((p: any) => filters.platforms.includes(p.platform.name))
        : true;


      const matchRating = filters.rating
        ? game.rating >= parseFloat(filters.rating)
        : true;

      const matchPlaytime = filters.playtime
        ? this.checkPlaytimeRange(game.playtime, filters.playtime)
        : true;

      return matchGenre && matchPlatform && matchRating && matchPlaytime;
    });
  }

  private checkPlaytimeRange(playtime: number, range: string): boolean {
    switch (range) {
      case 'short': return playtime <= 10;
      case 'medium': return playtime > 10 && playtime <= 30;
      case 'long': return playtime > 30;
      default: return true;
    }
  }

}

