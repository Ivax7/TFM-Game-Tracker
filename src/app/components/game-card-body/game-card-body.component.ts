import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { UserGameService } from '../../services/user-game.service';
import { ListService } from '../../services/list.service';
declare var bootstrap: any;

@Component({
  selector: 'app-game-card-body',
  templateUrl: './game-card-body.component.html',
  styleUrls: ['./game-card-body.component.css']
})
export class GameCardBodyComponent implements OnInit {

  @ViewChild('statusModal') statusModal!: ElementRef;
  @ViewChild('ratingModal') ratingModal!: ElementRef;
  @ViewChild('listModal') listModal!: ElementRef;

  @Input() game: any = {};
  @Input() visitedUserGames: any[] = [];
  @Input() isUserProfile: boolean = false;
  @Input() showImage: boolean = true;
  @Input() showDescription: boolean = false;

  @Output() gameUpdated = new EventEmitter<any>();

  selectedStatus: string | null = null; // usuario autenticado
  pendingStatus: 'playing' | 'beaten' | 'completed' | 'abandoned' | null = null;

  userRatings: { [gameId: number]: number } = {};
  userHours: { [gameId: number]: number } = {};

  lists: any[] = [];
  modalInstance: any;
  ratingModalInstance: any;
  listModalInstance: any;

  constructor(
    private router: Router,
    private userGameService: UserGameService,
    private listService: ListService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.auth.getCurrentUser()?.id;
    if (!currentUserId) return;

    // Mostrar info del usuario visitado en la tarjeta
    if (!this.isUserProfile && this.visitedUserGames.length > 0) {
      const visitedGame = this.visitedUserGames.find(g => g.gameId === this.game.id);
      this.game.status = visitedGame?.status || null;
      this.game.rating = visitedGame?.rating || null;
    }

    // Cargar info del usuario autenticado para el modal
    this.userGameService.getGamesByUser(currentUserId).subscribe({
      next: games => {
        const userGame = games.find(g => g.gameId === this.game.id);
        if (userGame) {
          this.selectedStatus = userGame.status || null;
          this.userRatings[this.game.id] = userGame.rating || 0;
          this.userHours[this.game.id] = userGame.hoursPlayed || 0;
        }
      },
      error: err => console.error('❌ Error cargando juegos del usuario', err)
    });

    // Cargar listas del usuario autenticado
    this.listService.getUserLists(currentUserId).subscribe({
      next: lists => this.lists = lists,
      error: err => console.error('❌ Error cargando listas', err)
    });
  }

  goToDetail(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }

  openStatusModal(): void {
    const modalEl = this.statusModal.nativeElement;
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  openRatingModal(): void {
    const modalEl = this.ratingModal.nativeElement;
    this.ratingModalInstance = new bootstrap.Modal(modalEl);
    this.ratingModalInstance.show();
  }

  closeRatingModal(): void {
    this.ratingModalInstance?.hide();
  }

  openListModal(): void {
    const modalEl = this.listModal.nativeElement;
    this.listModalInstance = new bootstrap.Modal(modalEl);
    this.listModalInstance.show();
  }

  setStatus(status: 'playing' | 'beaten' | 'completed' | 'abandoned'): void {
    this.pendingStatus = status;
    this.modalInstance?.hide();
    this.openRatingModal();
  }

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
        this.pendingStatus = null;
        this.gameUpdated.emit(this.game); // notifica al padre
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
    if (!userId) return;

    const payload = {
      gameId: this.game.id,
      gameName: this.game.name,
      gameImage: this.game.background_image,
      status: null,
      rating: null
    };

    this.userGameService.updateGameStatus(userId, payload).subscribe({
      next: () => {
        this.selectedStatus = null;
        this.userRatings[this.game.id] = 0;
        this.game.status = null;
        this.game.rating = null;
        console.log('🗑️ Estado eliminado correctamente');
      },
      error: err => console.error('❌ Error al limpiar estado', err)
    });
  }

  addToList(list: any): void {
    const userId = this.auth.getCurrentUser()?.id;
    if (!userId) return;

    this.listService.addGameToList(userId, list.id, this.game).subscribe({
      next: () => {
        console.log(`✅ Juego "${this.game.name}" añadido a la lista "${list.title}"`);
        this.listModalInstance.hide();
      },
      error: err => console.error('❌ Error al añadir a lista', err)
    });
  }

  onGameUpdated(game: any) {
    this.gameUpdated.emit(game);
  }
}
