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
  private maxGames = 9;

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
      
      this.games.forEach((game, index) => {
        console.log('🔍 Cargando duración para:', game.name, 'Slug:', game.slug);
        this.gameService.getGameWithPlaytime(game.slug).subscribe({
          next: (fullGameData) => {
            this.games[index] = {
              ...game,
              ...fullGameData,
              loadingPlaytime: false
            };
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

}

