import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UserGameService } from '../../../../services/user-game.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.css'
})
export class UserStatsComponent implements OnInit{

  wishlistCount: number = 0;
  playedGamesCount: number = 0;

  constructor (
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}


  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if(!userId) return;

    this.userGameService.getWishlist(userId).subscribe({
      next: (games: any[]) => {
        this.wishlistCount = games.length;
      },
      error: (err) => console.error('Error cargando wishlist:', err)
    });

    this.userGameService.getEnrichedGamesByUser(userId).subscribe({
      next: (allGames: any[]) => {
        this.playedGamesCount = allGames.filter(games => games.status === 'completed' || games.status === 'beaten' || games.status === 'completed').length;
      },
      error: (err) => console.error('Error cargando juegos:', err)
    });
    

  }


}


