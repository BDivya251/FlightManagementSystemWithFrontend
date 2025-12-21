import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PnrResponse } from './pnr-response';

const BOOK_AUTH='http://localhost:8123/booking-service/flight'

@Injectable({
  providedIn: 'root',
})

export class BookingService {

  constructor(private httpClient:HttpClient){}

  getByPNR(id:string){
    return this.httpClient.get<PnrResponse>(`${BOOK_AUTH}/ticket`,{
      params:{
        id:id
      }
    })
  }
  // http://localhost:8123/booking-service/flight/booking/history?email=divyabathini08@gmail.com
  getByEmail(email:string){
    return this.httpClient.get<PnrResponse[]>(`${BOOK_AUTH}/booking/history`,{
      params:{
        email:email
      }
    })
  }

  cancelBooking(id:string){
    return this.httpClient.delete<void>(`${BOOK_AUTH}/booking/cancel`,{
      params:{id}
    })
  }

}
