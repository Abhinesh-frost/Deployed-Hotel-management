import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './history.html',
    styleUrl: './history.css'
})
export class History {
    constructor(private router: Router) { }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    timeline = [
        {
            year: '1890',
            title: 'Grand Opening',
            description: 'Le Mans Hotel opens its doors, welcoming European aristocracy and dignitaries.'
        },
        {
            year: '1925',
            title: 'Art Deco Renovation',
            description: 'The hotel undergoes a major renovation, embracing the glamorous Art Deco style.'
        },
        {
            year: '1950',
            title: 'Royal Visit',
            description: 'Her Majesty Queen Elizabeth II stays at the Presidential Suite during her state visit.'
        },
        {
            year: '1985',
            title: 'Historic Landmark Status',
            description: 'The building is designated as a national historic landmark, preserving its architectural heritage.'
        },
        {
            year: '2020',
            title: 'Modern Luxury',
            description: 'A comprehensive restoration blends classic elegance with state-of-the-art modern amenities.'
        }
    ];
}
