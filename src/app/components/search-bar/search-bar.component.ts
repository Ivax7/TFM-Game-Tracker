import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchControl = new FormControl('');
  suggestions: any[] = [];
  showSuggestions = false;
  isUserSearch = false;

  constructor(
    private gameService: GameService,
    private userService: UserService,
    private router: Router
  ) {
this.searchControl.valueChanges.pipe(
  debounceTime(1000),
  switchMap((query: string | null) => {
    const trimmed = (query || '').trim();

    if (!trimmed) {
      this.suggestions = [];
      this.showSuggestions = false;
      return [];
    }

    if (trimmed.startsWith('@')) {
      this.isUserSearch = true;
      const username = trimmed.slice(1);
      console.log('[SearchBar] Searching users for:', username);
      return this.userService.searchUsers(username);
    } else {
      this.isUserSearch = false;
      console.log('[SearchBar] Searching games for:', trimmed);
      return this.gameService.searchGames(trimmed);
    }
  })).subscribe((response: any) => {
  if (this.isUserSearch) {
    this.suggestions = (response || []).slice(0, 5);
    this.suggestions.push({ isSeeAll: true });
  } else {
    this.suggestions = response?.results?.slice(0, 5) || [];
  }
  this.showSuggestions = this.suggestions.length > 0;
});

  }

  onSuggestionClick(item: any): void {
    this.showSuggestions = false;
    this.searchControl.reset();

    if (this.isUserSearch) {
      if (item.isSeeAll) {
        this.router.navigate(['/users/search', this.searchControl.value?.slice(1)])
      } else {
        this.router.navigate(['/users', item.id])
      }
    } else {
      this.router.navigate(['/game', item.id])
    }
  }

  
  onGeneralSearch(): void {
    const query = this.searchControl.value?.trim();
    if (query) {
      this.showSuggestions = false;
      this.searchControl.reset();
      
      if (query.startsWith('@')) {
        this.router.navigate(['/users/search', query.slice(1)]);
      } else {
        this.router.navigate(['/search', query]);
      }
    }
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  hasValidSearchInput(): boolean {
    const value = this.searchControl.value;
    return typeof value === 'string' && value.trim().length > 0;
  }

}
