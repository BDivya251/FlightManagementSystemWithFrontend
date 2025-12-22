import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar';
@Component({
  selector: 'app-userdashboard',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule,NavbarComponent],
  templateUrl: './userdashboard.html',
  styleUrl: './userdashboard.css',
})
export class Userdashboard {
  constructor(
    private authService:AuthService,
    private router:Router,
  ){}
  logout() {
    const ok=confirm("are you sure..? You want to logout");
    if(ok){
  this.authService.logout();
  this.router.navigate(['/login']);
    }
}

}
