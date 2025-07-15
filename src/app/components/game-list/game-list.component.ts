import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../authentication/auth.service';
import { UserGameService } from '../../services/user-game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: any[] = [];
  private maxGames = 9;
  wishlistGameIds = new Set<number>();
  playedGameIds = new Set<number>();

  constructor(
    private gameService: GameService,
    private userGameService: UserGameService,
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
        this.loadUserGameStates();
      },
      error: (err) => console.error('Error al cargar juegos:', err)
    });
  }

  private loadUserGameStates(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getWishlist(userId).subscribe({
      next: (wishlist: any[]) => {
        wishlist.forEach(item => this.wishlistGameIds.add(item.gameId));
      },
      error: (err) => console.error('Error cargando wishlist:', err)
    });

    this.userGameService.getPlayed(userId).subscribe({
      next: (played: any[]) => {
        played.forEach(item => this.playedGameIds.add(item.gameId));
      },
      error: (err) => console.error('Error cargando played:', err)
    });
  }

  isInWishlist(gameId: number): boolean {
    return this.wishlistGameIds.has(gameId);
  }

  isPlayed(gameId: number): boolean {
    return this.playedGameIds.has(gameId);
  }

  toggleWishlist(game: any): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    if (this.isInWishlist(game.id)) {
      this.userGameService.removeFromWishlist(userId, game.id).subscribe({
        next: () => this.wishlistGameIds.delete(game.id),
        error: (err) => console.error('❌ Error removing from wishlist:', err)
      });
    } else {
      this.userGameService.addToWishlist(userId, game).subscribe({
        next: () => this.wishlistGameIds.add(game.id),
        error: (err) => console.error('❌ Error adding to wishlist:', err)
      });
    }
  }

  togglePlayed(game: any): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    if (this.isPlayed(game.id)) {
      this.userGameService.unmarkAsPlayed(userId, game.id).subscribe({
        next: () => this.playedGameIds.delete(game.id),
        error: (err) => console.error('❌ Error unmarking played:', err)
      });
    } else {
      this.userGameService.markAsPlayed(userId, game).subscribe({
        next: () => this.playedGameIds.add(game.id),
        error: (err) => console.error('❌ Error marking as played:', err)
      });
    }
  }

  goToDetail(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }
}
