import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {Property} from "../../model/property";

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit ,OnDestroy{

  private userId : string = "66d5f19a64eebd353b503c85";
  myProperties :Property[] = [];
  isLoading:boolean = false;

  constructor(private propertyService:PropertyService) {}
  ngOnInit(): void {

    this.propertyService.getPropertiesByUserId(this.userId)
      .subscribe(
        (res)=>{this.myProperties=res},
        (error)=>{console.error(error)},
        ()=> this.isLoading = true
    )
  }
  ngOnDestroy(): void {}

}
