import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../lessor/booking/booking.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit,OnDestroy,AfterViewInit {


  availabilityForm!: FormGroup;

  dayOfWeek=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
  morningHour=["8h00","9h00","10h00","11h00"]
  afternoonHour=["14h00","15h00","16h00","17h00"]


  constructor(public bookingService: BookingService,
              private formBuilder: FormBuilder) {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.availabilityForm = this.formBuilder.group({

    })
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
  refreshData(){

  }

}
