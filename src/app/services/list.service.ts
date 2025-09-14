import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:3000/lists';

  constructor(private http: HttpClient) {}

  createList(userId: number, list: { title: string; description: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { userId, ...list });
  }

  getUserLists(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  addGameToList(userId: number, listId: number, game: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${listId}/games`, {
      userId,
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image
    });
  }

  deleteList(listId: number) {
    return this.http.delete(`${this.apiUrl}/${listId}`);
  }

}
