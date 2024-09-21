import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {BookingDto} from "../dto/bookingDto";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private urlBooking:string= "http://localhost:8081/api/booking";

  private userId:string="66d5f19a64eebd353b503c85";

  constructor(private httpClient: HttpClient) { }

  saveData(booking: BookingDto):Observable<any>{
    return this.httpClient.post<any>(`${this.urlBooking}/`,booking);
      /*.pipe(catchError((err:any) => {return throwError(err);}))*/
  }
}
