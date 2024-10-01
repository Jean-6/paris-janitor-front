import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import { DeliveryRequest} from "../../model/deliveryRequest";
import {DeliveryReqSearchDto} from "../../dto/delivReqSearchDto";
import {UserService} from "../../services/user.service";
import {PropertyService} from "../../services/property.service";

@Injectable({
  providedIn: 'root'
})
export class DeliveryReqService {

  private deliveryRequestUrl = 'http://localhost:8081/api/delivery-request'; // URL pour les livraisons
  private propertyUrl = 'http://localhost:8081/api/property/'; // URL pour les propriétés
  private userUrl = 'http://localhost:8081/api/user/'; // URL pour les utilisateurs
  private userConnected:string="66d5f19a64eebd353b503c85";
  public delivReqSearch: DeliveryReqSearchDto=new DeliveryReqSearchDto();

  constructor(private httpClient:HttpClient,
              private userService:UserService,
              private propertyService:PropertyService) { }

  saveDeliveryRequest(propertyId:string,deliveryReq: DeliveryRequest):Observable<any>{
    //deliveryReq.userId=this.userConnected;
    deliveryReq.propertyId=propertyId;
    return this.httpClient.post(`${this.deliveryRequestUrl}`,deliveryReq);
  }

  fetchDeliveriesRequestPerPage():Observable<{ content:DeliveryRequest[],totalPages:number }>{
    return this.httpClient.get<{content:DeliveryRequest[],totalPages:number}>(`${this.deliveryRequestUrl}/page`);
  }

  searchForService(){
    console.log(this.delivReqSearch)
  }

  getDeliveryRequestsByPropertyId(propertyIds: string[]): Observable<DeliveryRequest[]> {
    return this.httpClient.get<DeliveryRequest[]>(`${this.deliveryRequestUrl}/byPropertyId/${propertyIds}`);
  }



}
