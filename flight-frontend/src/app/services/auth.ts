import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';

const AUTH_API = 'http://localhost:8085'; // API Gateway or Auth Service

@Injectable({ providedIn: 'root' })
export class AuthService {
private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) {}
   forgotPassword(email: string) {
    return this.http.post(
      `${this.baseUrl}/forgot-password`,
      null,
      { params: { email } }
    );
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(
      `${this.baseUrl}/reset-password`,
      null,
      { params: { token, newPassword } ,
    responseType: 'text'}
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(`${AUTH_API}/login`, data
      ,{
        responseType:'text'
      }
    ).pipe(
      tap((token:string)=>{
        localStorage.setItem('auth-token',token);
      }),
      switchMap(()=>this.http.get<any>(`${AUTH_API}/me`)),
      tap((user)=>{
        localStorage.setItem('username',user.username);
        localStorage.setItem('email',user.email);
      })
    )
  }
  
  googleLogin(token: string) {
  return this.http.post<any>(
    `${AUTH_API}/google`,
    { token }
  );
}


discordLogin(code: string) {
  return this.http.post(
    'http://localhost:8085/discord',
    { code }
  );
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

changePassword(data: any) {
  return this.http.post(
    'http://localhost:8085/change-password',
    data,
    { responseType: 'text' }
  );
}


}
