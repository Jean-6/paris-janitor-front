import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {ImageService} from "../../services/image.service";
import {Property} from "../../model/property";
import {ActivatedRoute} from "@angular/router";
import {DeliveryService} from "../../services/delivery.service";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeliveryReqService} from "../delivery-req/delivery-req.service";
import {CalendarService} from "../../services/calendar.service";
import {BookingService} from "../booking/booking.service";
import {DeliveryDto} from "../../dto/deliveryDto";
import {DatePipe} from "@angular/common";

import * as $ from 'jquery';
import {Booking} from "../../model/booking";
import {Delivery} from "../../model/delivery";
import {Observable} from "rxjs";
import {DeliveryRequest} from "../../model/deliveryRequest";



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy,AfterViewInit {


  propertyDetails!:Property;
  loadPropertyDetails = false;
  loadPropertyBooking = false;
  isLoadingDeliveries = false;
  successMessage: string = '';
  errorMessage: string = ''




  //reloadBookings = false;
  weekNumber!:number;
  //today = new Date();
  bookingRegistred!: Booking;



  isLoading:boolean = false;

  isLoadingBooking = false;
  isSaveBooking = false;
  //propertyId!: string ;

  deliveryReqForm!:FormGroup;
  bookingDateForm!:FormGroup;
  deliveries:Delivery[]=[];


  dayOfWeek=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
  morningHour=["8h00","9h00","10h00","11h00"]
  afternoonHour=["14h00","15h00","16h00","17h00"]

  userId!:string;



  constructor(private propertyService:PropertyService,
              private imageService:ImageService,
              private router:ActivatedRoute,
              private deliveryService: DeliveryService,
              private deliveryRequestService: DeliveryReqService,
              private formBuilder: FormBuilder,
              private calendarService:CalendarService,
              public bookingService:BookingService,
              private datePipe: DatePipe) {}


  ngOnInit(): void {

    this.userId = localStorage.getItem("userId") || '';

    this.disableOtherCheckBoxes()
    this.deliveryReqForm = this.formBuilder.group({
      type:[null,Validators.required],
      description:[null, Validators.required],

    });
    this.bookingDateForm = this.formBuilder.group({
      dayOfWeek: this.formBuilder.array([])
    });

    /*========*/
    this.router.queryParams.subscribe({
      next: param => this.propertyService.getPropertyById(param["id"]).subscribe({
        next: res =>{
          console.log("res : "+res)
          this.propertyDetails = res;
          this.bookingService.propertyId= param["id"]
        },
        error: err => console.error('Error fetching property details',err),
        complete: ()=> this.loadPropertyDetails = true,
      }),
      error: err=> console.error('Error fetching property param id',err),
      //complete: ()=> this.loadPropertyDetails = true,
    })


    this.router.queryParams.subscribe({
      next: param => {
        this.bookingService.propertyId= param["id"];
        //this.reloadData()
        this.bookingService.fetchAllBookingsData(param["id"], this.bookingService.weekNumber,this.bookingService.startAndEndDateWeek.startOfWeek.getFullYear().toString()).subscribe({
          next: res => {
            this.bookingService.propertyBookings = res;
            console.log(res);

            setTimeout(()=>{
              this.ngAfterViewInit()
            },600)
          },
          error: err => console.log('Error fetching property bookings ',err),
          complete: ()=> {
            this.loadPropertyBooking = true;
          }
        })
      },
      error:err => console.error('Error fetching property param id',err),
      complete: ()=>{}
    })
    //this.disabledCheckboxes()
    console.log("compo : "+this.bookingService.propertyId,this.bookingService.weekNumber,this.bookingService.startAndEndDateWeek.startOfWeek.getFullYear().toString())

    //============
    this.deliveryService.getDeliveries().subscribe({
      next:res=>this.deliveries = res,
      error: err=>{
        console.error('Error fetching deliveries ',err);
        this.deliveries=[]
      },
      complete:()=>this.isLoadingDeliveries=true,
    })
  }




  onSubmitDeliveryRequest(){

    console.log("delivery request user id: "+this.userId)

    const deliveryRequest:DeliveryRequest={
      propertyId: this.bookingService.propertyId,
      type: this.deliveryReqForm.value.type,
      description: this.deliveryReqForm.value.description,
      userId: this.userId,
      stage:[]
    }

    this.deliveryRequestService.saveDeliveryRequest(deliveryRequest)
      .subscribe(
        (next)=>{
          this.successMessage = 'Demande de prestation éffectuée !';
          this.errorMessage = '';
        },
        (err)=>{
          console.error('error saving data',err)
          this.successMessage = '';
          this.errorMessage ='Erreur.'
        }
      );
  }


  onSubmitBookingDate() {
    const checkbox = document.querySelector('input[type="checkbox"]:checked');
    if (!checkbox) {
      alert("Aucun créneau n'a été sélectionné")
    } else {
      const hourOfDay = checkbox?.getAttribute("value")
      let day = checkbox?.getAttribute("name")?.split("-", 1);
      if (day) {
        const booking = {
          propertyId:this.propertyDetails.id,
          userId: this.userId,
          weekNumber: this.bookingService.weekNumber,
          dayOfWeek: day[0].toString(),
          hourOfDay: hourOfDay,
          year: this.bookingService.startAndEndDateWeek.startOfWeek.getFullYear().toString(),
        }
        //console.log("booking saved :"+booking)
        this.bookingService.saveBooking(booking).subscribe({
          next: res => {
            this.successMessage = 'Réservation éffectuée avec succès !';
            this.errorMessage = '';
          },
          error: err => {
            console.error('error saving data',err)
            this.successMessage = '';
            this.errorMessage ='Erreur.'
          },
          complete: () => {}
        })
      }
      this.bookingDateForm.reset()
    }
  }


  disableOtherCheckBoxes(){

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxChecked = document.querySelector('input[type="checkbox"]:checked');

    if(checkboxChecked){
      checkboxes.forEach((checkbox)=>{
        if(checkbox !== checkboxChecked && !checkbox.classList.contains("reserved")) checkbox.className = 'disabled';
      })
    }else{
      checkboxes.forEach((checkbox)=>{
        if(checkbox !== checkboxChecked && !checkbox.classList.contains("reserved")) checkbox.classList.remove('disabled');
      })
    }

  }


  disabledCheckboxes(){
    console.log("Mise à jour ")
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox){
      if(checkbox.classList.contains('reserved')){
        checkbox.classList.remove('reserved')
        //checkbox.className = '';
      }
    });
    if(this.bookingService.propertyBookings){
      this.bookingService.propertyBookings.forEach(booking=>{
        console.log("disabledCheckBoxes :"+booking.dayOfWeek+" "+booking.hourOfDay)
        const checkbox =  document.getElementsByName(booking.dayOfWeek+'-'+booking.hourOfDay);
        checkbox[0].classList.add('reserved')
      })
    }

  }

  reloadData(){

    console.log("reload data : "+this.bookingService.propertyBookings)

    this.bookingService.fetchAllBookingsData(this.bookingService.propertyId,this.bookingService.weekNumber,this.bookingService.startAndEndDateWeek.startOfWeek.getFullYear().toString()).subscribe({
      next: (res) => {
        this.bookingService.propertyBookings=res;

        this.disabledCheckboxes();
        //this.reloadBookings = true;
      },
      error: (err)=>{
        console.error('Error data reloading',err);
        //this.reloadBookings = false;
      },
      complete:()=>{
        //this.reloadBookings =false;
      }
    })

  }


  ngOnDestroy(): void {
    this.bookingService.propertyBookings = []
  }

  // Méthode appelée à chaque clic pour recharger les données
  refreshData() {
    this.reloadData();  // Recharge les données via l'Observable
  }

  ngAfterViewInit(): void {
    console.log("afterView end : "+this.bookingService.propertyBookings)
    this.disabledCheckboxes()
    //this.reloadBookings = false;
  }

}
