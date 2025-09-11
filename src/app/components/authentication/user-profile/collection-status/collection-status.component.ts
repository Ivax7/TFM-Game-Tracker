import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UserGameService } from '../../../../services/user-game.service';

@Component({
  selector: 'app-collection-status',
  templateUrl: './collection-status.component.html',
  styleUrl: './collection-status.component.css'
})
export class CollectionStatusComponent implements OnInit {
  user: any;
  games: any[] = [];

  activeTab: 'playing' | 'beaten' | 'completed' | 'abandoned' = 'playing';
  
  constructor(
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    this.loadGames();
  }
  
  loadGames() {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getGamesByUser(userId).subscribe(games => {
      this.games = [...games];
    });
  }


  onGameUpdated(updatedGame: any) {
    this.loadGames();
  }


}
