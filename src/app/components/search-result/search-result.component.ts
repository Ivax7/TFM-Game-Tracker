import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  games: any[] = [];
  query = '';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') || '';
      if (this.query) {
        this.gameService.searchGames(this.query).subscribe({
          next: (res) => this.games = res.results,
          error: (err) => console.error('Error al buscar juegos:', err)
        });
      }
    });
  }
}
