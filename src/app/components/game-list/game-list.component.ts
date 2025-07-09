import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: any[] = [];
  private maxGames = 9;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

private loadGames(): void {
  this.gameService.getTopRatesGames().subscribe({
    next: (data) => {
      this.games = data.results.slice(0, this.maxGames);
      console.log('✅ Juegos filtrados y ordenados:', this.games);
    },
    error: (err) => {
      console.error('Error al cargar juegos:', err);
    }
  });
}

}


