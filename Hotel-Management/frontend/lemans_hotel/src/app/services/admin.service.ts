import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    // ✅ FIXED: Full backend API URL
    private baseUrl = 'http://localhost:8080/admin';

    constructor(private http: HttpClient) { }

    // ✅ GET TOKEN HEADER
    private getHeaders() {
        const token = localStorage.getItem('token');

        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    addOffer(offer: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/offers/add`, offer, {
            headers: this.getHeaders()
        });
    }

    addCuisine(cuisine: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/dishes/add`, cuisine, {
            headers: this.getHeaders()
        });
    }

    // Room operations with image upload
    addRoom(roomData: FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}/rooms`, roomData, {
            headers: this.getHeaders()
        });
    }

    updateRoom(id: number, roomData: FormData): Observable<any> {
        return this.http.put(`${this.baseUrl}/rooms/${id}`, roomData, {
            headers: this.getHeaders()
        });
    }

    getAllOffers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/offers/all`, {
            headers: this.getHeaders()
        });
    }

    getAllRooms(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/rooms`, {
            headers: this.getHeaders()
        });
    }

    getRoomById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/rooms/${id}`, {
            headers: this.getHeaders()
        });
    }

    getRoomImageUrl(roomId: number): string {
        return `http://localhost:8080/public/rooms/${roomId}/image`;
    }

    deleteRoom(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/rooms/${id}`, {
            headers: this.getHeaders()
        });
    }
}
