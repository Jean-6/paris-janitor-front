import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeliveryReq} from "../../model/deliveryReq";
import {DeliveryReqSearchDto} from "../../dto/delivReqSearchDto";

@Injectable({
  providedIn: 'root'
})
export class DeliveryReqService {

  private urlDeliveryReq:string= "http://localhost:8081/api/deliveryRequest/";
  private userId:string="66d5f19a64eebd353b503c85";
  //private propertyId:string="66d5f4af64eebd353b503c87"
  public delivReqSearch: DeliveryReqSearchDto=new DeliveryReqSearchDto();

  constructor(private httpClient:HttpClient) { }

  saveDeliveryRequest(propertyId:string,deliveryReq: DeliveryReq):Observable<any>{
    deliveryReq.userId=this.userId;
    deliveryReq.propertyId=propertyId;
    return this.httpClient.post(`${this.urlDeliveryReq}`,deliveryReq);
  }

  fetchDeliveriesRequest(){

  }

  searchForService(){
    console.log(this.delivReqSearch)

  }

}
