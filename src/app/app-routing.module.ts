import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {PasswordComponent} from "./password/password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  {path : 'signin',component:SigninComponent},
  {path:'signup',component: SignupComponent},
  {path:'password',component:PasswordComponent},
  { path: "", component: SigninComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
