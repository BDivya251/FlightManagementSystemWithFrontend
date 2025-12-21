import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightInventory } from './flightInventory';
import { RoundTripFlightResponse } from './RoundTripFlightResponse';
const FLIGHT_API='http://localhost:8123/flight-service/flight'
// http://localhost:8123/flight-service/flight/airline/inventary/add
@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient){}

  addAirline(data: any): Observable<any> {
      return this.http.post(`${FLIGHT_API}/airline/add`, data, { responseType: 'text' ,  headers: {
        'Content-Type': 'application/json'
      }});
    }

    addFlightInventory(data:any):Observable<any>{
      return this.http.post(`${FLIGHT_API}/airline/inventary/add`,data,
        {
           observe: 'response',   
        headers:{
          'Content-Type':'application/json'
        }
      })
    }

    searchFlights( arrival: string,departure: string,date:string) {
  return this.http.get<FlightInventory[]>(
    `${FLIGHT_API}/search`,
    {
      params: {
        
        arrival: arrival,
        departure: departure,
        date:date
      }
    }
  );
}
  searchFlightsRoundTrip(arrival:string,departure:string,comingDate:string,goingDate:string){
    return this.http.get<RoundTripFlightResponse>(
      `${FLIGHT_API}/search/round-trip`,
      {
        params: {
        
        arrival: arrival,
        departure: departure,
        comingDate:comingDate,
        goingDate:goingDate
      }
      }
    );
  }

}
