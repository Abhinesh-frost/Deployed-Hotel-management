import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.model';
import { BookingModal } from '../booking-modal/booking-modal';
import { CuisineSelectionModal, Cuisine } from '../cuisine-selection-modal/cuisine-selection-modal';

@Component({
    selector: 'app-rooms',
    standalone: true,
    imports: [CommonModule, BookingModal, CuisineSelectionModal],
    templateUrl: './rooms.html',
    styleUrl: './rooms.css'
})
export class Rooms implements OnInit {
    rooms: Room[] = [];
    loading = true;
    errorMessage = '';
    debugInfo = '';

    private defaultImage = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400';

    // Two-step booking flow state
    showCuisineModal = false;
    showBookingModal = false;
    selectedRoomId: number | null = null;
    selectedCuisine: Cuisine | null = null;

    constructor(private roomService: RoomService) { }

    ngOnInit() {
        this.loadRooms();
    }

    loadRooms() {
        this.loading = true;
        this.errorMessage = '';
        this.debugInfo = 'Attempting to fetch rooms...';

        this.roomService.getAllRooms().subscribe({
            next: (rooms) => {
                console.log('✅ Rooms loaded successfully:', rooms);
                this.rooms = rooms;
                this.loading = false;
                this.debugInfo = `Successfully loaded ${this.rooms.length} rooms`;
            },
            error: (err) => {
                console.error('❌ Error loading rooms:', err);

                if (err.status === 0) {
                    this.errorMessage = 'Cannot connect to backend. Make sure your Spring Boot app is running on port 8080.';
                    this.debugInfo = 'CORS or Network Error - Backend not reachable';
                } else if (err.status === 401) {
                    this.errorMessage = 'Authentication required. Please login again.';
                    this.debugInfo = '401 Unauthorized - Token might be invalid or expired';
                } else if (err.status === 403) {
                    this.errorMessage = 'Access forbidden. You may not have permission to view rooms.';
                    this.debugInfo = '403 Forbidden - Check user role/permissions';
                } else if (err.status === 404) {
                    this.errorMessage = 'Rooms endpoint not found. Check backend URL.';
                    this.debugInfo = '404 Not Found - Endpoint does not exist';
                } else {
                    this.errorMessage = `Failed to load rooms. Error: ${err.status} - ${err.statusText}`;
                    this.debugInfo = `HTTP ${err.status}: ${err.message}`;
                }

                this.loading = false;
            }
        });
    }

    getRoomImageUrl(roomId: number): string {
        return this.roomService.getRoomImageUrl(roomId);
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = this.defaultImage;
    }

    // Step 1: User clicks "Book Now" on a room
    bookRoom(roomId: number) {
        this.selectedRoomId = roomId;
        this.showCuisineModal = true;
    }

    // Step 2: User selects a cuisine
    onCuisineSelected(cuisine: Cuisine) {
        this.selectedCuisine = cuisine;
        this.showCuisineModal = false;
        this.showBookingModal = true;
    }

    closeCuisineModal() {
        this.showCuisineModal = false;
        this.selectedRoomId = null;
    }

    closeBookingModal() {
        this.showBookingModal = false;
        this.selectedRoomId = null;
        this.selectedCuisine = null;
    }

    onBookingSuccess() {
        console.log('Booking successful!');
        // Optionally refresh rooms or show success message
    }

    logout() {
        // Clear any stored tokens or user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page
        window.location.href = '/login';
    }
}
