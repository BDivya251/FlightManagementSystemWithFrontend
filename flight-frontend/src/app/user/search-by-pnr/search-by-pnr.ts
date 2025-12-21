import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking';
import { PnrResponse } from '../pnr-response';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search-by-pnr',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-by-pnr.html',
  styleUrl: './search-by-pnr.css',
})

export class SearchByPNR {


  pnr=''
  errorMessage=''
  // loading=false
  booking?:PnrResponse
  constructor(private bookingService:BookingService,
     private zone: NgZone,
     private route:ActivatedRoute,
     private router:Router,
     private cdrf:ChangeDetectorRef
  ){}


checkPnr(){
  this.errorMessage=''
  this.booking=undefined
  // this.loading=true
  this.bookingService.getByPNR(this.pnr).subscribe({
    next:(res)=>{
      console.log(res.pnr)
      
 this.booking = {
      pnr: res.pnr,
      email: res.email,
      status: res.status,
      seatsBooked: res.seatsBooked,
      totalAmount: res.totalAmount,
      flightNumber: res.flightNumber,
      bookingDate: res.bookingDate,
      departureDate:res.departureDate,
      departureTime:res.departureTime
    };
   
 console.log(this.booking.email)
  this.errorMessage=(this.booking.bookingDate);
      
   this.cdrf.detectChanges();
    },
    error:(err)=>{
      this.errorMessage="PNR not found"
     
    }
  })

}
 refreshComponent() {
  this.router.navigateByUrl('/user/search-by-pnr', { skipLocationChange: true })
    .then(() => {
      this.router.navigate(['/user/search-by-pnr']);
    });
}


}


