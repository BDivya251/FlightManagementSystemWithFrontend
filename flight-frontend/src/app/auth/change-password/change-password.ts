import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  constructor(private authService:AuthService){}

  username = '';
oldPassword = '';
newPassword = '';

changePassword() {
  const payload = {
    username: this.username,
    oldPassword: this.oldPassword,
    newPassword: this.newPassword
  };

  this.authService.changePassword(payload).subscribe({
    next: (res) => alert(res),
    error: () => alert('Failed to change password')
  });
}

}
