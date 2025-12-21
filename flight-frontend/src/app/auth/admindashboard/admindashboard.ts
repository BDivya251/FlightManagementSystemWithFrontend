import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { Airline } from './interface/Airline';
import { FlightService } from '../../admin/flight';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admindashboard',
  standalone:true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {
   airlines$!: Observable<Airline[]>; 


constructor(
    private authService:AuthService,
    private router:Router,
    private flightService:FlightService,
    private cdrf:ChangeDetectorRef
  ){}
  
ngOnInit(){
  
  this.airlines$ = this.flightService.searchAllAirlines();
  this.loadAirlines();
}
loadAirlines() {
  this.airlines$ = this.flightService.searchAllAirlines();
}

logout() {
    const ok=confirm("are you sure.?? you want to logout");
  if(ok){
    this.authService.logout();
  this.router.navigate(['/login']);}
}
}
