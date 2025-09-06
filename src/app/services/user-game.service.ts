import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { switchMap } from "rxjs";
import { UpdateUserGameDto } from "../models/update-user-game.dto";
import { EnrichedGame } from "../models/enriched-game.model";

@Injectable({ providedIn: 'root' })
export class UserGameService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addToWishlist(userId: number, game: any) {
    return this.http.post(`${this.apiUrl}/wishlist`, {
      userId,
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image,
    });
  }

  getWishlist(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/wishlist/${userId}`);
  }


  removeFromWishlist(userId: number, gameId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/wishlist/${userId}/${gameId}`);
  }


  updateGameStatus(userId: number, payload: UpdateUserGameDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/user-game/${userId}/status`, payload);
  }


  getGamesByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user-game/${userId}`);
  }

  getEnrichedGamesByUser(userId: number): Observable<EnrichedGame[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user-game/enriched/${userId}`);
  }


  updateRating(userId: number, gameId: number, rating: number) {
    return this.http.patch(`${this.apiUrl}/user-game/${userId}/rating`, { gameId, rating });
  }


}

