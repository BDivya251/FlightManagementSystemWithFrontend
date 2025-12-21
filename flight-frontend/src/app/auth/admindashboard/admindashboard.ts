import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { Airline } from './interface/Airline';
import { FlightService } from '../../admin/flight';
import { CommonModule } from '@angular/common';
// import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admindashboard',
  standalone:true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {
  airlines:Airline[]=[];


constructor(
    private authService:AuthService,
    private router:Router,
    private flightService:FlightService,
  ){}
  
ngOnInit(){
  this.showAllAirlines();
}
showAllAirlines(){
  this.flightService.searchAllAirlines().subscribe({
    next:(res)=>{
      this.airlines=res;
      
    },
    error:()=>{

    }
  });
}
logout() {
    const ok=confirm("are you sure.?? you want to logout");
  if(ok){
    this.authService.logout();
  this.router.navigate(['/login']);}
}
}
