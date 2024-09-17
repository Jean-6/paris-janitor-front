import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PasswordService} from "./password.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit{

  passwordForm!: FormGroup;

  constructor(private router: Router,
              private password: PasswordService,
              public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      email: new FormControl(null,[Validators.required,Validators.email])
    });
  }

  onSubmit(){
    console.log(this.passwordForm.value);

  }


}
