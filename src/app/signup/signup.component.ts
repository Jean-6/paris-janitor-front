import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SignupService} from "./signup.service";
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotifierService} from "angular-notifier";
import {SignupDto} from "../dto/signupDto";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ErrorHandlerService} from "../services/error-handler.service";

@Component({

  selector: 'app-signup',

  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private readonly notifier: NotifierService;
  submitted = false;
  signupForm!:FormGroup;
  private passwordRegex ="";

  constructor(private router: Router,
              private  signupService: SignupService,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private errorHandler: ErrorHandlerService
              ) {
    this.notifier = notifierService;

  }
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: new FormControl("",[Validators.required,Validators.minLength(4)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.pattern(this.passwordRegex)])
    });
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.addUser(this.signupForm.value);
  }

  addUser(signupDto: SignupDto){
    this.signupService.registerUser(signupDto)
      .subscribe(
        res => this.notifier.show({type:'success',message:'OK'}),
        error=> {
          this.notifier.show({type:'error',message:'Oups, une erreur est survenue'})
          this.errorHandler.handle(error);
        })
  }
}
