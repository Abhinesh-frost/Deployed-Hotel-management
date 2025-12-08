import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { PopupService } from '../../popup/popup.service';

@Component({
    selector: 'app-edit-room',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './edit-room.html',
    styleUrl: './edit-room.css',
})
export class EditRoom implements OnInit {
    roomId: number = 0;
    room = {
        roomType: 'Royal Suite',
        price: null as number | null,
        description: '',
        available: true
    };
    loading = true;

    // Image handling
    currentImageUrl: string | null = null;
    selectedFile: File | null = null;
    selectedFileName: string = '';
    imagePreview: string | null = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private adminService: AdminService,
        private popupService: PopupService
    ) { }

    ngOnInit() {
        this.roomId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadRoom();
    }

    loadRoom() {
        this.loading = true;
        this.adminService.getRoomById(this.roomId).subscribe({
            next: (data: any) => {
                this.room = {
                    roomType: data.roomType,
                    price: data.price,
                    description: data.description || '',
                    available: data.available ?? true
                };
                // Set current image URL if room has image data
                if (data.imageData || data.imageName) {
                    this.currentImageUrl = this.adminService.getRoomImageUrl(this.roomId);
                }
                this.loading = false;
            },
            error: (error: any) => {
                console.error('Error loading room', error);
                this.popupService.showError('Failed to load room details.');
                this.loading = false;
            }
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            this.selectedFileName = this.selectedFile.name;

            // Create image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target?.result as string;
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    removeImage() {
        this.selectedFile = null;
        this.selectedFileName = '';
        this.imagePreview = null;
    }

    onSubmit() {
        // Create FormData for multipart upload
        const formData = new FormData();
        formData.append('roomType', this.room.roomType);
        formData.append('description', this.room.description);
        formData.append('price', String(this.room.price));
        formData.append('available', String(this.room.available));

        // Only append image if a new one was selected
        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }

        console.log('Updating room:', this.roomId);
        this.adminService.updateRoom(this.roomId, formData).subscribe({
            next: (response: any) => {
                console.log('Room updated successfully', response);
                this.popupService.showSuccess('Room updated successfully!');
                this.router.navigate(['/admin/manage-rooms']);
            },
            error: (error: any) => {
                console.error('Error updating room', error);
                this.popupService.showError('Failed to update room. Please try again.');
            }
        });
    }
}
