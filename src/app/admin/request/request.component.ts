import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {DeliveryService} from "../../services/delivery.service";
import {DeliveryRequest} from "../../model/deliveryRequest";
import {DeliveryReqService} from "../../lessor/delivery-req/delivery-req.service";
import {DatePipe} from "@angular/common";
import {User} from "../../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiUrls} from "../../.env";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{


  deliveriesRequest: DeliveryRequest[]=[];
  providers : User[]=[];
  loadingData = false;
  loadingProvider = false;
  assignRequestForm!:FormGroup;

  constructor(private userService : UserService,
              private authService:AuthService,
              private deliveryRequestService: DeliveryReqService,
              private pipeDate: DatePipe,
              private httpClient:HttpClient,
              private formBuilder: FormBuilder){
  }

  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();

  }

  ngOnInit(): void {

    this.assignRequestForm=this.formBuilder.group({
      requestId:new FormControl(null, [Validators.required]),
      providerId:new FormControl(null, [Validators.required]),
    })

    this.userService.userResearchDto.role="PROVIDER";

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient.post<any[]>(`${ApiUrls.USER}/byCriteria`,JSON.stringify(this.userService.userResearchDto),{headers}).subscribe(
      (res)=> {
        this.providers = res;
      },
      (error)=> console.error('error fetching users according criteria',error),
      ()=>this.loadingProvider = true
    );



    this.deliveryRequestService.getAllDeliveryRequests().subscribe(
      (res)=>{
        //this.deliveriesRequest=res;
        this.deliveryRequestService.associateAllDeliveryToRequests(res).subscribe(
          (res)=>{
            this.deliveriesRequest = res;
            console.log(this.deliveriesRequest)
          },
          (error)=> console.error('Error fetching all deliveries request associate to request'),
        )
      },
      error=>console.error('error fetching all deliveries requests'),
      ()=>this.loadingData=true
    )

  }

  // Getter for 'provider' form control
  get provider() {
    return this.assignRequestForm.get('provider');
  }

  // Getter for 'request' form control
  get request() {
    return this.assignRequestForm.get('request');
  }


  assignRequest(requestId:string ){
    console.log(requestId)
    console.log(this.assignRequestForm.value)
    this.httpClient.post<DeliveryRequest>(`${ApiUrls.DELIVERY_REQUEST}/assign?providerId=${this.assignRequestForm.value.providerId}&requestId=${requestId}`,{}).subscribe(
      (next)=>{
      },
      (error)=> console.error('error attributing request'),
      ()=>{
      }
    )

  }

  refreshData(){
    this.loadingData = false;
    setTimeout(()=>{
      this.ngOnInit()
    },500)
  }


}
