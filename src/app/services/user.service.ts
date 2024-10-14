import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {UserSearchDto} from "../dto/userSearchDto";
import {ApiUrls} from "../.env";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoadingUser = false;
  users : User[]=[];


  userResearchDto=new UserSearchDto();

  constructor(private httpClient:HttpClient) { }

  getUserById(userId: string): Observable<User> {
    console.log(`${ApiUrls.USER}/${userId}`)
    return this.httpClient.get<User>(`${ApiUrls.USER}/${userId}`);
  }

  fetchAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${ApiUrls.USER}/`)
  }


  launchUserSearch(){

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const send = {
      email: this.userResearchDto.email,
      username: this.userResearchDto.username,
      status: this.userResearchDto.status,
      role: this.userResearchDto.role,

    }

    return this.httpClient.post<any[]>(`${ApiUrls.USER}/byCriteria`,JSON.stringify(this.userResearchDto),{headers}).subscribe(
      (res)=>this.users =res,
      (error)=> console.error('error fetching users according criteria',error),
      ()=>this.isLoadingUser = true
    );
  }
}
