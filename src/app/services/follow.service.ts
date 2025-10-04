import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private apiUrl = 'http://localhost:3000/api/follows';

  constructor(private http: HttpClient) {}

  getFollowersCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/followers/${userId}`);
  }

  getFollowingCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/following/${userId}`);
  }

  follow(followerId: number, followedId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${followerId}/${followedId}`, {});
  }

  unfollow(followerId: number, followedId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${followerId}/${followedId}`);
  }

  isFollowing(followerId: number, followedId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-following/${followerId}/${followedId}`);
  }

}