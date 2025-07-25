// auth.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://loja-virtual-8juo.onrender.com/auth';
  private jwtHelper = new JwtHelperService();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        if (this.isBrowser) {
          localStorage.setItem('token', res.token);
          const decoded = this.jwtHelper.decodeToken(res.token);
          localStorage.setItem('userRole', decoded.role);
        }
      })
    );
  }

  register(user: { username: string; password: string; role: string }) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }
  }

  getUserRole(): string | null {
    return this.isBrowser ? localStorage.getItem('userRole') : null;
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
}
