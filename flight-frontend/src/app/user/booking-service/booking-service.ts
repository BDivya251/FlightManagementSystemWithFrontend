import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookingServices } from '../../services/booking-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-booking-service',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './booking-service.html',
  styleUrl: './booking-service.css',
})

export class BookingService {
  flightId=0
booking={
  email: "divyabathini08@gmail.com",
  seatsBooked: 2,
  flightId: 6,
  // passenger: [
  //   {
  //     name: "John",
  //     age: 30,
  //     seatNumber: 38
  //   }
  // ]
  passenger:[] as any[]
};

updatePassengers(){
  this.booking.passenger=[];
  for(let i=0;i<this.booking.seatsBooked;i++){
    this.booking.passenger.push({
      name:'',
      age:null,
      seatNumber:null
    });
  }
}
pnr='';
loading=false;
searched=false;
count=0
errMsg='';
displayMsg='';

constructor(
  private route:ActivatedRoute,
   private bookingServices:BookingServices,
   private router:Router,
   private cdrf:ChangeDetectorRef
){}
ngOnInit(){
  this.flightId=Number(
    this.route.snapshot.paramMap.get('flightId')
  );
  this.booking.flightId=this.flightId;
  console.log(this.booking.flightId);
}
  // onSeatsChange{
  //   const count=this.booking.seatsBooked || 0;
  // }
  
    dobooking():void{
      this.searched=true;
      this.loading=true;
      this.bookingServices
      .booking(this.booking)
      .subscribe({
        next:(res:any)=>{
          if(res.status==400){
            this.errMsg=res.message;
          }
          this.booking={
            email:res.email,
            seatsBooked:res.seatsBooked,
            flightId: this.booking.flightId,
          passenger: res.passenger
          };
          alert("booking successfuly"+res);
          console.log(res);
          // this.pnr=res.pnr;
         this.loading=false;
         this.cdrf.detectChanges()
         this.displayMsg=res;
        },
        error:(err:HttpErrorResponse)=>{
          console.log("error in booking",err.error);
          this.loading=false;
          this.errMsg=err.error;
          this.cdrf.detectChanges()
        }
      });
    }


}
