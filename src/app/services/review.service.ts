import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getReviews(gameId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/game/${gameId}`);
  }

  addReview(gameId: number, review: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reviews/game/${gameId}`, review);
  }

  getReviewsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/user/${userId}`);
  }



}
