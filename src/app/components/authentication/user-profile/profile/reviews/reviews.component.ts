import { Component, OnInit } from '@angular/core';
import { UserGameService } from '../../../../../services/user-game.service';
import { AuthService } from '../../../auth.service';
import { ReviewService } from '../../../../../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  userReviews: any[] = [];

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
  const userId = this.auth.getCurrentUser()?.id;
  if (!userId) return;

  this.reviewService.getReviewsByUser(userId).subscribe({
    next: (reviews) => {
      this.userReviews = reviews;
      console.log('✅ Reviews cargadas:', reviews);
    },
    error: (err) => console.log('❌ Error cargando reviews', err)
    });
  }


}
