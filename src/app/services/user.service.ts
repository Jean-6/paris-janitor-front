import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {UserSearchDto} from "../dto/userSearchDto";
import {ApiUrls} from "../.env";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userResearchDto=new UserSearchDto();

  constructor(private httpClient:HttpClient) { }

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${ApiUrls.USER}/${userId}`);
  }

  fetchAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${ApiUrls.USER}/`)
  }

}
