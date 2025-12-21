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
export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    // {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'search-flight',component:FlightSearchComponent},
    
    // {path:'logout',component:logoutComponent},
      { path: 'admin', component: Admindashboard ,
         children: [
      { path: 'add-airline', component: AddAirlineComponent },
      { path: 'add-flightInventory', component: AddFlightInventoryComponent }

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
