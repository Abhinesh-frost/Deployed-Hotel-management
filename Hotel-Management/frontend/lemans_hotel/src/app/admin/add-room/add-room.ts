import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { PopupService } from '../../popup/popup.service';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css',
})
export class AddRoom {
  room = {
    type: 'Royal Suite',
    price: null as number | null,
    description: ''
  };

  selectedFile: File | null = null;
  selectedFileName: string = '';
  imagePreview: string | null = null;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private popupService: PopupService
  ) { }

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

  isFormValid(): boolean {
    return !!(
      this.room.type &&
      this.room.price &&
      this.room.price > 0 &&
      this.room.description &&
      this.room.description.length >= 10 &&
      this.selectedFile
    );
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.popupService.showError('Please fill all fields and select an image.');
      return;
    }

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('roomType', this.room.type);
    formData.append('description', this.room.description);
    formData.append('price', String(this.room.price));
    formData.append('available', 'true');
    formData.append('image', this.selectedFile!);

    console.log('Adding room with image...');
    this.adminService.addRoom(formData).subscribe({
      next: (response: any) => {
        console.log('Room added successfully', response);
        this.popupService.showSuccess('Room added successfully!');
        this.router.navigate(['/admin/manage-rooms']);
      },
      error: (error: any) => {
        console.error('Error adding room', error);
        this.popupService.showError('Failed to add room. Please try again.');
      }
    });
  }
}
