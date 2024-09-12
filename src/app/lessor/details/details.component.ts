import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {ImageService} from "../../services/image.service";
import {Property} from "../../model/property";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {DeliveryService} from "../../services/delivery.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Delivery} from "../../model/delivery";
import {DeliveryReqService} from "../delivery-req/delivery-req.service";
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {

  isLoading:boolean = false;
  isLoadingDeliveries = false;

  propDetails:Property=new Property();
  deliveryReqForm!:FormGroup;
  bookingDateForm!:FormGroup;
  deliveries:Delivery[]=[];

  dayOfWeek:string[]=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
  morningHour:string[]=["8h00","9h00","10h00","11h00"]
  afternoonHour:string[]=["14h00","15h00","16h00","17h00"]


  constructor(private propertyService:PropertyService,
              private imageService:ImageService,
              private router:ActivatedRoute,
              private deliveryService: DeliveryService,
              private delReqService: DeliveryReqService,
              private formBuilder: FormBuilder,
              private calendarService:CalendarService) {}

  ngOnInit(): void {
    console.log("###")

    const year = new Date().getFullYear();
    console.log("full year : "+year)
    const weekNumber = this.calendarService.getWeekNumber(new Date());
    console.log("week number : "+weekNumber)
    const daysWeek = this.calendarService.getWeekDates(2024,37);

    console.log(daysWeek);

    //console.log("week number : "+this.calendarService.getWeekNumber(new Date()))
    //let date= new Date()
    //let year=date.getFullYear();
    //console.log(date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear())
    console.log("###")
    this.deliveryReqForm = this.formBuilder.group({
      type:[null,Validators.required],
      description:[null, Validators.required],

      });

    this.bookingDateForm = this.formBuilder.group(
      {
        bookings: new FormArray([])
      });

    this.getAllDelivery();
    this.router.queryParams
      .subscribe(
        (params) => {
          console.log("Details id :"+params["id"]);
          this.getData(params["id"]);
          },
        (err)=>{},
        ()=>this.isLoading=true
      )
  }


  getData(propId:String){
    this.propertyService.getPropertyById(propId)
      .subscribe(
        (res)=>{
          this.propDetails=res;
        },
        (err:any)=>{
          console.error('Error fetching data:',err)
        },
        ()=>this.isLoading=true
      )
  }

  getAllDelivery(){
    this.deliveryService.getDeliveries()
      .subscribe(
        (res)=>{this.deliveries=res},
        (err:any)=>{},
        ()=>this.isLoadingDeliveries=true
      )
  }

  onSubmit(){
    console.log(this.deliveryReqForm.value)
    this.delReqService.saveData(this.deliveryReqForm.value)
      .subscribe({
        next: (res) => {
          console.log()
        },
        error: (err) => {
        },
        complete: () => {/*this.notifier.show({type:'success',message:'OK'});this.adFormSubmitted=true*/}
      }
    );
  }

  onSubmitBookingDate(){
    console.log(this.bookingDateForm.value)
  }

  prev() {

    const prevBtn =document.getElementById("prevBtn");

  }

  next(){
    const nextBtn =document.getElementById("nextBtn");
  }

  ngOnDestroy(): void {}


}
