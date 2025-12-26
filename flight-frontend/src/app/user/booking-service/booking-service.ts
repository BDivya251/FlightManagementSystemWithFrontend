// import { Component, OnInit } from '@angular/core';
// import { BookingServices } from '../../services/booking-service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface Passenger {
//   name: string;
//   age: number | null;
//   seatNumber: number;
// }

// @Component({
//   selector: 'app-booking-service',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './booking-service.html',
//   styleUrls: ['./booking-service.css']
// })
// export class BookingService implements OnInit {

//   flightId!: number;
//   flightNumber!: string;
//   totalSeats = 0;
//   travelDate=""
//   bookedSeats: number[] = [];   //  FIXED
//   selectedSeats: number[] = [];
//   passengers: Passenger[] = [];

//   booking = {
//     email: 'divyabathini08@gmail.com',
//     seatsBooked: 0,
//     passenger: [] as Passenger[]
//   };

//   constructor(private bookingService: BookingServices) {}

//   ngOnInit(): void {
//     const flight = JSON.parse(localStorage.getItem('selectedFlight') || '{}');

//     this.flightId = flight.flightId;
//     this.flightNumber = flight.flightNumber;
//     this.totalSeats = flight.totalSeats || 0;
//     this.travelDate=flight.travelDate
//     this.loadBookedSeats();
//   }

//   loadBookedSeats() {
//     this.bookingService.getSeatsBooked(this.flightNumber,this.travelDate).subscribe({
//       next: (seats) => {
//         this.bookedSeats = seats.map((s: any) => Number(s));
//       },
//       error: err => {
//         console.error('Failed to load booked seats', err);
//       }
//     });
//   }

//   selectSeat(seat: number) {
//     if (this.bookedSeats.includes(seat)) return;

//     const index = this.selectedSeats.indexOf(seat);

//     if (index !== -1) {
//       this.selectedSeats.splice(index, 1);
//       this.passengers = this.passengers.filter(p => p.seatNumber !== seat);
//     } else {
//       this.selectedSeats.push(seat);
//       this.passengers.push({
//         name: '',
//         age: null,
//         seatNumber: seat
//       });
//     }
//   }

//   submitBooking() {
//     if (this.selectedSeats.length === 0) {
//       alert('Please select at least one seat');
//       return;
//     }

//     const payload = {
//       flightId:this.flightId,
//       email: this.booking.email,
//       seatsBooked: this.selectedSeats.length,
//       passenger: this.passengers
//     };

//     this.bookingService.booking(this.flightId,payload).subscribe({
//       next: () => {
//         alert('Booking successful!');
//         this.selectedSeats = [];
//         this.passengers = [];
//       },
//       error: err => {
//         console.error('Booking failed', err);
//         alert('Booking failed');
//       }
//     });
//   }
// }
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