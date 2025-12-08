import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
    token: string;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/auth';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify({ email: response.email, role: response.role }));
                }
            })
        );
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, { username, email, password }, { responseType: 'text' });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getRole(): string | null {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user).role;
        }
        return null;
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/forgotPassword`, { email }, { responseType: 'text' });
    }

    verifyOtp(email: string, otp: string, newPassword: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/verifyOtp`, { email, otp, newPassword }, { responseType: 'text' });
    }
}
