import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-suites',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './suites.html',
    styleUrl: './suites.css'
})
export class Suites {
    constructor(private router: Router) { }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    suites = [
        {
            name: 'Presidential Suite',
            size: '150 m²',
            features: ['King Bed', 'Living Room', 'Private Balcony', 'Butler Service'],
            description: 'The epitome of luxury, featuring panoramic city views and bespoke furnishings.'
        },
        {
            name: 'Signature Suite',
            size: '120 m²',
            features: ['King Bed', 'Dining Area', 'Spa Bathroom', 'Work Desk'],
            description: 'Elegant and spacious with modern amenities and classic sophistication.'
        },
        {
            name: 'Deluxe Suite',
            size: '80 m²',
            features: ['Queen Bed', 'Sitting Area', 'Premium Linens', 'Coffee Bar'],
            description: 'Contemporary comfort meets timeless elegance in our deluxe accommodations.'
        },
        {
            name: 'Executive Suite',
            size: '95 m²',
            features: ['King Bed', 'Office Space', 'Meeting Area', 'Minibar'],
            description: 'Perfect for business travelers seeking comfort and functionality.'
        }
    ];
}
