import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService, BookingResponse } from '../services/booking.service';
import { jsPDF } from 'jspdf';

@Component({
    selector: 'app-my-bookings',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './my-bookings.html',
    styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {
    bookings: BookingResponse[] = [];
    loading = true;
    errorMessage = '';

    constructor(private bookingService: BookingService) { }

    ngOnInit() {
        this.loadBookings();
    }

    loadBookings() {
        this.loading = true;
        this.errorMessage = '';

        this.bookingService.getUserBookings().subscribe({
            next: (bookings) => {
                console.log('✅ Bookings loaded successfully:', bookings);
                this.bookings = bookings;
                this.loading = false;
            },
            error: (err) => {
                console.error('❌ Error loading bookings:', err);
                if (err.status === 0) {
                    this.errorMessage = 'Cannot connect to backend. Make sure your Spring Boot app is running.';
                } else if (err.status === 401) {
                    this.errorMessage = 'Please login to view your bookings.';
                } else {
                    this.errorMessage = `Failed to load bookings. Error: ${err.status}`;
                }
                this.loading = false;
            }
        });
    }

    getStatusClass(status: string): string {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'status-confirmed';
            case 'pending':
                return 'status-pending';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return 'status-default';
        }
    }

    downloadPDF(booking: BookingResponse) {
        const doc = new jsPDF();

        // Elegant double border
        doc.setDrawColor(184, 134, 11);
        doc.setLineWidth(1.5);
        doc.rect(10, 10, 190, 277);
        doc.setLineWidth(0.5);
        doc.rect(12, 12, 186, 273);

        // Hotel Name
        doc.setFontSize(28);
        doc.setTextColor(25, 25, 25);
        doc.setFont('helvetica', 'bold');
        doc.text('LE MANS HOTEL', 105, 30, { align: 'center' });

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'italic');
        doc.text('Premium Luxury Since 1890', 105, 38, { align: 'center' });

        // Decorative line
        doc.setDrawColor(184, 134, 11);
        doc.setLineWidth(0.8);
        doc.line(40, 43, 170, 43);

        // Receipt Title
        doc.setFontSize(16);
        doc.setTextColor(25, 25, 25);
        doc.setFont('helvetica', 'bold');
        doc.text('BOOKING RECEIPT', 105, 53, { align: 'center' });

        // Booking ID Box
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(20, 60, 170, 12, 2, 2, 'F');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text(`Booking ID: #${booking.id}`, 105, 68, { align: 'center' });

        // Status Badge
        let statusColor = [158, 158, 158];
        const status = booking.bookingStatus.toUpperCase();
        if (status === 'CONFIRMED') statusColor = [76, 175, 80];
        else if (status === 'PENDING') statusColor = [255, 193, 7];
        else if (status === 'CANCELLED') statusColor = [244, 67, 54];

        doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
        doc.roundedRect(75, 76, 60, 8, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text(status, 105, 81, { align: 'center' });

        // Details Section
        let yPos = 95;
        const leftCol = 25;

        doc.setFontSize(12);
        doc.setTextColor(184, 134, 11);
        doc.setFont('helvetica', 'bold');
        doc.text('BOOKING DETAILS', leftCol, yPos);
        doc.setDrawColor(184, 134, 11);
        doc.setLineWidth(0.5);
        doc.line(leftCol, yPos + 2, 185, yPos + 2);
        yPos += 12;

        // Room
        if (booking.room?.roomType) {
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.setFont('helvetica', 'normal');
            doc.text('Room Type:', leftCol, yPos);
            doc.setTextColor(25, 25, 25);
            doc.setFont('helvetica', 'bold');
            doc.text(booking.room.roomType, leftCol, yPos + 6);
            yPos += 16;
        }

        // Cuisine
        if (booking.dish?.cuisineName) {
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.setFont('helvetica', 'normal');
            doc.text('Cuisine:', leftCol, yPos);
            doc.setTextColor(25, 25, 25);
            doc.setFont('helvetica', 'bold');
            doc.text(booking.dish.cuisineName, leftCol, yPos + 6);
            yPos += 16;
        }

        // Dates
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('Check-in Date:', leftCol, yPos);
        doc.setTextColor(25, 25, 25);
        doc.setFont('helvetica', 'bold');
        doc.text(booking.checkInDate, leftCol, yPos + 6);
        yPos += 16;

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('Check-out Date:', leftCol, yPos);
        doc.setTextColor(25, 25, 25);
        doc.setFont('helvetica', 'bold');
        doc.text(booking.checkOutDate, leftCol, yPos + 6);
        yPos += 16;

        // Guests
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('Number of Guests:', leftCol, yPos);
        doc.setTextColor(25, 25, 25);
        doc.setFont('helvetica', 'bold');
        doc.text(`${booking.noOfPerson} ${booking.noOfPerson === 1 ? 'Person' : 'Persons'}`, leftCol, yPos + 6);
        yPos += 20;

        // Total Cost Box
        doc.setFillColor(255, 250, 240);
        doc.setDrawColor(184, 134, 11);
        doc.setLineWidth(1);
        doc.roundedRect(20, yPos, 170, 20, 3, 3, 'FD');
        doc.setFontSize(12);
        doc.setTextColor(184, 134, 11);
        doc.setFont('helvetica', 'bold');
        doc.text('TOTAL AMOUNT', 30, yPos + 8);
        doc.setFontSize(18);
        doc.setTextColor(25, 25, 25);
        doc.text(`$${booking.totalCost.toFixed(2)}`, 180, yPos + 13, { align: 'right' });

        // Footer
        yPos = 260;
        doc.setDrawColor(184, 134, 11);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 190, yPos);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'italic');
        doc.text('Thank you for choosing Le Mans Hotel', 105, yPos + 8, { align: 'center' });
        doc.text('We look forward to welcoming you', 105, yPos + 14, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Le Mans Hotel | Premium Luxury Since 1890', 105, yPos + 22, { align: 'center' });

        doc.save(`Le-Mans-Hotel-Booking-${booking.id}.pdf`);
    }

    logout() {
        // Clear any stored tokens or user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page
        window.location.href = '/login';
    }
}
