// completed.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserGameService } from '../../../../../services/user-game.service';
@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent implements OnInit {
  games: any[] = [];

  constructor(
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getEnrichedGamesByUser(userId).subscribe(allGames => {
      this.games = allGames.filter(game => game.status === 'completed');
    });
  }

  onGameUpdated(updatedGame: any) {
  const index = this.games.findIndex(g => g.id === updatedGame.id);
  if (index !== -1) {
      this.games[index] = updatedGame;
    }
  }
}
