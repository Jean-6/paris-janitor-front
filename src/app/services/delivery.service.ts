import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private urlDelivery:string= "http://localhost:8081/api/delivery/";

  constructor(private httpClient:HttpClient) { }

  getDeliveries():Observable<any>{
    return this.httpClient.get(`${this.urlDelivery}`);
  }



}
