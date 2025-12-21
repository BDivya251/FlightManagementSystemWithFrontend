import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PnrResponse } from '../pnr-response';
import { BookingService } from '../booking';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-search-by-email',
  standalone:true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './search-by-email.html',
  styleUrl: './search-by-email.css',
})
export class SearchByEmail {
  PassengersDetails:PnrResponse[]=[]
  email=''
  searched=false
  loading=false
  constructor(private bookingService:BookingService,
    private cdrf:ChangeDetectorRef
  ){}

  getFlights(){
    this.searched=true
    this.loading=true
    this.bookingService.getByEmail(this.email).subscribe({
      next:(res)=>{
        this.PassengersDetails=res;
        this.cdrf.detectChanges();
        this.loading=false
      },
      error:(err)=>{
        console.log("Error ",err);
        alert("Error")
        this.loading=false
        this.cdrf.detectChanges();
      }
    })
  }
}
