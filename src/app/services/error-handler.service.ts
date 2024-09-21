import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }
  handle(error:Error): void {
    console.error('Oups , une erreur s\'est produite:',error);
    throwError('Something went wrong')
  }
}
