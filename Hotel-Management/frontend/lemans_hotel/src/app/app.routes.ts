import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./landing/landing').then(m => m.Landing)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.Home),
        canActivate: [authGuard]
    },
    {
        path: 'rooms',
        loadComponent: () => import('./rooms/rooms').then(m => m.Rooms),
        canActivate: [authGuard]
    },
    {
        path: 'suites',
        loadComponent: () => import('./suites/suites').then(m => m.Suites)
    },
    {
        path: 'dining',
        loadComponent: () => import('./dining/dining').then(m => m.Dining)
    },
    {
        path: 'history',
        loadComponent: () => import('./history/history').then(m => m.History)
    },
    {
        path: 'premium-services',
        loadComponent: () => import('./premium-services/premium-services').then(m => m.PremiumServices)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        loadComponent: () => import('./signup/signup').then(m => m.Signup)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'my-bookings',
        loadComponent: () => import('./my-bookings/my-bookings').then(m => m.MyBookings),
        canActivate: [authGuard]
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password').then(m => m.ForgotPasswordComponent)
    }
];
