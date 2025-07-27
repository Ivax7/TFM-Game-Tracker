// playing.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserGameService } from '../../../../../services/user-game.service';
@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css']
})
export class PlayingComponent implements OnInit {
  games: any[] = [];

  constructor(
    private auth: AuthService,
    private userGameService: UserGameService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

this.userGameService.getGamesByUser(userId).subscribe(allGames => {
  console.log('Todos los juegos recibidos:', allGames);

  allGames.forEach(game => {
    console.log(`Juego: ${game.gameName}, status:`, game.status);
  });

  this.games = allGames.filter(game => game.status === 'playing');
});

  }
}
