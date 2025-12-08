import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {
    emailForm: FormGroup;
    resetForm: FormGroup;
    step = 1;
    loading = false;
    errorMessage = '';
    successMessage = '';
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.resetForm = this.fb.group({
            otp: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    sendOtp() {
        if (this.emailForm.invalid) return;

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const email = this.emailForm.get('email')?.value;

        this.authService.forgotPassword(email).subscribe({
            next: (res) => {
                this.loading = false;
                this.successMessage = 'OTP sent successfully to your email.';
                this.step = 2;
            },
            error: (err) => {
                this.loading = false;
                this.errorMessage = err.error || 'Failed to send OTP. Please try again.';
            }
        });
    }

    resetPassword() {
        if (this.resetForm.invalid) return;

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const email = this.emailForm.get('email')?.value;
        const { otp, newPassword } = this.resetForm.value;

        this.authService.verifyOtp(email, otp, newPassword).subscribe({
            next: (res) => {
                this.loading = false;
                this.successMessage = 'Password reset successful! Redirecting to login...';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            error: (err) => {
                this.loading = false;
                this.errorMessage = err.error || 'Invalid OTP or failed to reset password.';
            }
        });
    }
}
