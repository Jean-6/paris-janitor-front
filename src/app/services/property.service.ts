import { Injectable } from '@angular/core';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PropertyDto} from "../dto/propertyDto";
import {Property} from "../model/property";
import {ErrorHandlerService} from "./error-handler.service";
import {DeliveryReqSearchDto} from "../dto/delivReqSearchDto";
import {PropertySearchDto} from "../dto/propertySearchDto";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public propertySearchDto: PropertySearchDto=new PropertySearchDto();

  private urlProp:string= "http://localhost:8081/api/property";

  constructor(private httpClient: HttpClient,
              /*private errorHandler: ErrorHandlerService*/) { }

  saveData(prop: PropertyDto):Observable<any>{
    return this.httpClient.post<any>(`${this.urlProp}/`,prop);
      /*.pipe( catchError((err:any) => {return throwError(err);}))*/
  }

  getPropertyById(propId:String):Observable<any>{
    return this.httpClient.get<any>(`${this.urlProp}/${propId}`);
  }

  getPropertiesPerPage():Observable<any>{
    return this.httpClient.get<any>(`${this.urlProp}/page`);
  }

  getPropertiesPerPage_():Observable<{ content: Property[],totalPages:number}>{
    return this.httpClient.get<{content: Property[],totalPages: number}>(`${this.urlProp}/page`);
  }

  getProperties():Observable<any>{
    return this.httpClient.get<any>(`${this.urlProp}/`);
  }

  getPropertiesByUserId(userId:string):Observable<any>{
    return this.httpClient.get<any[]>(`${this.urlProp}/owner/${userId}`);
  }

}

