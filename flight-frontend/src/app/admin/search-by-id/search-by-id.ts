import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { FlightService } from '../flight';
import { ChangeDetectorRef } from '@angular/core';
import { FlightInventorys } from '../../auth/admindashboard/interface/FlightInventory';
@Component({
  selector: 'app-search-by-id',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-by-id.html',
  styleUrl: './search-by-id.css',
})

export class SearchById {
  flights:FlightInventorys[]=[]
  id=0;
  errorMessage="";
  constructor(private flightService:FlightService,
    private cdrf:ChangeDetectorRef
  ){}
  checkFlights(){
    // id=this.id;
    this.flightService.searchFlightsByAirlineId(this.id).subscribe({
      next:(res)=>{
        this.flights=res;
        this.cdrf.markForCheck();
      },
      error:()=>{
        this.errorMessage="Error in displaying the flights";
      }
    })
  }
}
