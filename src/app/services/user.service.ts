import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // 👈 ajusta si usas proxy

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, data: { displayName?: string; bio?: string; name?:string; }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  uploadAvatar(id: number, formData: FormData) {
    return this.http.patch<any>(`${this.apiUrl}/${id}/avatar`, formData);
  }
}
