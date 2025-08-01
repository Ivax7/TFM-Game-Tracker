import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) 
export class GameService {
  // RAWG - API
  private apiUrl = 'https://api.rawg.io/api';
  private apiKey = '98cf656e3b054483a3d2edafaa6cae58';

  constructor(private http: HttpClient) {}

  // Main page
  getTopRatesGames(page: number = 1): Observable<any> {
  const todayDate = new Date();
  const today = todayDate.toISOString().split('T')[0];
  
  const lastMonthDate = new Date(todayDate);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 2);
  const lastMonth = lastMonthDate.toISOString().split('T')[0];

  const nextMonthDate = new Date(todayDate);
  lastMonthDate.setMonth(nextMonthDate.getMonth() + 2);
  const nextMonth = nextMonthDate.toISOString().split('T')[0];

  const params = new HttpParams()
    .set('key', this.apiKey)
    .set('ordering', 'recent')
    .set('page_size', '100')
    .set('metacritic', '0, 100')
    .set('dates', `${lastMonth},${nextMonth}`)

  return this.http.get(`${this.apiUrl}/games`, { params });
}

  // Search Bar
  searchGames(query: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', query)
      .set('page_size', '20')
      .set('page', page);

    return this.http.get(`${this.apiUrl}/games`, { params });
  }

  // Game x Id
  getGameDetails(id: string): Observable<any> {
  const params = new HttpParams().set('key', this.apiKey);
  return this.http.get(`${this.apiUrl}/games/${id}`, { params });
  }
  
  // HL2B
  getGameWithPlaytime(slug: string): Observable<any> {
    return this.http.get(`/api/games/${slug}/playtime`);
  }


}


