import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { UserGameService } from '../../services/user-game.service';
import { ReviewService } from '../../services/review.service';

declare var bootstrap: any;

@Component({
  selector: 'app-game-card-body',
  templateUrl: './game-card-body.component.html',
  styleUrls: ['./game-card-body.component.css']
})
export class GameCardBodyComponent implements OnInit {

  @ViewChild('statusModal') statusModal!: ElementRef;

  @ViewChild('ratingModal') ratingModal!: ElementRef;
  ratingModalInstance: any;

  @Input() game: any = {};
  @Input() isUserProfile: boolean = false;
  @Input() showImage: boolean = true;
  @Input() showDescription: boolean = false;
  
  @Output() gameUpdated = new EventEmitter<number>();
  @Output() statusClick = new EventEmitter<any>();

  selectedStatus: string | null = null;
  modalInstance: any;

  pendingStatus: 'playing' | 'beaten' | 'completed' | 'abandoned' | null = null;

  // RATINGS
  @Input() userGames: any[] = [];
  userRatings: { [gameId: number]: number } = {};

  // HOURS
  userHours: { [gameId: number]: number } = {};

  // RESEÑAS
  reviews: { userName: string, text: string }[] = [];
  newReview: string = '';

  constructor(
    private router: Router,
    private userGameService: UserGameService,
    private reviewService: ReviewService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  this.userGameService.getGamesByUser(userId).subscribe({
    next: (games) => {
      this.userGames = games;

      games.forEach(userGame => {

        // Inicializar ratings 
        if (userGame.rating) {
          this.userRatings[userGame.gameId] = userGame.rating;
        }
        
        // Inicializar status
        if (userGame.gameId === this.game.id) {
          this.selectedStatus = userGame.status || null;
          this.game.status = userGame.status || null;
        }

        // Inicializar horas jugadas
        if(userGame.hoursPlayed !== undefined && userGame.gameId === this.game.id) {
          this.userHours[userGame.gameId] = userGame.hoursPlayed
        }
      
      });

    },
      error: (err) => console.error('❌ Error cargando juegos del usuario', err)
    });
  }

  // GAME STATUS
  onGameUpdated(id: number) {
    this.gameUpdated.emit(this.game);
  }

  goToDetail(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }

  // Open Status modal
  openStatusModal(): void {
    this.selectedStatus = this.game.status || null;
    const modalEl = this.statusModal.nativeElement;
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  // RATING & HOURS MODAL

  openRatingModal(): void {
    const modalEl = this.ratingModal.nativeElement;
    this.ratingModalInstance = new bootstrap.Modal(modalEl);
    this.ratingModalInstance.show();
  }

  closeRatingModal(): void {
    this.ratingModalInstance?.hide();
  }

  // Setear Status
  // Setear Status (solo en memoria, no en backend todavía)
  setStatus(status: 'playing' | 'beaten' | 'completed' | 'abandoned'): void {
    this.pendingStatus = status;
    this.modalInstance?.hide();
    this.openRatingModal();
  }


  // Guardar todo en backend cuando el user pulse "Guardar"
  saveGameData(gameId: number): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId || !this.pendingStatus) return;

    const payload = {
      gameId: this.game.id,
      gameName: this.game.name,
      gameImage: this.game.background_image,
      status: this.pendingStatus,
      rating: this.userRatings[this.game.id] || null,
      hoursPlayed: this.userHours[this.game.id] || 0
    };

    this.userGameService.updateGameStatus(userId, payload).subscribe({
      next: () => {
        this.selectedStatus = this.pendingStatus;
        this.game.status = this.pendingStatus;
        this.game.rating = payload.rating;
        this.pendingStatus = null; // limpiar
        console.log('✅ Datos guardados:', payload);
        this.gameUpdated.emit(this.game);
        this.closeRatingModal();
      },
      error: err => console.error('❌ Error al guardar datos del juego', err)
    });
  }

  setUserRating(gameId: number, rating: number): void {
    this.userRatings[gameId] = rating;
  }

  clearStatus(): void {

    const userId = this.auth.getCurrentUser()?.id;
    if(!userId) return;

    const payload = {
      gameId: this.game.id,
      gameName: this.game.name,
      gameImage: this.game.background_image,
      status: null,
      rating: null,
    }

    this.userGameService.updateGameStatus(userId, payload).subscribe({
      next: () => {
        this.selectedStatus = null;
        this.game.status = null;
        this.userRatings[this.game.id] = 0;
        this.game.rating = null;
        console.log('🗑️ Estado eliminado correctamente')
      },
      error: err => console.error('❌ Error al limpiar estado', err)
    })
  }

}
