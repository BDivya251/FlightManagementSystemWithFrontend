import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightService } from '../flight';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-flight-inventory',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './add-flight-inventory.html',
  styleUrl: './add-flight-inventory.css',
})


export class AddFlightInventoryComponent {
flight = {
    flightNumber: '',
    departure: '',
    arrival: '',
    travelDate: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: 0,
    ticketPrice: 0,
    airline: 0
  };
successMessage="";
errorMessage="";
today!:string;
  constructor(private flightService:FlightService, private cdr: ChangeDetectorRef,private route: ActivatedRoute){}
  
ngOnInit(){
    this.flight.airline=Number(this.route.snapshot.paramMap.get('id'));
    this.today=new Date().toISOString().split('T')[0];
  }
 addFlight() {

  const payload = { ...this.flight }; //  keep data
  

  this.flightService.addFlightInventory(payload).subscribe({
    
    next: (res) => {
      console.log(payload)
      //  this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: 'Flight Added',
        text: 'Flight details added successfully',
        confirmButtonColor: '#16a34a'
      });

      // reset AFTER success
      this.flight = {
        flightNumber: '',
        departure: '',
        arrival: '',
        travelDate: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: 0,
        ticketPrice: 0,
        airline: 0
      };
      this.successMessage="Flight Inventory added successfully"
      this.cdr.markForCheck();
       setTimeout(()=>{
          this.successMessage='';
        },300);
    },

    error: (err) => {
      console.log(payload)
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Error',
      //   text: 'Flight not added successfully',
      //   confirmButtonColor: '#f02311ff'
      // });
      console.error(err);
      this.errorMessage="Flight Inventory can not be added"
      this.cdr.markForCheck();
       setTimeout(()=>{
          this.errorMessage='';
        },300);
    }
  });
}


}
