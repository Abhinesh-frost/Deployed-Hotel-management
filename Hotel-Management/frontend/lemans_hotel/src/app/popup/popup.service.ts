import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface PopupState {
    isOpen: boolean;
    message: string;
    type: 'success' | 'error' | 'confirm' | 'info';
    title?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    private stateSubject = new BehaviorSubject<PopupState>({
        isOpen: false,
        message: '',
        type: 'info'
    });

    state$ = this.stateSubject.asObservable();

    // For confirmation dialogs
    private confirmSubject = new Subject<boolean>();

    showSuccess(message: string, title: string = 'Success') {
        this.stateSubject.next({ isOpen: true, message, type: 'success', title });
    }

    showError(message: string, title: string = 'Error') {
        this.stateSubject.next({ isOpen: true, message, type: 'error', title });
    }

    showInfo(message: string, title: string = 'Info') {
        this.stateSubject.next({ isOpen: true, message, type: 'info', title });
    }

    confirm(message: string, title: string = 'Confirm'): Subject<boolean> {
        this.stateSubject.next({ isOpen: true, message, type: 'confirm', title });
        this.confirmSubject = new Subject<boolean>();
        return this.confirmSubject;
    }

    close() {
        this.stateSubject.next({ ...this.stateSubject.value, isOpen: false });
    }

    onConfirm() {
        this.confirmSubject.next(true);
        this.confirmSubject.complete();
        this.close();
    }

    onCancel() {
        this.confirmSubject.next(false);
        this.confirmSubject.complete();
        this.close();
    }
}
