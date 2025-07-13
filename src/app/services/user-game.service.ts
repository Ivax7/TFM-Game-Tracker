import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

  getWishlist(userId: number) {
    return this.http.get(`${this.apiUrl}/wishlist/${userId}`);
  }

  getPlayed(userId: number) {
    return this.http.get(`${this.apiUrl}/played/${userId}`);
  }
}
