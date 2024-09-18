import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../../services/image.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-delivery-req',
  templateUrl: './delivery-req.component.html',
  styleUrls: ['./delivery-req.component.css']
})
export class DeliveryReqComponent {
  submitted = false;
  adForm!:FormGroup;
  //isRegistered = false;

  private areaRegex = /\b(1000|[1-9][0-9]{0,2})\b/; //1 à 1000m2
  private piecesRegex =  /^(1[0-9]|[1-9])$/;
  private rentRegex =/^(?:[1-9]\d{0,2}(?:[\s,]?\d{3})*|\d+)(?:\.\d{1,2})?$/;
  private descriptionRegex ="";
  private streetRegex = /^[0-9]{1,4}\s[A-Za-zÀ-ÖØ-öø-ÿ' -]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ' -]+)*,\s?[0-9]{5}\s[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
  private cityRegex =/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+(?:-[A-Za-zÀ-ÖØ-öø-ÿ' -]+)*$/;
  private zipRegex = /^[0-9]{5}$/;

  adFormSubmitted : boolean=false;


  constructor(private imageService:ImageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private errorHandler: ErrorHandlerService,
              private propertyService : PropertyService) {}


  ngOnInit(): void {
    this.adForm = this.formBuilder.group({
      type: new FormControl("",[Validators.required,Validators.minLength(4)]),
      area: new FormControl("",[Validators.required,Validators.pattern(this.areaRegex)]),
      pieces: new FormControl("",[Validators.required,Validators.pattern(this.piecesRegex)]),
      rent: new FormControl("",[Validators.required,Validators.pattern(this.rentRegex)]),
      description: new FormControl("",[Validators.required,Validators.pattern(this.descriptionRegex)]),
      street: new FormControl("",[Validators.required,Validators.pattern(this.streetRegex)]),
      city: new FormControl("",[Validators.required,Validators.pattern(this.cityRegex)]),
      zip: new FormControl("",[Validators.required,Validators.pattern(this.zipRegex)]),
    });
  }


}
