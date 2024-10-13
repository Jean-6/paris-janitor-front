import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {Property} from "../../model/property";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit ,OnDestroy{

  private userId : string = "66d5f19a64eebd353b503c85";
  myProperties :Property[] = [];
  isLoading:boolean = false;
  dataLoading:boolean = false;

  constructor(public propertyService:PropertyService,
              private authService: AuthService) {}


  ngOnInit(): void {
    this.getPropertiesUser();
  }

  getPropertiesUser(){
    this.propertyService.getPropertiesPerPage_()
      .subscribe({
        next:response => {
          this.myProperties = response.content
            .filter(prop =>prop.userId ===  this.userId && prop.userId);
        },
        error:err => console.log("Error encountered while retrieving data"+err),
        complete:()=> this.dataLoading=true
      })

  }


  ngOnDestroy(): void {}

  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }


}
