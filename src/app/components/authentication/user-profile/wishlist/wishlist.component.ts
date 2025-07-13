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
}
