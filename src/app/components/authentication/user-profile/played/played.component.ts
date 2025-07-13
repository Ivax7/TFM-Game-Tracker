import { Component, OnInit } from '@angular/core';
import { UserGameService } from '../../../../services/user-game.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-played',
  templateUrl: './played.component.html',
  styleUrls: ['./played.component.css']
})
export class PlayedComponent implements OnInit {
  playedGames: any[] = [];

  constructor(private userGameService: UserGameService, private auth: AuthService) {}

  ngOnInit(): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.userGameService.getPlayed(userId).subscribe({
      next: (games: any) => {
        this.playedGames = games;
      },
      error: (err) => console.error('Error cargando juegos jugados:', err)
    });
  }
}
