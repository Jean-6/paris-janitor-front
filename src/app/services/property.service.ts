import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {PropertyDto} from "../dto/propertyDto";
import {Property} from "../model/property";
import {PropertySearchDto} from "../dto/propertySearchDto";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public propertySearchDto: PropertySearchDto=new PropertySearchDto();
  private userUrl = 'http://localhost:8081/api/user/';
  private propertyUrl = 'http://localhost:8081/api/property';// URL pour les utilisateurs

  constructor(private httpClient: HttpClient,
              /*private errorHandler: ErrorHandlerService*/) { }

  saveData(prop: PropertyDto):Observable<any>{
    return this.httpClient.post<any>(`${this.propertyUrl}/`,prop);
      /*.pipe( catchError((err:any) => {return throwError(err);}))*/
  }

  getPropertyById(propId:String):Observable<any>{
    return this.httpClient.get<any>(`${this.propertyUrl}/${propId}`);
  }

  getPropertiesPerPage():Observable<any>{
    return this.httpClient.get<any>(`${this.propertyUrl}/page`);
  }

  getPropertiesPerPage_():Observable<{ content: Property[],totalPages:number}>{
    return this.httpClient.get<{content: Property[],totalPages: number}>(`${this.propertyUrl}/page`);
  }

  getProperties():Observable<any>{
    return this.httpClient.get<any>(`${this.propertyUrl}/`);
  }

  // Méthode pour récupérer les propriétés d'un utilisateur
  getPropertiesByUserId(userId: string): Observable<Property[]> {
    return this.httpClient.get<Property[]>(`${this.propertyUrl}?userId=${userId}`);
  }

}

