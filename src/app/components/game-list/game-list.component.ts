import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../authentication/auth.service';
import { UserGameService } from '../../services/user-game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: any[] = [];
  private maxGames = 9;

  constructor(private gameService: GameService, private userGameService: UserGameService, public auth: AuthService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames(): void {
    this.gameService.getTopRatesGames().subscribe({
      next: (data) => {
        this.games = data.results.slice(0, this.maxGames);
        console.log('✅ Juegos filtrados y ordenados:', this.games);
      },
      error: (err) => {
        console.error('Error al cargar juegos:', err);
      }
    });
  }
  
  addToWishlist(game: any) {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.addToWishlist(userId, game).subscribe({
      next: () => alert('✅ Añadido a wishlist'),
      error: (err: any) => console.error('❌ Error wishlist:', err)
    });
  }

  markAsPlayed(game: any) {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.markAsPlayed(userId, game).subscribe({
      next: () => alert('✅ Marcado como jugado'),
      error: (err: any) => console.error('❌ Error played:', err)
    });
  }


}


