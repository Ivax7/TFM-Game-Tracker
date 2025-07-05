import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(userData: { email: string, password: string, name?: string }) {
    return this.http.post(`${this.baseUrl}/users/register`, userData);
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }
}