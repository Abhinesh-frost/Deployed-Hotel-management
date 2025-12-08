import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminRedirectGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = authService.getRole();

    // If user is admin, redirect to admin dashboard
    if (role === 'ADMIN') {
        router.navigate(['/admin/dashboard']);
        return false;
    }

    // Allow non-admin users to access
    return true;
};
