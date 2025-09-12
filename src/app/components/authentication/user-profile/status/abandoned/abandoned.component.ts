// abandoned.component.ts
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserGameService } from '../../../../../services/user-game.service';
@Component({
  selector: 'app-abandoned',
  templateUrl: './abandoned.component.html',
  styleUrl: './abandoned.component.css'
})
export class AbandonedComponent implements OnChanges {
  
  @Input() allGames: any[] = []; // <-- aquí recibe los juegos del padre
  @Output() gameUpdated = new EventEmitter<any>();
  games: any[] = [];

  constructor(
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allGames']) {
      // Filter by "abandoned"
      this.games = this.allGames
        .filter(g => g.status === 'abandoned')
        .slice()
        .reverse();
    }
  }

  onGameUpdated(updatedGame: any) {
    this.gameUpdated.emit(updatedGame);
  }

  trackByGameId(index: number, game: any) {
    return game.id;
  }


}
