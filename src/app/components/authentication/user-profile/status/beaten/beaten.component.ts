// beaten.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserGameService } from '../../../../../services/user-game.service';
@Component({
  selector: 'app-beaten',
  templateUrl: './beaten.component.html',
  styleUrl: './beaten.component.css'
})
export class BeatenComponent implements OnInit {
  games: any[] = [];

  constructor(
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getGamesByUser(userId).subscribe(allGames => {
      this.games = allGames.filter(game => game.status === 'beaten');
    });
  }
}
