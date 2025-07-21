import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playtime-display',
  templateUrl: './playtime-display.component.html',
  styleUrls: ['./playtime-display.component.css']
})
export class PlaytimeDisplayComponent {
  @Input() loadingPlaytime: boolean = false;
  @Input() playtime: number | null = null;
}
