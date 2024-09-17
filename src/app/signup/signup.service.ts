import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupDto} from "../dto/signupDto";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../model/user";
import {ErrorHandlerService} from "../services/error-handler.service";
import {NotifierService} from "angular-notifier";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupUrl="http://localhost:8080/api/auth/signup";
  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {}
  registerUser(signupDto: SignupDto):Observable<String>{
    return this.http.post<String>(this.signupUrl,signupDto)
      .pipe(
        catchError((err:any) => {
          return throwError(err);
        })
      );
  }
}
