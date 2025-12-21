import { Component } from '@angular/core';
import { FlightService } from '../flight';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-airline',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-airline.html',
  styleUrl: './add-airline.css',
})


export class AddAirlineComponent {

  airlineName = '';
successMessage = '';
errorMessage = '';
airlineId=0;
constructor(private flightService:FlightService,
   private cdr: ChangeDetectorRef,
    // private router:Router
){}

ngOnDestory(){
  console.log('add airlinecomponent destroy')
}
addAirline(){
        const payload=
              {
                  airlineName :this.airlineName
              };

    //     if (!this.airlineName.trim()) {
    //   this.errorMessage = 'Airline name is required';
    //   this.successMessage = '';
    //   return;
    // }
     this.flightService.addAirline(payload).subscribe({
      next: (res) => {
        this.successMessage = 'Airline added successfully';
        this.airlineName = '';
        this.airlineId=res;
        console.log(this.airlineId);
        this.airlineName='';
        this.cdr.detectChanges();
        this.cdr.markForCheck();
        this.errorMessage='';
        setTimeout(()=>{
          this.successMessage='';
        },300);
     
      },
      error: () => {
        this.errorMessage = 'Failed to add airline';
        // this.successMessage='';
        this.cdr.markForCheck();
        
      }
    });
  }
    
}


