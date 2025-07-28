import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { UserGameService } from '../../services/user-game.service';

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

  selectedStatus: string | null = null;
  modalInstance: any;

  constructor(
    private router: Router,
    private userGameService: UserGameService,
    private auth: AuthService
  ) {}

  onGameUpdated(id: number) {
    this.gameUpdated.emit(id);
  }
  
  goToDetail(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }

  openStatusModal(): void {
    this.selectedStatus = this.game.status || null;
    console.log(this.selectedStatus)
    const modalEl = this.statusModal.nativeElement;
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  setStatus(status: 'playing' | 'beaten' | 'completed' | 'abandoned'): void {
    const userId = this.auth.getCurrentUser()?.id;

    if(!userId) return;

    const payload = {
      gameId: this.game.id,
      gameName: this.game.name,
      gameImage: this.game.background_image,
      status
    }

    console.log('🎲 Juego completo:', this.game);

    this.userGameService.updateGameStatus(userId, payload).subscribe({
      next: () => {
        this.selectedStatus = status;

        this.game.status = status
        this.modalInstance?.hide();
        console.log('✅ Estado guardado correctamente:', status);

      },
      error: err => console.log('❌ Error al guardar el estado:', err)
    });
  }


}
