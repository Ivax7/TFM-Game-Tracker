import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.css']
})
export class TrendingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollAnchor', { static: false }) scrollAnchor!: ElementRef;

  games: any[] = [];
  filteredGames: any[] = [];
  genreOptions: string[] = [];
  platformOptions: string[] = [];
  currentFilters: any = {};

  private observer!: IntersectionObserver;
  private currentPage = 1;
  private pageSize = 20;
  private loading = false;
  private allGamesLoaded = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }
  
  ngAfterViewInit(): void {
    this.setupObserver();
  }

private loadGames(): void {
    if (this.loading || this.allGamesLoaded) return;
    this.loading = true;

    this.gameService.getFullTrendingGames(this.currentPage).subscribe({
      next: (data: any) => {
        const newGames = data.results.map((game: any) => ({
          ...game,
          loadingPlaytime: true,
          playtimeMain: null
        }));

        if (newGames.length < this.pageSize) {
          this.allGamesLoaded = true;
        }

        this.games = [...this.games, ...newGames];
        this.applyFilters();

        if (this.currentPage === 1) {
          this.genreOptions = [
            ...new Set(this.games.flatMap(game => game.genres?.map((g: any) => g.name) || []))
          ];
          this.platformOptions = [
            ...new Set(this.games.flatMap(game => game.platforms?.map((p: any) => p.platform.name) || []))
          ];
        }

        // cargar playtime
        newGames.forEach((game: any, indexOffset: number) => {
          const globalIndex = this.games.length - newGames.length + indexOffset;
          this.gameService.getGameWithPlaytime(game.slug).subscribe({
            next: (fullGameData) => {
              const updatedGame = { ...game, ...fullGameData, loadingPlaytime: false };
              this.games[globalIndex] = updatedGame;
              this.filteredGames[globalIndex] = updatedGame;
            },
            error: () => {
              this.games[globalIndex].loadingPlaytime = false;
            }
          });
        });

        this.currentPage++;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando trending games:', err);
        this.loading = false;
      }
    });
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadGames();
      }
    });

    if (this.scrollAnchor) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }

  onFiltersChanged(filters: any): void {
    this.currentFilters = filters;
    this.applyFilters();
  }

  private applyFilters(): void {
    const filters = this.currentFilters;
    this.filteredGames = this.games.filter(game => {
      const matchGenre = filters.genre
        ? game.genres?.some((g: any) => g.name === filters.genre)
        : true;

      const matchPlatform = filters.platforms?.length
        ? game.platforms?.some((p: any) => filters.platforms.includes(p.platform.name))
        : true;

      const matchRating = filters.rating
        ? game.rating >= parseFloat(filters.rating)
        : true;

      const matchPlaytime = filters.playtime
        ? this.checkPlaytimeRange(game.playtime, filters.playtime)
        : true;

      return matchGenre && matchPlatform && matchRating && matchPlaytime;
    });
  }

  private checkPlaytimeRange(playtime: number, range: string): boolean {
    switch (range) {
      case 'short': return playtime <= 10;
      case 'medium': return playtime > 10 && playtime <= 30;
      case 'long': return playtime > 30;
      default: return true;
    }
  }
}
