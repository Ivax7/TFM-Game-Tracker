import { Component, OnInit, viewChild } from '@angular/core';
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
  private loading = false;
  
  constructor(
    private gameService: GameService,
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames(): void {
    this.loading = true;
    this.gameService.get10TrendingGames(1).subscribe({
      next: (data: any) => {
        this.games = data.results.map((game: any) => ({
          ...game,
          loadingPlaytime: true,
          playtimeMain: null
        }));

        // cargar playtime de cada juego
        this.games.forEach((game, index) => {
          this.gameService.getGameWithPlaytime(game.slug).subscribe({
            next: (fullGameData) => {
              this.games[index] = { ...game, ...fullGameData, loadingPlaytime: false };
            },
            error: () => {
              this.games[index].loadingPlaytime = false;
            }
          });
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar juegos:', err);
        this.loading = false;
      }
    });
  }

  goToAllTrending(): void {
    this.router.navigate(['/trending']);
  }

}

