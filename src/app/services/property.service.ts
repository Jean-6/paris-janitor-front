import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {PropertyDto} from "../dto/propertyDto";
import {Property} from "../model/property";
import {PropertySearchDto} from "../dto/propertySearchDto";
import {ApiUrls} from "../.env";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public propertySearchDto: PropertySearchDto=new PropertySearchDto();

  constructor(private httpClient: HttpClient) { }

  saveData(prop: PropertyDto):Observable<any>{
    return this.httpClient.post<any>(`${ApiUrls.PROPERTY}/`,prop);
  }

  getPropertyById(propId:String):Observable<Property>{
    return this.httpClient.get<Property>(`${ApiUrls.PROPERTY}/${propId}`);
  }

  getPropertiesPerPage():Observable<Property>{
    return this.httpClient.get<Property>(`${ApiUrls.PROPERTY}/page`);
  }

  getPropertiesPerPage_():Observable<{ content: Property[],totalPages:number}>{
    return this.httpClient.get<{content: Property[],totalPages: number}>(`${ApiUrls.PROPERTY}/page`);
  }

  getProperties():Observable<Property[]>{
    return this.httpClient.get<Property[]>(`${ApiUrls.PROPERTY}/`);
  }

  // Méthode pour récupérer les propriétés d'un utilisateur
  getPropertiesByUserId(userId: string): Observable<Property[]> {
    return this.httpClient.get<Property[]>(`${ApiUrls.PROPERTY}?userId=${userId}`);
  }

}

