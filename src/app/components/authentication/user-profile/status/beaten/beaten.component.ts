// beaten.component.ts
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserGameService } from '../../../../../services/user-game.service';
@Component({
  selector: 'app-beaten',
  templateUrl: './beaten.component.html',
  styleUrl: './beaten.component.css'
})
export class BeatenComponent implements OnChanges {

  @Input() allGames: any[] = []; // <-- aquí recibe los juegos del padre
  @Output() gameUpdated = new EventEmitter<any>();

  games: any[] = [];

  constructor(
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}

  // ngOnInit(): void {
  //   const userId = this.auth.getCurrentUser()?.id;
  //   if (!userId) return;

  //   this.userGameService.getEnrichedGamesByUser(userId).subscribe(allGames => {
  //     this.games = allGames.filter(game => game.status === 'beaten');
  //   });
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allGames']) {
      // Filtrar by "beaten"
      this.games = this.allGames
        .filter(g => g.status === 'beaten')
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
