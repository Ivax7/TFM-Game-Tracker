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

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getEnrichedGamesByUser(userId).subscribe(allGames => {
      this.games = allGames.filter(game => game.status === 'beaten');
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
