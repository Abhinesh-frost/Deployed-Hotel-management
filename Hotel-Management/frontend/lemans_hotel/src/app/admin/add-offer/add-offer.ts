import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { PopupService } from '../../popup/popup.service';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-offer.html',
  styleUrl: './add-offer.css',
})
export class AddOffer {
  offer = {
    title: '',
    description: ''
  };

  constructor(
    private router: Router,
    private adminService: AdminService,
    private popupService: PopupService
  ) { }

  onSubmit() {
    console.log('Adding offer:', this.offer);
    this.adminService.addOffer(this.offer).subscribe({
      next: (response: any) => {
        console.log('Offer added successfully', response);
        this.popupService.showSuccess('Offer added successfully!');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error: any) => {
        console.error('Error adding offer', error);
        this.popupService.showError('Failed to add offer. Please try again.');
      }
    });
  }
}
