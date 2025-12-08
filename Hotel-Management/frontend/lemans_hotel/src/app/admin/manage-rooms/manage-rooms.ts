import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-manage-rooms',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './manage-rooms.html',
    styleUrl: './manage-rooms.css'
})
export class ManageRooms implements OnInit {
    rooms: any[] = [];
    loading = true;
    errorMessage = '';

    private defaultImage = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400';

    constructor(
        private adminService: AdminService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadRooms();
    }

    loadRooms() {
        this.loading = true;
        this.errorMessage = '';
        this.adminService.getAllRooms().subscribe({
            next: (data) => {
                this.rooms = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading rooms:', err);
                this.errorMessage = 'Failed to load rooms.';
                this.loading = false;
            }
        });
    }

    getRoomImageUrl(roomId: number): string {
        return this.adminService.getRoomImageUrl(roomId);
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = this.defaultImage;
    }

    editRoom(roomId: number) {
        this.router.navigate(['/admin/edit-room', roomId]);
    }
}
