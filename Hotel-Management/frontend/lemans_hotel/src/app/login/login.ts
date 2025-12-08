import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    loginForm: FormGroup;
    errorMessage = '';
    showPassword = false;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.errorMessage = '';
            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe({
                next: (response) => {
                    console.log('Login successful', response);
                    if (response.role === 'ADMIN') {
                        this.router.navigate(['/admin/dashboard']);
                    } else {
                        this.router.navigate(['/home']);
                    }
                },
                error: (err) => {
                    console.error('Login failed', err);
                    this.errorMessage = 'Invalid email or password. Please try again.';
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
