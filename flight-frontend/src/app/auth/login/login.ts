import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import Swal from 'sweetalert2';

declare var google:any;
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
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // wait until google script is available
    const interval = setInterval(() => {
      if ((window as any).google) {
        clearInterval(interval);

        google.accounts.id.initialize({
          client_id: '238889743508-253su7i0oeksp731s43ttv6dcm83e8ck.apps.googleusercontent.com',
          callback: (response: any) => this.handleGoogleLogin(response)
        });

        google.accounts.id.renderButton(
          document.getElementById('googleBtn'),
          { theme: 'outline', size: 'large' }
        );
      }
    }, 100);
  }
}

  handleGoogleLogin(response: any) {
  const idToken = response.credential;

  console.log(response.credential);
  this.authService.googleLogin(idToken).subscribe({
    next: (res: any) => {
      localStorage.setItem('auth-token', res.token);
      localStorage.setItem('username', res.email);
      localStorage.setItem('email', res.email);

      this.router.navigate(['/user']);
    },
    error: () => {
      this.errorMessage = 'Google login failed';
    }
  });
}


loginWithDiscord() {
  const clientId = '1453784099159412867';
  const redirectUri = 'http://localhost:4200/discord-callback.html';

  const discordAuthUrl =
    'https://discord.com/oauth2/authorize' +
    `?client_id=${clientId}` +
    '&response_type=code' +
    '&scope=identify%20email' +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = discordAuthUrl;
}

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




