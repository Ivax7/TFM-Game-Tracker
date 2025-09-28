import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getStoredUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  private setStoredUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  register(userData: { email: string, password: string, name?: string }) {
    return this.http.post(`${this.baseUrl}/users/register`, userData).pipe(tap(user => this.setStoredUser(user))
    );
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((user: any) => this.setStoredUser(user))
    );
  }


  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getCurrentUser() {
    return this.userSubject.value
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  updateCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    // emit new value to every user$ subscriber
    this.userSubject.next(user); // updateamos la info del user
  }

}