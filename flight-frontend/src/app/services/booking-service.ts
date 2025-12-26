import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BOOK_SER="http://localhost:8123/booking-service/flight"
@Injectable({
  providedIn: 'root',
})
export class BookingServices {
      // getBookedSeats(flightNumber: string, travelDate: string) {
      //   throw new Error('Method not implemented.');
      // }
      // getSeatsBooked(flightNumber: string, travelDate: string) {
      //   throw new Error('Method not implemented.');
      // }
      constructor(private http: HttpClient) {}
      booking(data:any):Observable<any>{
        return this.http.post(`${BOOK_SER}/booking`,data,{responseType:"text"});
      }
  //     booking(flightId: number, payload: any) {
  // return this.http.post(
  //   `${BOOK_SER}/booking`,
  //   payload
  // );
// }

      getSeatsBooked(flightNumber:string,date:string): Observable<number[]>{
        return this.http.get<number[]>(
          `${BOOK_SER}/booked-seats`,
          {
            params:{flightNumber,date},
          }
        );
      }

}
