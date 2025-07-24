import { Component, OnInit } from '@angular/core';
import { UserGameService } from '../../../../services/user-game.service';
import { AuthService } from '../../auth.service';
import { forkJoin, map } from 'rxjs';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'app-played',
  templateUrl: './played.component.html',
  styleUrls: ['./played.component.css']
})
export class PlayedComponent implements OnInit {
  playedGames: any[] = [];

  constructor(
    private userGameService: UserGameService,
    private auth: AuthService,
    private gameService: GameService
  ) {}
ngOnInit(): void {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  this.userGameService.getPlayed(userId).subscribe({
    next: (games: any[]) => {
      const enrichedGames$ = games.map((g) =>
        this.gameService.getGameDetails(g.gameId).pipe(
          map((fullGame) => ({
            ...fullGame,
            loadingPlaytime: false
          }))
        )
      );

      forkJoin(enrichedGames$).subscribe({
        next: (fullGames) => {
          this.playedGames = fullGames;
          console.log(this.playedGames);
        },
        error: (err) => console.error('Error enriqueciendo juegos jugados:', err)
      });
    },
    error: (err) => console.error('Error cargando juegos jugados:', err)
  });
}


  onGameUpdated(gameId: number) {
    this.playedGames = this.playedGames.filter(g => (g.gameId ?? g.id) !== gameId);
  }


}
