import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserGameService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addToWishlist(userId: number, game: any) {
    return this.http.post(`${this.apiUrl}/wishlist`, {
      userId,
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image
    });
  }

  markAsPlayed(userId: number, game: any) {
    return this.http.post(`${this.apiUrl}/played`, {
      userId,
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image
    });
  }

  getWishlist(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/wishlist/${userId}`);
  }

  getPlayed(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/played/${userId}`);
  }

  removeFromWishlist(userId: number, gameId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/wishlist/${userId}/${gameId}`);
  }

  unmarkAsPlayed(userId: number, gameId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/played/${userId}/${gameId}`);
  }

}

