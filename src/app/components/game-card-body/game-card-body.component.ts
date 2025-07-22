import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card-body',
  templateUrl: './game-card-body.component.html'
})
export class GameCardBodyComponent {
  @Input() game: any = {};

  get image(): string {
    return this.game?.background_image || this.game?.gameImage;
  }

  get name(): string {
    return this.game?.name || this.game?.gameName;
  }

  get released(): string {
    return this.game?.released || 'N/A';
  }

  get rating(): number {
    return this.game?.rating ?? 0;
  }

  get ratingTop(): number {
    return this.game?.rating_top ?? 5;
  }

  get genres(): string[] {
    return this.game?.genres?.map((g: any) => g.name) || [];
  }

  get loadingPlaytime(): boolean {
    return this.game?.loadingPlaytime ?? false;
  }

  get playtime(): number | null {
    return this.game?.playtime ?? null;
  }
}
