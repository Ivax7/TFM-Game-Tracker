import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;


@Component({
  selector: 'app-game-card-body',
  templateUrl: './game-card-body.component.html',
  styleUrls: ['./game-card-body.component.css']
})
export class GameCardBodyComponent {
  @ViewChild('statusModal') statusModal!: ElementRef;

  @Input() game: any = {};
  @Input() isUserProfile: boolean = false;
  
  @Output() gameUpdated = new EventEmitter<number>();
  @Output() statusClick = new EventEmitter<any>();

  constructor(
    private router: Router
  ) {}

  openStatusModal(): void {
    const modal = new bootstrap.Modal(this.statusModal.nativeElement);
    modal.show();
  }


  onGameUpdated(id: number) {
    this.gameUpdated.emit(id);
  }
  
  goToDetail(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }

}
