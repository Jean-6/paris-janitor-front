import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PasswordService} from "../password/password.service";
import {SigninService} from "./signin.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  private passwordRegex ="";

  constructor(private router: Router,
              private authService: AuthService,
              public formBuilder: FormBuilder) { }
  ngOnInit() {

    this.signinForm = this.formBuilder.group({
      email: new FormControl("",[Validators.required,Validators.email]),
      //username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]) //,Validators.pattern(this.passwordRegex)
    });

  }

  onSubmit(){
    console.log(this.signinForm.value);
    this.authService.login(this.signinForm.value).subscribe(

      response => {
        console.log("role : "+response.roles)
        localStorage.setItem('userId', response.id?.toString() || '');
        //localStorage.setItem('user.id', response.id?.toString() || '');// Stocker le token dans le localStorage

        if(response.roles=="PROVIDER"){
          this.router.navigate(['/provider']);
        }else if(response.roles=="ADMIN"){
          this.router.navigate(['/admin']);
        }else if(response.roles=="LESSOR"){
          this.router.navigate(['/lessor']);
        }else if(response.roles=="PROVIDER"){
          this.router.navigate(['/provider']);
        }else if(response.roles=="TRAVELER"){
          this.router.navigate(['/traveler']);
        }else{
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

}
