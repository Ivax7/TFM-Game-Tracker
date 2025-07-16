// wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { UserGameService } from '../../../../services/user-game.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  constructor(private userGameService: UserGameService, private auth: AuthService) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getWishlist(userId).subscribe({
      next: (games: any) => {
        this.wishlist = games;
      },
      error: (err) => console.error('Error cargando wishlist:', err)
    });
  }
  toggleWishlist(game: any) {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  this.userGameService.removeFromWishlist(userId, game.gameId).subscribe({
    next: () => {
      this.wishlist = this.wishlist.filter(g => g.gameId !== game.gameId);
    },
    error: (err) => console.error('Error eliminando de wishlist:', err)
  });
}

markAsPlayed(game: any): void {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  // Primero agregar a played
  this.userGameService.markAsPlayed(userId, {
    id: game.gameId,
    name: game.gameName,
    background_image: game.gameImage
  }).subscribe({
    next: () => {
      // Luego eliminar de wishlist
      this.userGameService.removeFromWishlist(userId, game.gameId).subscribe({
        next: () => {
          this.wishlist = this.wishlist.filter(g => g.gameId !== game.gameId);
        },
        error: (err) => console.error('Error eliminando de wishlist:', err)
      });
    },
    error: (err) => console.error('Error marcando como jugado:', err)
  });
}


}
