import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-change-password',
  // standalone:true,
  // imports: [CommonModule,FormsModule],
  imports:[ReactiveFormsModule,FormsModule],
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


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth';
// import { ReactiveFormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-change-password',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './change-password.html'
// })
// export class ChangePassword implements OnInit {

//   passwordForm!: FormGroup;
//   successMessage = '';
//   errorMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.passwordForm = this.fb.group(
//       {
//         username: ['', Validators.required],
//         oldPassword: ['', Validators.required],
//         newPassword: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(8),
//             Validators.pattern(
//               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
//             )
//           ]
//         ],
//         confirmPassword: ['', Validators.required]
//       },
//       {
//         validators: this.passwordMatchValidator
//       }
//     );
//   }

//   passwordMatchValidator(form: FormGroup) {
//     const newPass = form.get('newPassword')?.value;
//     const confirmPass = form.get('confirmPassword')?.value;
//     return newPass === confirmPass ? null : { passwordMismatch: true };
//   }

//   changePassword() {
//     if (this.passwordForm.invalid) return;

//     const payload = {
//       username: this.passwordForm.value.username,
//       oldPassword: this.passwordForm.value.oldPassword,
//       newPassword: this.passwordForm.value.newPassword
//     };

//     this.authService.changePassword(payload).subscribe({
//       next: (res) => {
//         this.successMessage = res;
//         this.errorMessage = '';
//         this.passwordForm.reset();
//       },
//       error: () => {
//         this.errorMessage = 'Failed to change password';
//         this.successMessage = '';
//       }
//     });
//   }
// }
