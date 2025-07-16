import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchControl = new FormControl('');
  suggestions: any[] = [];
  showSuggestions = false;

  constructor(private gameService: GameService, private router: Router) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((query): query is string => query !== null && query.trim().length > 0), // ✅ filtro seguro

      switchMap((query: string) => {
        if (query.trim().length === 0) {
          this.suggestions = [];
          this.showSuggestions = false;
          return [];
        }
        return this.gameService.searchGames(query);
      })
    ).subscribe((response: any) => {
      this.suggestions = response?.results?.slice(0, 5) || [];
      this.showSuggestions = this.suggestions.length > 0;
    });
  }
  
  onGeneralSearch(): void {
    const query = this.searchControl.value?.trim();
    if (query) {
      this.showSuggestions = false;
      this.searchControl.reset();
      this.router.navigate(['/search', query]);
    }
  }
  
  onSuggestionClick(game: any): void {
    this.showSuggestions = false;
    this.searchControl.reset();
    this.router.navigate(['/game', game.id])
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); // Para permitir clic antes de ocultar
  }

  hasValidSearchInput(): boolean {
  const value = this.searchControl.value;
  return typeof value === 'string' && value.trim().length > 0;
}

}
