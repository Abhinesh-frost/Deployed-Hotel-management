import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, BookingResponse } from '../../services/booking.service';

import { PopupService } from '../../popup/popup.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css'
})
export class AdminBookings implements OnInit {
  bookings: BookingResponse[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private bookingService: BookingService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.errorMessage = 'Failed to load bookings.';
        this.loading = false;
      }
    });
  }

  updateStatus(bookingId: number, status: string) {
    this.popupService.confirm(`Are you sure you want to mark this booking as ${status}?`, 'Update Status').subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.bookingService.updateBookingStatus(bookingId, status).subscribe({
          next: () => {
            // Update local state
            const booking = this.bookings.find(b => b.id === bookingId);
            if (booking) {
              booking.bookingStatus = status;
            }
            this.popupService.showSuccess(`Booking marked as ${status}`);
          },
          error: (err) => {
            console.error('Error updating status:', err);
            this.popupService.showError('Failed to update status.');
          }
        });
      }
    });
  }
}
