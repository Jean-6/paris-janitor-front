import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(public userService: UserService,
              private authService: AuthService) {
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.userService.fetchAllUser().subscribe({
      next: res=> this.userService.users = res,
      error:err=>{
        console.log("error fetching users data:"+err)
        this.userService.users = [];
      },
      complete:()=>this.userService.isLoadingUser=true,
    })
  }

  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }
}
