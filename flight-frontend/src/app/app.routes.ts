import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { Userdashboard } from './auth/userdashboard/userdashboard';
import { Admindashboard } from './auth/admindashboard/admindashboard';
import { AddAirlineComponent } from './admin/add-airline/add-airline';
import { AddFlightInventoryComponent } from './admin/add-flight-inventory/add-flight-inventory';
import { FlightSearchComponent } from './components/flight-search/flight-search';
import { SearchByPNR } from './user/search-by-pnr/search-by-pnr';
import { Home } from './auth/home/home';
import { CancelBooking } from './user/cancel-booking/cancel-booking';
import { BookingService } from './user/booking-service/booking-service';
import { SearchByEmail } from './user/search-by-email/search-by-email';
// import { logoutComponent } from './auth/login/login';
import { SearchById } from './admin/search-by-id/search-by-id';
import { ResolveFn } from '@angular/router';
import { Airline } from './auth/admindashboard/interface/Airline';
import { FlightService } from './admin/flight';
import { inject } from '@angular/core';
// import { FlightService } from '../flight';
// import { Airline } from '../admindashboard/interface/Airline';
// export const AirlineResolver: ResolveFn<Airline[]> = () => {
//   const flightService = inject(FlightService);
//   const token = localStorage.getItem('auth-token');
//   if (!token) {
//     return []; // prevent API call
//   }
//   return flightService.searchAllAirlines();
// };
export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    // {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'search-flight',component:FlightSearchComponent},
    
    // {path:'logout',component:logoutComponent},
      { path: 'admin', component: Admindashboard ,
        // resolve:{airlines:AirlineResolver},
         children: [
      { path: 'add-airline', component: AddAirlineComponent },
      { path: 'add-flightInventory/:id', component: AddFlightInventoryComponent },
       {path:'search-flight',component:FlightSearchComponent},
       {path:'search-by-id/:id',component:SearchById}

    ]
      },
  { path: 'user', component: Userdashboard ,
    
    children:[
      {path:'search-by-pnr',component:SearchByPNR},
       {path:'booking/:flightId',component:BookingService},
       {path:'search-by-email',component:SearchByEmail},
       {path:'search-flight',component:FlightSearchComponent},
       {path:'cancel-booking/:pnr',component:CancelBooking}
    ]
  },
   {path:'**',redirectTo:'home'},
];
