import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isAdmin = false;
  showNavbar = true;

  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.getRole() === 'ADMIN';
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkVisibility(event.url);
    });
    // Initial check
    this.checkVisibility(this.router.url);
  }

  checkVisibility(url: string) {
    // Hide navbar on landing, login, signup, forgot-password, and admin pages
    this.showNavbar = url !== '/' && !url.includes('/login') && !url.includes('/signup') && !url.includes('/forgot-password') && !url.includes('/admin');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
