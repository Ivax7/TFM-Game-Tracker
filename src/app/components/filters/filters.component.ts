import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Input() genres: string[] = [];
  @Input() platforms: string[] = [];

  @Output() filtersChanged = new EventEmitter<{
    genre?: string;
    playtime?: string;
    rating?: string;
    platform?: string;
  }>();

  filters = {
    genre: '',
    playtime: '',
    rating: '',
    platforms: [] as string[]
  };


onChange(): void {
  this.filtersChanged.emit({ ...this.filters });
}

togglePlatform(platform: string, event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;

  if (checked) {
    this.filters.platforms.push(platform);
  } else {
    this.filters.platforms = this.filters.platforms.filter(p => p !== platform);
  }

  this.onChange();
}


}
