import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './signup.html',
    styleUrl: './signup.css'
})
export class Signup {
    signupForm: FormGroup;
    errorMessage = '';
    showPassword = false;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        if (this.signupForm.valid) {
            this.errorMessage = '';
            const { username, email, password } = this.signupForm.value;

            this.authService.register(username, email, password).subscribe({
                next: (response) => {
                    console.log('Registration successful', response);
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.error('Registration failed', err);
                    this.errorMessage = 'Registration failed. Please try again.';
                }
            });
        } else {
            this.signupForm.markAllAsTouched();
        }
    }
}
