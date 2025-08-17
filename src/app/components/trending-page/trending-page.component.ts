import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.css']
})
export class TrendingPageComponent implements OnInit {
  games: any[] = [];
  filteredGames: any[] = [];
  loading = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  private loadGames(): void {
    this.loading = true;
    this.gameService.getFullTrendingGames().subscribe({
      next: (data) => {
        this.games = data.results;
        this.filteredGames = [...this.games];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando trending games:', err);
        this.loading = false;
      }
    });
  }
}
