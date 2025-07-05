import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) 
export class GameService {
  private apiUrl = 'https://api.rawg.io/api';
  private apiKey = '98cf656e3b054483a3d2edafaa6cae58';

  constructor(private http: HttpClient) {}

getTopRatesGames(page: number = 1): Observable<any> {
  const today = new Date().toISOString().split('T')[0];

  const params = new HttpParams()
    .set('key', this.apiKey)
    .set('ordering', '-rating')
    .set('page_size', '100')
    .set('dates', `1900-01-01,${today}`)

  return this.http.get(`${this.apiUrl}/games`, { params });
}

}
