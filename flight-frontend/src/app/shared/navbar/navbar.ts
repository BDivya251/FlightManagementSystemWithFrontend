import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class NavbarComponent {
  email:string='';
  

  // email = localStorage.getItem('email');

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      this.email=localStorage.getItem('email')||'';
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
