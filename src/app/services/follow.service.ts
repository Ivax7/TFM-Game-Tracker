import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FollowService {
  // ✅ URL correcta con /api
  private apiUrl = 'http://localhost:3000/api/follows';

  constructor(private http: HttpClient) {}

  isFollowing(followerId: number, followingId: number) {
    return this.http.get<boolean>(`${this.apiUrl}/${followerId}/is-following/${followingId}`);
  }

  follow(followerId: number, followingId: number) {
    return this.http.post(`${this.apiUrl}/${followerId}/${followingId}`, {});
  }

  unfollow(followerId: number, followingId: number) {
    return this.http.delete(`${this.apiUrl}/${followerId}/${followingId}`);
  }

  getFollowersCount(userId: number) {
    return this.http.get<number>(`${this.apiUrl}/followers/${userId}`);
  }

  getFollowingCount(userId: number) {
    return this.http.get<number>(`${this.apiUrl}/following/${userId}`);
  }


}
