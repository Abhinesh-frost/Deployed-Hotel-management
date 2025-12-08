import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Cuisine {
    id: number;
    name: string;
    restaurant: string;
    description: string;
    image: string;
    specialties: string[];
}

@Component({
    selector: 'app-cuisine-selection-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cuisine-selection-modal.html',
    styleUrl: './cuisine-selection-modal.css'
})
export class CuisineSelectionModal {
    @Input() isOpen = false;
    @Input() roomId: number | null = null;
    @Output() closeModal = new EventEmitter<void>();
    @Output() cuisineSelected = new EventEmitter<Cuisine>();

    cuisines: Cuisine[] = [
        {
            id: 1,
            name: 'French',
            restaurant: 'Le Petit Palais',
            description: 'Classic French haute cuisine in an elegant setting.',
            image: 'french_cuisine.png',
            specialties: ['Coq au Vin', 'Bouillabaisse', 'Crème Brûlée', 'Escargots de Bourgogne', 'Ratatouille']
        },
        {
            id: 2,
            name: 'Italian',
            restaurant: 'Bella Vista',
            description: 'Authentic Italian flavors with a modern twist.',
            image: 'italian_cuisine.png',
            specialties: ['Osso Buco', 'Truffle Risotto', 'Tiramisu', 'Carbonara', 'Caprese Salad']
        },
        {
            id: 3,
            name: 'Japanese',
            restaurant: 'Sakura Zen',
            description: 'Traditional sushi and kaiseki dining experience.',
            image: 'japanese_cuisine.png',
            specialties: ['Omakase Sushi', 'Wagyu Beef', 'Matcha Desserts', 'Tempura', 'Ramen']
        },
        {
            id: 4,
            name: 'Indian',
            restaurant: 'The Spice Route',
            description: 'A culinary journey through the rich flavors of India.',
            image: 'indian_cuisine.png',
            specialties: ['Butter Chicken', 'Lamb Rogan Josh', 'Biryani', 'Palak Paneer', 'Tandoori Chicken']
        },
        {
            id: 5,
            name: 'Chinese',
            restaurant: 'Golden Dragon',
            description: 'Exquisite Cantonese and Szechuan dishes.',
            image: 'chinese_cuisine.png',
            specialties: ['Peking Duck', 'Dim Sum', 'Kung Pao Chicken', 'Mapo Tofu', 'Spring Rolls']
        }
    ];

    constructor() { }

    ngOnInit() { }

    getImageUrl(image: string): string {
        return 'assets/' + image;
    }

    close() {
        this.isOpen = false;
        this.closeModal.emit();
    }

    selectCuisine(cuisine: Cuisine) {
        this.cuisineSelected.emit(cuisine);
    }
}
