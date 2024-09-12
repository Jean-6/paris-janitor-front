import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {NotifierService} from "angular-notifier";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {PropertyService} from "../../services/property.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-ad-creation',
  templateUrl: './ad-creation.component.html',
  styleUrls: ['./ad-creation.component.css']
})
export class AdCreationComponent implements OnInit{

  private readonly notifier: NotifierService;
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
              private notifierService: NotifierService,
              private errorHandler: ErrorHandlerService,
              private propertyService : PropertyService) {
    this.notifier = notifierService;
  }
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

  selectFile(e:Event){

  }


  uploadFile(){

  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  onSubmit(){
    console.log(this.adForm.value);
    this.propertyService
      .saveData(this.adForm.value)
      .subscribe({
          next:(res) => {console.log()},
          error:(err)=>{},
          complete:()=>{
            this.notifier.show({type:'success',message:'OK'});
            this.adFormSubmitted=true
          }
        }
      );
  }


}
