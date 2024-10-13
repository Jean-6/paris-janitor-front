import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ImageService} from "../../services/image.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {PropertyService} from "../../services/property.service";
import {DeliveryReqService} from "./delivery-req.service";
import {DeliveryRequest} from "../../model/deliveryRequest";


import {DatePipe} from "@angular/common";
import {Delivery} from "../../model/delivery";
import {DeliveryService} from "../../services/delivery.service";
import {AuthService} from "../../services/auth.service";

//import * as $ from 'jquery';
//import * as $ from 'jquery';
//npm i --save-dev @types/ jquery

@Component({
  selector: 'app-delivery-req',
  templateUrl: './delivery-req.component.html',
  styleUrls: ['./delivery-req.component.css']
})
export class DeliveryReqComponent implements OnInit,OnDestroy {

  deliveryRequests: DeliveryRequest[] = [];
  deliveriesType: Delivery[] = [];
  propertyIds: string[] = [];
  isLoadingdeliveryRequest= false;
  isLoadingDeliveries=false;
  userId!: string ;


  constructor(private imageService: ImageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private errorHandler: ErrorHandlerService,
              private propertyService: PropertyService,
              public deliveryRequestService: DeliveryReqService,
              public deliveryService: DeliveryService,
              public datePipe : DatePipe,
              private authService: AuthService) {
  }


  ngOnInit(): void {

    this.userId = localStorage.getItem("userId") || '';
    this.getDeliveriesType();
    this.getDeliveriesRequest(this.userId);


  }

  getDeliveriesType(){
    this.deliveryService.getDeliveries().subscribe(
      (res)=> this.deliveriesType = res,
      (error)=> console.error('Error fetching deliveries data'),
      ()=> this.isLoadingDeliveries=true,
    )
  }

  getDeliveriesRequest(userId : string){
    this.deliveryRequestService.getDeliveryRequestsByUserId(userId).subscribe(
      (res) => {
        console.log("res :"+res)
        this.deliveryRequestService.associateDeliveryToRequests(res).subscribe({
          next: (updatedRequests) => {
            console.log('Updated Delivery Requests:', updatedRequests);
            this.deliveryRequests = updatedRequests;
          }
        })
        console.log(res)
      },
      (err)=>{},
      ()=>{this.isLoadingdeliveryRequest=true});
  }


  ngOnDestroy(): void {

  }


  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }



}
