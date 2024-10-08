import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PasswordComponent } from './password/password.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SigninService} from "./signin/signin.service";
import {SignupService} from "./signup/signup.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {ErrorHandlerService} from "./services/error-handler.service";
import {ProvidersModule} from "./providers/providers.module";
import { HomeComponent } from './travelers/home/home.component';
import {TravelersModule} from "./travelers/travelers.module";
import {LessorModule} from "./lessor/lessor.module";
import {PropertyService} from "./services/property.service";
import {ImageService} from "./services/image.service";

import {AdminModule} from "./admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PasswordComponent,
    //HomeComponent,
    //HomeComponent,
    //HomeComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet,
    CommonModule,
    ProvidersModule,
    TravelersModule,
    LessorModule,
    AdminModule
  ],
  providers: [
    SigninService,
    SignupService,
    ReactiveFormsModule,
    ErrorHandlerService,
    PropertyService,
    ImageService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    DatePipe
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
