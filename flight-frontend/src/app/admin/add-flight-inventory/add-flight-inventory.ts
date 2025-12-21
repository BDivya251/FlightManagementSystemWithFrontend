import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightService } from '../flight';
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

  constructor(private flightService:FlightService, private cdr: ChangeDetectorRef,){}
  

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
    },

    error: (err) => {
      console.log(payload)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Flight not added successfully',
        confirmButtonColor: '#f02311ff'
      });
      console.error(err);
    }
  });
}


}
