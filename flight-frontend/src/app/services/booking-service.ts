import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BOOK_SER="http://localhost:8123/booking-service/flight/booking"
@Injectable({
  providedIn: 'root',
})
export class BookingServices {
      constructor(private http: HttpClient) {}
      booking(data:any):Observable<any>{
        return this.http.post(`${BOOK_SER}`,data,{responseType:"text"});
      }
}
