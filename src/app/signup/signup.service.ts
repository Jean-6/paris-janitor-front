import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupDto} from "../dto/signupDto";
import { Observable} from "rxjs";
import {ApiUrls} from "../.env";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {}


  registerUser(signupDto: SignupDto):Observable<String>{
    return this.http.post<String>(ApiUrls.SIGNUP,signupDto);
  }
}
