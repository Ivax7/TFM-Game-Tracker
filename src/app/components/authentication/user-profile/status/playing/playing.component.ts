// playing.component.ts
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, input } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserGameService } from '../../../../../services/user-game.service';
@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css']
})
export class PlayingComponent implements OnChanges {
  @Input() allGames: any[] = [];
  @Output() gameUpdated = new EventEmitter<number>();
  games: any[] = [];

  constructor(
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allGames']) {
      // Filter by "playing"
      this.games = this.allGames
        .filter(g => g.status === 'playing')
    }
  }

  onGameUpdated(updatedGame: any) {
    this.gameUpdated.emit(updatedGame);
  }

  trackByGameId(index: number, game: any) {
    return game.id;
  }

}

