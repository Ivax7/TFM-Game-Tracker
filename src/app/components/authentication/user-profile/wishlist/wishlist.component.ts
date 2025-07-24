import { Component, OnInit } from '@angular/core';
import { UserGameService } from '../../../../services/user-game.service';
import { AuthService } from '../../auth.service';
import { forkJoin, map } from 'rxjs';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];


  constructor(
    private userGameService: UserGameService,
    private auth: AuthService,
    private gameService: GameService
    
  ) {}
  ngOnInit(): void {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  this.userGameService.getWishlist(userId).subscribe({
    next: (games: any[]) => {
      const enrichedGames$ = games.map((g) =>
        this.gameService.getGameDetails(g.gameId).pipe(
          map((fullGame) => ({
            ...fullGame,
            loadingPlaytime: false
          }))
        )
      );

      forkJoin(enrichedGames$).subscribe((fullGames) => {
        this.wishlist = fullGames;
        console.log(this.wishlist)
      });
    },
    error: (err) => console.error('Error cargando wishlist:', err)
  });
}
  
onGameListUpdate(gameId: number) {
  this.wishlist = this.wishlist.filter(g => (g.gameId ?? g.id) !== gameId);
}

}
