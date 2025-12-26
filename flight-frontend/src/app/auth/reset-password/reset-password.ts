// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reset-password',
//   imports: [],
//   templateUrl: './reset-password.html',
//   styleUrl: './reset-password.css',
// })
// export class ResetPassword {

// }

import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  standalone:true,
   imports: [CommonModule,FormsModule,RouterModule],
   styleUrl: './reset-password.css',
})
export class ResetPasswordComponent implements OnInit {

  token: string = '';
  newPassword: string = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
     private router: Router,
     private cdrf:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;
  }

  reset() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (res) => {
        console.log(res);
        this.message = 'Password reset successful!';
        Swal.fire({
                      icon: 'success',
                      title: 'password reset successful',
                      text: '',
                      confirmButtonColor: '#18d825ff'
                    });
        
        this.router.navigate(['/login']);
    this.cdrf.detectChanges();
      },
      error: () => {
        this.message = 'Invalid or expired token';
        this.cdrf.detectChanges();
      }
    });
  }
}
