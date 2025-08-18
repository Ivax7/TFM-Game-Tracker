import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() gameId!: number; // El padre lo pasa
  reviews: { userName: string, text: string }[] = [];
  newReview: string = '';

  constructor(
    private router: Router,
    private reviewService: ReviewService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    if (!this.gameId) return;

    this.reviewService.getReviews(this.gameId).subscribe({
      next: data => {
        this.reviews = data.map(r => ({ userName: r.userName, text: r.text }));
      },
      error: err => console.error('❌ Error cargando reseñas:', err)
    });
  }

  addReview(): void {
    const user = this.auth.getCurrentUser();
    if (!user || !this.newReview.trim()) return;

    const userReviews = this.reviews.filter(r => r.userName === (user.name || 'Anónimo'));

    if (userReviews.length >= 3) {
      alert('⚠️ Solo puedes publicar un máximo de 3 reseñas por juego.');
      return;
    }

    const reviewPayload = {
      userId: user.id,
      userName: user.name || 'Anónimo',
      text: this.newReview.trim()
    };

    this.reviewService.addReview(this.gameId, reviewPayload).subscribe({
      next: savedReview => {
        this.reviews.unshift({ userName: savedReview.userName, text: savedReview.text });
        this.newReview = '';
      },
      error: err => console.log('❌ Error al agregar reseña:', err)
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
