import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { PopupService } from '../../popup/popup.service';

@Component({
  selector: 'app-add-dish',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-dish.html',
  styleUrl: './add-dish.css',
})
export class AddDish {
  cuisine = {
    cuisineName: '',
    pricePerPerson: null,
    description: '',
    image: '' // Now stores URL
  };

  constructor(
    private router: Router,
    private adminService: AdminService,
    private popupService: PopupService
  ) { }

  onSubmit() {
    console.log('Adding cuisine:', this.cuisine);
    this.adminService.addCuisine(this.cuisine).subscribe({
      next: (response: any) => {
        console.log('Cuisine added successfully', response);
        this.popupService.showSuccess('Cuisine added successfully!');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error: any) => {
        console.error('Error adding cuisine', error);
        this.popupService.showError('Failed to add cuisine. Please try again.');
      }
    });
  }
}
