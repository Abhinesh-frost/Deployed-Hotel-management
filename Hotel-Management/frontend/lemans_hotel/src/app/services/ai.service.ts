import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AIRequest {
    prompt: string;
}

export interface AIResponse {
    response: string;
}

@Injectable({
    providedIn: 'root'
})
export class AiService {
    private apiUrl = '/api/ai';

    constructor(private http: HttpClient) { }

    sendUserMessage(message: string): Observable<AIResponse> {
        const request: AIRequest = { prompt: message };
        return this.http.post<string>(`${this.apiUrl}/user/chat`, request, { responseType: 'text' as 'json' })
            .pipe(
                map(response => ({ response: response }))
            );
    }

    sendAdminMessage(message: string): Observable<AIResponse> {
        const request: AIRequest = { prompt: message };
        return this.http.post<string>(`${this.apiUrl}/admin/chat`, request, { responseType: 'text' as 'json' })
            .pipe(
                map(response => ({ response: response }))
            );
    }
}
