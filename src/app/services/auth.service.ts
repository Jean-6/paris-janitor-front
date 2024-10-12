import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiUrls} from "../../../../paris-janitor-front_unzipped/paris-janitor-front/src/app/.env";
import {User} from "../../../../paris-janitor-front_unzipped/paris-janitor-front/src/app/model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  // Méthode pour effectuer la requête de connexion
  login(credentials: { email: string, password: string }): Observable<User> {
    return this.httpClient.post<User>(`${ApiUrls.LOGIN_URL}`, credentials);
  }

  // Méthode pour se déconnecter
  logout(): void {
    // Supprimer le token du localStorage ou sessionStorage
    //localStorage.removeItem('token');

    // Redirection vers la page de connexion
    this.router.navigate(['/']);
  }

}
