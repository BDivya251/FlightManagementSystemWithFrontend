import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username='';
  password='';
  errorMessage='';
  constructor(
    private authService :AuthService,
    private router:Router
  ){}

 login() {
    // basic validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    const payload = {
      username: this.username,
      password: this.password
    };

    // call login API
    this.authService.login(payload).subscribe({
      next: () => {
        //  JWT already stored inside AuthService
        const role = this.authService.getRole();
        console.log(role);
        //  route based on role
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'ROLE_USER') {
                setTimeout(() => {
          this.router.navigate(['/user']);
        }, 0);

          // this.router.navigate(['/user']);
        } else {
          this.errorMessage = 'Unknown role';
          //  this.errorMessage = 'Invalid username or password';
         Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'invalid username',
                confirmButtonColor: '#d81818ff'
              });
              return;
        }
        Swal.fire({
                icon: 'success',
                title: 'Logged',
                text: `Hello ${this.username}`,
                confirmButtonColor: '#16a34a'
              });
        
        // alert("logined succesfully")
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
         Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'invalid username',
                confirmButtonColor: '#d81818ff'
              });
      }
    });
  }
}




