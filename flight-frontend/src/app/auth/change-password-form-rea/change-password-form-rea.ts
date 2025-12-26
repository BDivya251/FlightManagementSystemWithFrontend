import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { strongPasswordValidator } from './strongPasswordValidator';
import { AuthService } from '../../services/auth';  // adjust path if needed

@Component({
  selector: 'app-change-password-form-rea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password-form-rea.html',
  styleUrl: './change-password-form-rea.css',
})
export class ChangePasswordFormRea implements OnInit {

  passwordForm!: FormGroup;
  username!: string; // assume you already have username (from token / storage)

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // example: fetch username from localStorage / token
    this.username = localStorage.getItem('username') || '';

    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, strongPasswordValidator]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatch }
    );
  }

  passwordMatch(form: FormGroup) {
    const newPass = form.get('newPassword');
    const confirmPass = form.get('confirmPassword');

    if (!newPass || !confirmPass) return null;

    if (newPass.value !== confirmPass.value) {
      confirmPass.setErrors({
        ...(confirmPass.errors || {}),
        passwordMismatch: true
      });
    } else {
      if (confirmPass.errors) {
        const { passwordMismatch, ...rest } = confirmPass.errors;
        confirmPass.setErrors(Object.keys(rest).length ? rest : null);
      }
    }
    return null;
  }

  //  FINAL CHANGE PASSWORD METHOD
  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const payload = {
      username: this.username,
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.authService.changePassword(payload).subscribe({
      next: (res: any) => alert(res),
      error: () => alert('Failed to change password')
    });
  }
}
