import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {PropertyService} from "../../services/property.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Property} from "../../model/property";
import {ApiUrls} from "../../.env";
import {PropertyStatus} from "../../model/propertyStatus";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit,OnDestroy{

  propertyDetails: Property = new Property();
  loadingProperty = false;
  propertyId: string = "";

  constructor(private authService: AuthService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private propertyService: PropertyService) {
  }

  ngOnInit(): void {

    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    this.loadPropertyData()

  }

  loadPropertyData() {
    this.propertyService.getPropertyById(this.propertyId).subscribe({
      error: (err) => console.error('error updating property status by id', err),
      next: res =>{
        console.log("res : "+res.status);
        this.propertyDetails = res;
        this.loadingProperty = true;
      },
      complete: ()=> this.loadingProperty = false,
    })

  }


  activateStatus() {
    return this.httpClient.post<any>(`${ApiUrls.PROPERTY}/active/${this.propertyId}`, {}).subscribe({
      next: (res) => {
        this.loadingProperty=true;
      },
      error: (err) => console.error('error updating property status by id', err),
      complete: () => {
        this.loadingProperty = false
      }
    })
  }

  // Appeler la méthode de déconnexion
  onLogout(): void {
    this.authService.logout();
  }

  refreshData(){
    this.loadingProperty = true;
    setTimeout(()=>{
      this.ngOnInit()
    },500)
  }

  ngOnDestroy(): void {
  }

  protected readonly PropertyStatus = PropertyStatus;
}
