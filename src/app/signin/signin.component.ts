import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PasswordService} from "../password/password.service";
import {SigninService} from "./signin.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  private passwordRegex ="";

  constructor(private router: Router,
              private signinService: SigninService,
              public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]) //,Validators.pattern(this.passwordRegex)
    });

  }

  onSubmit(){
    console.log(this.signinForm.value);
    this.router.navigateByUrl("/clientLessor");
  }

}
