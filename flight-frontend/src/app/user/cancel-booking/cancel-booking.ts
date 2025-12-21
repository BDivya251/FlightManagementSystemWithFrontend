import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingService } from '../booking';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cancel-booking',
  standalone:true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './cancel-booking.html',
  styleUrl: './cancel-booking.css',
})
export class CancelBooking {
 pnr: string | null = null;

  errMsg=''
  confirnMsg=''
  constructor(private bookingService:BookingService,
    private cdrf:ChangeDetectorRef,
      // private router:Router,
      private route:ActivatedRoute,
  ){}
  confirmCancel(){
    Swal.fire({
    title: 'Cancel Booking?',
    text: 'Are you sure you want to cancel this booking?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cancelBooking();
    }
  });
  }
  ngOnInit(){
  this.pnr=(
    this.route.snapshot.paramMap.get('pnr')
  );
}
  cancelBooking(){
    if(!this.pnr){
      this.errMsg="pnr is missing"
      return
    }
    
  this.bookingService.cancelBooking(this.pnr).subscribe({
    next:(res)=>{
      this.confirnMsg="booking cancelled"
      console.log("Booking cancelled");
      this.cdrf.detectChanges();
      this.errMsg='';
    },
    
    error:(err)=>{
      this.errMsg="error"+err.error;
      console.log(err);
      this.cdrf.detectChanges();
      this.confirnMsg=''
    }
  })
  }
}
