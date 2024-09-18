import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {ImageService} from "../../services/image.service";
import {Property} from "../../model/property";
import {ActivatedRoute} from "@angular/router";
import {DeliveryService} from "../../services/delivery.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeliveryReqService} from "../delivery-req/delivery-req.service";
import {CalendarService} from "../../services/calendar.service";
import {BookingService} from "../../services/booking.service";
import {DeliveryDto} from "../../dto/deliveryDto";
import {Status} from "../../model/status";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {

  isLoading:boolean = false;
  isLoadingDeliveries = false;

  isLoadingBooking = false;
  isSaveBooking = false;

  propertyId!: string ;

  propDetails:Property=new Property();
  deliveryReqForm!:FormGroup;
  bookingDateForm!:FormGroup;
  deliveries:DeliveryDto[]=[];

  requestStatus!: Status ;//= Status.PENDING;

  dayOfWeek:string[]=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
  morningHour:string[]=["8h00","9h00","10h00","11h00"]
  afternoonHour:string[]=["14h00","15h00","16h00","17h00"]

  private userId:string="66d5f19a64eebd353b503c85";


  constructor(private propertyService:PropertyService,
              private imageService:ImageService,
              private router:ActivatedRoute,
              private deliveryService: DeliveryService,
              private deliveryRequestService: DeliveryReqService,
              private formBuilder: FormBuilder,
              private calendarService:CalendarService,
              private bookingService:BookingService) {}

  private weekDates = this.calendarService.getWeekDates(2024,37);

  ngOnInit(): void {
    this.disableOtherCheckBoxes()
    console.log("###")

    const year = new Date().getFullYear();
    console.log("full year : "+year)
    const weekNumber = this.calendarService.getWeekNumber(new Date());
    console.log("week number : "+weekNumber)
    const daysWeek = this.weekDates;

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

    this.bookingDateForm = this.formBuilder.group({
    dayOfWeek: this.formBuilder.array([])
    });

    this.getAllDelivery();
    this.router.queryParams
      .subscribe(
        (params) => {
          this.propertyId = params["id"];
          console.log("Details id :"+params["id"]);
          this.getData(params["id"]);
          },
        (err)=>{},
        ()=>this.isLoading=true
      )
  }

  getBookingsArray() {
    return this.bookingDateForm.get('') as FormArray;
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

  /*saveBookingData(){
public userId?: string,
    private propertyId?: string,
    public type?: string,
    public  status?: Status,
    public createdAt?: Date,
  }*/

  onSubmitDeliveryReq(){
    console.log("PropertyId : "+this.propertyId);
    console.log("type :"+this.deliveryReqForm.value["type"])
    console.log("description :"+this.deliveryReqForm.value["description"])
    this.deliveryRequestService.saveDeliveryRequest(
      this.propertyId,
      this.deliveryReqForm.value)
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
    //Si aucun creneau reserve , afficher message
    const checkbox = document.querySelector('input[type="checkbox"]:checked');

    this.bookingService.saveData({}).subscribe(
      (res)=>{},
      (err:any)=>{},
      ()=>this.isSaveBooking = true)
    //booking
    //console.log(checkboxes)
    /*checkboxes.forEach(c=>{
      console.log(c.getAttribute("name"))
    })*/

  }

  prev() {

    const prevBtn =document.getElementById("prevBtn");
    alert("prev")

  }

  next(){
    const nextBtn =document.getElementById("nextBtn");
    alert("next")

  }

  ngOnDestroy(): void {}

  disableOtherCheckBoxes(){
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkboxChecked = document.querySelector('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox=>{
      if(!checkboxChecked){
        checkbox.classList.remove('disabled')
      }else{
        if(checkbox!=checkboxChecked) checkbox.className='disabled'
      }
    });
  }
  onCheckBoxesChange(){}
  resetCheckBoxes(){}
}
