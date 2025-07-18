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
        this.games = data.results.slice(0, this.maxGames);
      },
      error: (err) => console.error('Error al cargar juegos:', err)
    });
  }

  goToDetail(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }
}

