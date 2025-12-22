import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-change-password',
  imports: [],
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
