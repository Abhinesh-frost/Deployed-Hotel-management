import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService, PopupState } from './popup.service';

@Component({
    selector: 'app-popup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './popup.component.html',
    styleUrl: './popup.component.css'
})
export class PopupComponent {
    state: PopupState = { isOpen: false, message: '', type: 'info' };

    constructor(public popupService: PopupService) {
        this.popupService.state$.subscribe(state => {
            this.state = state;
        });
    }

    close() {
        this.popupService.close();
    }

    confirm() {
        this.popupService.onConfirm();
    }

    cancel() {
        this.popupService.onCancel();
    }
}
