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

  @Input() game: any = {};
  @Input() isUserProfile: boolean = false;
  @Input() showImage: boolean = true;
  @Input() showDescription: boolean = false;
  
  @Output() gameUpdated = new EventEmitter<number>();
  @Output() statusClick = new EventEmitter<any>();

  selectedStatus: string | null = null;
  modalInstance: any;

  // RATINGS
  @Input() userGames: any[] = [];
  userRatings: { [gameId: number]: number } = {};


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

      // 👇 Inicializa los ratings para que el template los pinte
      games.forEach(game => {
        if (game.rating) {
          this.userRatings[game.gameId] = game.rating;
        }
      });
    },
      error: (err) => console.error('❌ Error cargando juegos del usuario', err)
    });
  }

  // GAME STATUS
  onGameUpdated(id: number) {
    this.gameUpdated.emit(id);
  }

  goToDetail(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }

  openStatusModal(): void {
    this.selectedStatus = this.game.status || null;
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

    this.userGameService.updateGameStatus(userId, payload).subscribe({
      next: () => {
        this.selectedStatus = status;
        this.game.status = status;
        this.modalInstance?.hide();
        console.log('✅ Estado guardado correctamente:', status);
      },
      error: err => console.log('❌ Error al guardar el estado:', err)
    });
  }


  saveRating(gameId: number, rating: number): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;
  
    this.userGameService.updateRating(userId, gameId, rating).subscribe({
      next: () => console.log(`✅ Rating ${rating} guardado para juego ${gameId}`),
      error: err => console.error('❌ Error guardando rating', err)
    });
  }


  setUserRating(gameId: number, rating: number): void {
    this.userRatings[gameId] = rating; // actualiza localmente
    this.saveRating(gameId, rating);   // guarda en el backend
  }




}
