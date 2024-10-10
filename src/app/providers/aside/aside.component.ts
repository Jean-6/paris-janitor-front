import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {


  constructor(private authService: AuthService) {}
  ngOnInit(): void {
  }

  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }

}
