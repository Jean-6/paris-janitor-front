import {Component,OnInit} from '@angular/core';
import {User} from "../../model/user";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ApiUrls} from "../../.env";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


  user: User = new User();
  loadingUser = false;
  userId: string = "";

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private httpClient: HttpClient) {
  }


  ngOnInit(): void {
    // Récupérer l'ID du produit à partir des paramètres de la route
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.httpClient.get<User>(`${ApiUrls.USER}/${this.userId}`).subscribe(
      (res) => {
        this.loadingUser=true;
        this.user = res;
      },
      (error) => console.error('error fetching user by id', error),
      () => this.loadingUser = false
    )
  }

  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }

  status(userId: string) {
    return this.httpClient.post<any>(`${ApiUrls.USER}/active/${userId}`, {}).subscribe({
      error: (err) => console.error('error updating user status by id', err),
      next: (res) => {
        this.loadingUser=true;
      },
      complete: () => {
        this.loadingUser = false
      }
    })
  }

  refreshData(){
    this.loadingUser = true;
    setTimeout(()=>{
      this.ngOnInit()
    },500)
  }
}
