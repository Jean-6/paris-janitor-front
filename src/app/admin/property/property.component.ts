import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {Property} from "../../model/property";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit ,OnDestroy{


  properties :Property[] = [];
  isLoadingProperties = false;

  constructor(public propertyService: PropertyService,
              private authService: AuthService,
              ) {
  }


  ngOnInit() {
    this.propertyService.getProperties().subscribe({
      next:res=>{
        this.properties=res
      },
      error:err=>{
        console.log("error fetching properties data:"+err)
        this.properties=[]
      },
      complete:()=>this.isLoadingProperties=true,
    })
  }

  ngOnDestroy() {
  }


  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }



}
