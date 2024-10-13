import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiUrls} from "../.env";
import {Delivery} from "../model/delivery";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {


  constructor(private httpClient:HttpClient) { }

  getDeliveries():Observable<Delivery[]>{
    return this.httpClient.get<Delivery[]>(`${ApiUrls.DELIVERY}/`);
  }

  getDeliveryBy(id:String):Observable<Delivery>{
    return this.httpClient.get<Delivery>(`${ApiUrls.DELIVERY}?id=${id}`);
  }

}
