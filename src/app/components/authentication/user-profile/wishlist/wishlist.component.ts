import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserGameService } from '../../../../services/user-game.service';
import { AuthService } from '../../auth.service';
import { forkJoin, map } from 'rxjs';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnChanges {
  @Input() userId?: number; // visited userId
  @Input() visitedUser?: any; // visited user
  wishlist: any[] = [];
  user: any;

  constructor(
    private userGameService: UserGameService,
    private auth: AuthService,
    private gameService: GameService
    
  ) {}
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();

    // Si se pasa un usuario visitado, lo usamos
    if (this.visitedUser) {
      this.user = this.visitedUser;
    } else {
      this.user = currentUser;
    }
    // visited Id or auth id
    const idToLoad = this.userId ?? this.user?.id;
    if (!idToLoad) return;

    this.loadWishlist(idToLoad);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userId'] && !changes['userId'].firstChange) {
      console.log('[Wishlist] userId changed -> reloading wishlist');
      this.loadWishlist(this.userId!)
    }
  }

  private loadWishlist(userId: number) {
    this.wishlist = [];
    this.userGameService.getWishlist(userId).subscribe({
      next: (games: any[]) => {
        if(!games?.length) {
          this.wishlist = [];
          return;
        }

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

