// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { FlightService } from '../../admin/flight';
// import { FlightWrapper } from '../../admin/flight-wrapper';
// import { ChangeDetectorRef } from '@angular/core';
// @Component({
//   selector: 'app-flight-search',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './flight-search.html',
//   styleUrl: './flight-search.css',
// })
// export class FlightSearchComponent {

//   departure: string = '';
//   arrival: string = '';
//   goingDate: string = '';
//   searched: boolean = false;
//   loading: boolean = false;
//   flights: FlightWrapper[] = [];

//   constructor(private flightService: FlightService,
//     private cdr:ChangeDetectorRef
//   ) {}

//   searchFlights(): void {
//     this.searched = true;
//     this.loading = true;
//     this.flights = [];

//     this.flightService
//       .searchFlights(this.departure, this.arrival, this.goingDate)
//       .subscribe({
//         next: (data) => {
//           this.flights = data;
//           console.log(data);
//           this.loading = false;
//           this.cdr.detectChanges();
//         },
//         error: (err) => {
//           console.error('Error fetching flights:', err);
//           this.loading = false;
//         }
//       });
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../admin/flight';
import { FlightInventory } from '../../admin/flightInventory';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.css',
})
export class FlightSearchComponent implements OnInit {

  departure: string = '';
  arrival: string = '';
  goingDate: string = '';
  // goingDate: string = new Date().toISOString().split('T')[0];
  comingDate: string = new Date().toISOString().split('T')[0];
  loading = false;
  searched = false;
  flightId!:number;
  flights: FlightInventory[] = [];
  flightsComing: FlightInventory[] = []
  constructor(
    private flightService: FlightService,
    private cdr: ChangeDetectorRef
  ) { }

  // AUTO CALL ON PAGE LOAD
  ngOnInit(): void {
    this.searchFlights();
  }

  searchFlights(): void {
    if (!this.departure || !this.arrival || !this.goingDate) {
      return;
    }
    this.loading = true;
    this.flights = [];
    this.searched = true;

    this.flightService
      .searchFlights(this.departure, this.arrival, this.goingDate)
      .subscribe({
        next: data => {
          this.flights = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  searchFlightsTwoway(): void {
    this.loading = true;
    this.flights = [];
    this.flightsComing = [];
    this.flightService
      .searchFlightsRoundTrip(this.departure, this.arrival, this.goingDate, this.comingDate)
      .subscribe(data => {
        this.flights = data.coming;
        this.flights = data.going;
      })
  }

}

