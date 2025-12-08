import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-premium-services',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './premium-services.html',
    styleUrl: './premium-services.css'
})
export class PremiumServices {
    constructor(private router: Router) { }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    services = [
        {
            title: 'Private Concierge',
            description: 'Our dedicated concierge team is available 24/7 to fulfill your every request, from theater tickets to private jet charters.',
            icon: '🛎️'
        },
        {
            title: 'Chauffeur Service',
            description: 'Travel in style with our fleet of luxury vehicles, available for airport transfers and city tours.',
            icon: '🚗'
        },
        {
            title: 'In-Suite Spa',
            description: 'Relax and rejuvenate with personalized spa treatments delivered in the comfort and privacy of your suite.',
            icon: '💆‍♀️'
        },
        {
            title: 'Personal Shopper',
            description: 'Gain exclusive access to the city’s finest boutiques with our expert personal shopping service.',
            icon: '🛍️'
        },
        {
            title: 'Butler Service',
            description: 'Experience the ultimate in personalized care with our professional butler service, anticipating your needs before you do.',
            icon: '🤵'
        },
        {
            title: 'Private Dining',
            description: 'Enjoy a bespoke culinary experience with a private chef preparing meals in your suite or a secluded location.',
            icon: '🍽️'
        }
    ];
}
