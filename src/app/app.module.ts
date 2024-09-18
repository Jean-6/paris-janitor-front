import { NgModule } from '@angular/core';
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
import {CommonModule} from "@angular/common";
import {ErrorHandlerService} from "./services/error-handler.service";
import {ProvidersModule} from "./providers/providers.module";
import { HomeComponent } from './travelers/home/home.component';
import {TravelersModule} from "./travelers/travelers.module";
import {LessorModule} from "./lessor/lessor.module";
import {PropertyService} from "./services/property.service";
import {ImageService} from "./services/image.service";
import { AsideComponent } from './aside/aside.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PasswordComponent,
    HomeComponent,
    AsideComponent,
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
    LessorModule
  ],
  providers: [
    SigninService,
    SignupService,
    ReactiveFormsModule,
    ErrorHandlerService,
    PropertyService,
    ImageService,
    //DeliveryReqService
  ],
  exports: [
    AsideComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
