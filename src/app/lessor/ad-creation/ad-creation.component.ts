import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-ad-creation',
  templateUrl: './ad-creation.component.html',
  styleUrls: ['./ad-creation.component.css']
})
export class AdCreationComponent implements OnInit{

  private currentFile?:File;
  submitted = false;
  adForm!:FormGroup;
  pictureForm!:FormGroup;
  savedPropertyId:string="";
  //isRegistered = false;

  private areaRegex = /\b(1000|[1-9][0-9]{0,2})\b/; //1 à 1000m2
  private piecesRegex =  /^(1[0-9]|[1-9])$/;
  private rentRegex =/^(?:[1-9]\d{0,2}(?:[\s,]?\d{3})*|\d+)(?:\.\d{1,2})?$/;
  private descriptionRegex ="";
  private streetRegex = /^[0-9]{1,4}\s[A-Za-zÀ-ÖØ-öø-ÿ' -]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ' -]+)*,\s?[0-9]{5}\s[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
  private streetRegex1= /^\d{1,4}\s+[a-zA-Zéèêàôîïç\s'-]+(?:,\s?[a-zA-Zéèêàôîïç\s'-]+)*$/;
  private cityRegex =/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+(?:-[A-Za-zÀ-ÖØ-öø-ÿ' -]+)*$/;
  private zipRegex = /^[0-9]{5}$/;

  adFormSubmitted : boolean=false;

  constructor(private imgService:ImageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private errorHandler: ErrorHandlerService,
              private propertyService : PropertyService) {
  }
  ngOnInit(): void {

    this.adForm = this.formBuilder.group({
      type: new FormControl("",[Validators.required,Validators.minLength(4)]),
      area: new FormControl("",[Validators.required,Validators.pattern(this.areaRegex)]),
      pieces: new FormControl("",[Validators.required,Validators.pattern(this.piecesRegex)]),
      rent: new FormControl("",[Validators.required,Validators.pattern(this.rentRegex)]),
      description: new FormControl("",[Validators.required,Validators.pattern(this.descriptionRegex)]),
      street: new FormControl("",[Validators.required,Validators.pattern(this.streetRegex1)]),
      city: new FormControl("",[Validators.required,Validators.pattern(this.cityRegex)]),
      zip: new FormControl("",[Validators.required,Validators.pattern(this.zipRegex)]),
    });

    this.pictureForm = this.formBuilder.group({
      picture:new FormControl("")
    })
  }

  selectFile(event:any): void{
    if(event.target.files.length>0){
      this.currentFile = event.target.files.item(0);
    }
  }


  onSubmitAdForm(){
    console.log(this.adForm.value);
    this.propertyService
      .saveData(this.adForm.value)
      .subscribe({
          next:(res) => this.savedPropertyId=res.id,
          error:(err)=>console.log(err),
          complete:()=>{
            this.adFormSubmitted=true;
            this.adForm.reset()
          }
        }
      );

  }

  uploadFile(){
    if(this.currentFile){
      const formData = new FormData();
      formData.append("file",this.currentFile)
      this.imgService.uploadImg(this.savedPropertyId,formData).subscribe(
        {
          next:(res) => {

          },
          error:(err)=>{
            console.error('Error uploading file:', err);
          },
          complete:()=>{
            this.pictureForm.reset()
          }
        }
      )

    }
  }



}
