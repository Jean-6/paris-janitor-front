import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandlerService} from "../services/error-handler.service";
import {SignupDto} from "../dto/signupDto";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../model/user";
import {SigninDto} from "../dto/signinDto";

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private signinUrl="http://localhost:8080/api/auth/signin";
  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {}

  auth(signinDto: SigninDto):Observable<User>{
    return this.http.post<User>(this.signinUrl,signinDto)
      .pipe(
        catchError((err:any) => {
          return throwError(err);
        })
      );
  }

}
