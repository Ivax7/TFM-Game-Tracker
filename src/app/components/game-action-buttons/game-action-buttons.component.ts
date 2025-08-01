import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserGameService } from '../../services/user-game.service';
import { AuthService } from '../authentication/auth.service';
import { Output, EventEmitter } from '@angular/core';
declare var bootstrap: any
@Component({
  selector: 'app-game-action-buttons',
  templateUrl: './game-action-buttons.component.html',
  styleUrls: ['./game-action-buttons.component.css']
})
export class GameActionButtonsComponent implements OnInit {
  @Input() game: any;
  @Input() isUserProfile: boolean = false;
  @Output() gameUpdated = new EventEmitter<number>();

  @Output() statusClick = new EventEmitter<any>();
  
  @ViewChild('statusModal') statusModal!: ElementRef;


  isInWishlist = false;

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

}