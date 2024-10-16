import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'; // Import des locales françaises
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
import {ProvidersModule} from "./providers/providers.module";
import {TravelersModule} from "./travelers/travelers.module";
import {LessorModule} from "./lessor/lessor.module";
import {PropertyService} from "./services/property.service";
import {ImageService} from "./services/image.service";
import {AdminModule} from "./admin/admin.module";

registerLocaleData(localeFr, 'fr-FR'); // Enregistrer les données pour la locale 'fr-FR'


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PasswordComponent,
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
    PropertyService,
    ImageService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },// Définir 'fr-FR' comme locale par défaut
    DatePipe
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
