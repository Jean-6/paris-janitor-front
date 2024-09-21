import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageDto} from "../dto/imageDto";
import {catchError, forkJoin, from, mergeMap, Observable, of, toArray} from "rxjs";
import {PropertyService} from "./property.service";
import {Image} from "../model/Image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imagesUrl: string = "http://localhost:8081/api/image/download";
  private imgUploadUrl: string = "http://localhost:8081/api/image/upload";
  private metadataUrl: string = "http://localhost:8081/api/image/metadatas";


  constructor(private httpClient: HttpClient) {}


  getImgByProperId(ids:string[]):Observable<any[]>{
    const requests= ids.map(id=>this.httpClient.get(`${this.metadataUrl}/${id}`));
    return forkJoin(requests);
  }

  fetchImagesMeta(ids: string[]): Observable<any[]> {
    return from(ids).pipe(
      mergeMap(id => this.httpClient.get<any>(`${this.metadataUrl}${id}`).pipe(
        catchError(error => {
          console.error('')
          return of(null);
        })
      )),
      toArray()
    );
  }

  fetchImagesMeta1(ids: string[]): Observable<any[]> {
    const requests = ids.map(id => this.httpClient.get<any>(`${this.metadataUrl}${id}`));
    return forkJoin(requests).pipe(
      catchError(error => {
        console.error('');
        return of([]);
      })
    );
  }

  fetchImagesMeta2(ids: string[]): Observable<any[]> {
    console.log("fetchImagesMeta2 : "+ids);
    const requests: Observable<any>[] = ids.map(id => this.httpClient.get<any>(`${this.metadataUrl}${id}`));
    return forkJoin(requests);
  }

  uploadImg(savedPropertyId:string,img:FormData): Observable<any>{
    return this.httpClient.post<any>(`${this.imgUploadUrl}/${savedPropertyId}`,img);
  }

}
