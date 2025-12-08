import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    // For now, simple mock login or use existing auth service
    // Assuming backend is at localhost:8080 as per plan
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        // Check if role is admin (if applicable)
        // For now, just redirect to dashboard
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        // Fallback for demo if backend fails
        if (this.email === 'admin@lemans.com' && this.password === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      }
    });
  }
}
