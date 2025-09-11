// completed.component.ts
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, input } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserGameService } from '../../../../../services/user-game.service';
@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent implements OnChanges {
  @Input() allGames: any[] = [];
  @Output() gameUpdated = new EventEmitter<number>();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allGames']) {
      // Filtrar solo los juegos con status "playing"
      this.games = this.allGames.filter(g => g.status === 'playing');
    }
  }
  
  onGameUpdated(updatedGame: any) {
    this.gameUpdated.emit(updatedGame);
  }
}
