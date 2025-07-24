import { Component, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-card-body',
  templateUrl: './game-card-body.component.html',
  styleUrls: ['./game-card-body.component.css']

})
export class GameCardBodyComponent {
  @Input() game: any = {};
  @Input() isUserProfile: boolean = false;

  @Output() gameUpdated = new EventEmitter<number>();

  onGameUpdated(id: number) {
    this.gameUpdated.emit(id);
  }
}
