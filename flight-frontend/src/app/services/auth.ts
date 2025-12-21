import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const AUTH_API = 'http://localhost:8085'; // API Gateway or Auth Service

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${AUTH_API}/login`, data
      ,{
        responseType:'text'
      }
    ).pipe(
      tap((token:string)=>{
        localStorage.setItem('auth-token',token);
      })
    )
  }

  register(data: any): Observable<any> {
    return this.http.post(`${AUTH_API}/register`, data, { responseType: 'text' });
  }
  getRole(): string | null {
  const token = localStorage.getItem('auth-token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // ROLE_ADMIN / ROLE_USER
  } catch {
    return null;
  }
}

  // logout() {
  //   localStorage.removeItem('token');
  // }

  isAdmin(): boolean {
  return this.getRole() === 'ROLE_ADMIN';
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('auth-token');
}

logout() {
  localStorage.removeItem('auth-token');
}

}
