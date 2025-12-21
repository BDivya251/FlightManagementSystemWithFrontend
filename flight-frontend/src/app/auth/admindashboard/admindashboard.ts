import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-admindashboard',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {
constructor(
    private authService:AuthService,
    private router:Router,
  ){}
  logout() {
    const ok=confirm("are you sure.?? you want to logout");
  if(ok){
    this.authService.logout();
  this.router.navigate(['/login']);}
}
}
