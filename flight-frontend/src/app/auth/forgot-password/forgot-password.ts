import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
   email: string = '';
  message = '';

  constructor(private authService: AuthService,
    private cdrf:ChangeDetectorRef
  ) {}

  submit() {
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.message = 'Reset link sent to your email';
        this.cdrf.detectChanges();
      },
      error: () => {
        this.message = 'Something went wrong!';
      }
    });
  }
}
