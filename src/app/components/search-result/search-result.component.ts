import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { UserGameService } from '../../services/user-game.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  games: any[] = [];
  query = '';

  wishlistGameIds = new Set<number>();
  playedGameIds = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private userGameService: UserGameService,
    public auth: AuthService
  ) {}

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') || '';
      if (this.query) {
        this.gameService.searchGames(this.query).subscribe({
          next: (res) => {
            this.games = res.results;
            this.loadUserGameStates(); // 🚀 cargar estado wishlist/played
          },
          error: (err) => console.error('Error al buscar juegos:', err)
        });
      }
    });
  }

  private loadUserGameStates(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getWishlist(userId).subscribe({
      next: (wishlist: any[]) => wishlist.forEach(item => this.wishlistGameIds.add(item.gameId)),
      error: (err) => console.error('Error cargando wishlist:', err)
    });

    this.userGameService.getPlayed(userId).subscribe({
      next: (played: any[]) => played.forEach(item => this.playedGameIds.add(item.gameId)),
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
        error: (err) => console.error('Error eliminando de wishlist:', err)
      });
    } else {
      this.userGameService.addToWishlist(userId, game).subscribe({
        next: () => this.wishlistGameIds.add(game.id),
        error: (err) => console.error('Error añadiendo a wishlist:', err)
      });
    }
  }

  togglePlayed(game: any): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    if (this.isPlayed(game.id)) {
      this.userGameService.unmarkAsPlayed(userId, game.id).subscribe({
        next: () => this.playedGameIds.delete(game.id),
        error: (err) => console.error('Error desmarcando como jugado:', err)
      });
    } else {
      this.userGameService.markAsPlayed(userId, game).subscribe({
        next: () => this.playedGameIds.add(game.id),
        error: (err) => console.error('Error marcando como jugado:', err)
      });
    }
  }
}
