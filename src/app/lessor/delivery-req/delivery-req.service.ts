import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, from, map, mergeMap, Observable, of, toArray} from "rxjs";
import { DeliveryRequest} from "../../model/deliveryRequest";
import {DeliveryReqSearchDto} from "../../dto/delivReqSearchDto";
import {UserService} from "../../services/user.service";
import {PropertyService} from "../../services/property.service";
import {ApiUrls} from "../../.env";
import {Property} from "../../model/property";
import {DeliveryService} from "../../services/delivery.service";
import {Delivery} from "../../model/delivery";

@Injectable({
  providedIn: 'root'
})
export class DeliveryReqService {

  public delivReqSearch: DeliveryReqSearchDto = new DeliveryReqSearchDto();

  constructor(private httpClient: HttpClient,
              private deliveryService: DeliveryService,
              private propertyService: PropertyService) {
  }

  saveDeliveryRequest(deliveryRequest: any): Observable<any> {
    return this.httpClient.post(`${ApiUrls.DELIVERY_REQUEST}/`, deliveryRequest);
  }


  searchForService() {
    console.log(this.delivReqSearch)
  }

  getDeliveryRequestsByPropertyId(userId: string): Observable<DeliveryRequest[]> {
    return this.httpClient.get<DeliveryRequest[]>(`${ApiUrls.DELIVERY_REQUEST}/byPropertyId/${userId}`);
  }

  getDeliveryRequestsByUserId(userId: string): Observable<DeliveryRequest[]> {
    return this.httpClient.get<DeliveryRequest[]>(`${ApiUrls.DELIVERY_REQUEST}/user?userId=${userId}`);
  }


  associateDeliveryToRequests(deliveryRequests: DeliveryRequest[]): Observable<DeliveryRequest[]> {
    return from(deliveryRequests).pipe(
      mergeMap((deliveryRequest: DeliveryRequest) => {
        if (deliveryRequest.type) {
          console.log("map : "+deliveryRequest.type)
          // Pour chaque deliveryRequest, on récupère la delivery correspondante
          return this.deliveryService.getDeliveryBy(deliveryRequest.type).pipe(
            map((delivery: Delivery) => {
              deliveryRequest.type = delivery?.type || 'Unknown delivery';
              return deliveryRequest;
            })
          );
        } else {
          // Si pas de deliveryId, on renvoie la deliveryRequest telle quelle
          return of(deliveryRequest);
        }
      }),
      toArray()  // On rassemble tous les éléments en un tableau après les transformations
    );
  }

}
