import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookingService, BookingResponse } from '../../services/booking.service';
import { AdminService } from '../../services/admin.service';
import { PopupService } from '../../popup/popup.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  totalBookings = 0;
  totalRevenue = 0;
  activeBookings = 0;
  recentBookings: BookingResponse[] = [];
  offers: any[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private bookingService: BookingService,
    private adminService: AdminService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.loadDashboardData();
    this.loadOffers();
  }

  loadDashboardData() {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        this.totalBookings = bookings.length;
        this.totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalCost, 0);
        this.activeBookings = bookings.filter(b => b.bookingStatus === 'CONFIRMED').length;
        this.recentBookings = bookings.slice(0, 5); // Get first 5
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.loading = false;
      }
    });
  }

  loadOffers() {
    this.adminService.getAllOffers().subscribe({
      next: (data) => {
        this.offers = data;
      },
      error: (err) => {
        console.error('Error loading offers:', err);
      }
    });
  }

  cancelBooking(bookingId: number) {
    this.popupService.confirm('Are you sure you want to cancel this booking?', 'Cancel Booking').subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.bookingService.updateBookingStatus(bookingId, 'CANCELLED').subscribe({
          next: () => {
            this.popupService.showSuccess('Booking cancelled successfully');
            this.loadDashboardData();
          },
          error: (err) => {
            console.error('Error cancelling booking:', err);
            this.popupService.showError('Failed to cancel booking');
          }
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
