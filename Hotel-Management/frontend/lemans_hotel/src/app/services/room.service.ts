import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private apiUrl = '/user/rooms';

    constructor(private http: HttpClient) { }

    // Get all rooms
    getAllRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.apiUrl);
    }

    // Get room by ID
    getRoomById(id: number): Observable<Room> {
        return this.http.get<Room>(`${this.apiUrl}/${id}`);
    }

    // Get available rooms
    getAvailableRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(`${this.apiUrl}/available`);
    }

    // Get room image URL (served from public endpoint - no auth required)
    getRoomImageUrl(roomId: number): string {
        return `http://localhost:8080/public/rooms/${roomId}/image`;
    }
}
