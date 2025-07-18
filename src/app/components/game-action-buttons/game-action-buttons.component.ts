import { Component, Input, OnInit } from '@angular/core';
import { UserGameService } from '../../services/user-game.service';
import { AuthService } from '../authentication/auth.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-action-buttons',
  templateUrl: './game-action-buttons.component.html',
  styleUrls: ['./game-action-buttons.component.css']
})
export class GameActionButtonsComponent implements OnInit {
  @Input() game: any;
  @Input() isUserProfile: boolean = false;
  @Output() gameUpdated = new EventEmitter<number>();

  isInWishlist = false;
  isPlayed = false;


  constructor(
    private userGameService: UserGameService,
    public auth: AuthService
  ) {}

  get gameId(): number {
    return this.game?.gameId ?? this.game?.id;
  }

  get gameName(): string {
    return this.game?.gameName ?? this.game?.name;
  }

  get gameImage(): string {
    return this.game?.gameImage ?? this.game?.background_image;
  }

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId || !this.game) return;

    this.userGameService.getWishlist(userId).subscribe({
      next: (wishlist: any[]) => {
        this.isInWishlist = wishlist.some(item => item.gameId === this.gameId);
      },
      error: err => console.error('❌ Error cargando wishlist:', err)
    });

    this.userGameService.getPlayed(userId).subscribe({
      next: (played: any[]) => {
        this.isPlayed = played.some(item => item.gameId === this.gameId);
      },
      error: err => console.error('❌ Error cargando played:', err)
    });
  }

  toggleWishlist(event: Event): void {
    event.stopPropagation();
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    if (this.isInWishlist) {
      this.userGameService.removeFromWishlist(userId, this.gameId).subscribe({
        next: () => this.isInWishlist = false,
        error: err => console.error('❌ Error removing from wishlist:', err)
      });
    } else {
      const gameToSend = {
        id: this.gameId,
        name: this.gameName,
        background_image: this.gameImage
      };

      this.userGameService.addToWishlist(userId, gameToSend).subscribe({
        next: () => this.isInWishlist = true,
        error: err => console.error('❌ Error adding to wishlist:', err)
      });
    }
  }

  togglePlayed(event: Event): void {
  event.stopPropagation();
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  if (this.isPlayed) {
    this.userGameService.unmarkAsPlayed(userId, this.gameId).subscribe({
      next: () => this.isPlayed = false,
      error: err => console.error('❌ Error unmarking played:', err)
    });
  } else {
    const gameToSend = {
      id: this.gameId,
      name: this.gameName,
      background_image: this.gameImage
    };

    this.userGameService.addGameToPlayedAndRemoveFromWishlist(userId, gameToSend).subscribe({
      next: () => {
        this.isPlayed = true;
        this.isInWishlist = false;  // también actualizamos el estado local
      },
      error: err => console.error('❌ Error marking as played:', err)
    });
  }
}



 // USER PROFILE ACTIONS

markAsWishlist(game: any) {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  this.userGameService.removeFromWishlist(userId, game.gameId).subscribe({
    next: () => {
      // no es necesario actualizar `wishlist` aquí directamente
      // si necesitas emitir evento para que el padre actualice, se puede agregar @Output
      this.isInWishlist = false;
      this.gameUpdated.emit(this.gameId); // 🚀 notifica al padre

    },
    error: err => console.error('❌ Error removiendo de wishlist:', err)
  });
}

markAsPlayed(game: any): void {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  

  this.userGameService.addGameToPlayedAndRemoveFromWishlist(userId, game).subscribe({
    next: () => {
      this.isPlayed = true;
      this.isInWishlist = false;
      this.gameUpdated.emit(this.gameId); // 🚀 notifica al padre

    },
    error: err => console.error('❌ Error marcando como jugado:', err)
  });
}


}
