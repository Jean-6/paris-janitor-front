import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { UserComponent } from './user/user.component';
import { PropertyComponent } from './property/property.component';
import {PropertyService} from "../services/property.service";
import {ImageService} from "../services/image.service";
import {UserService} from "../services/user.service";
import { UserDetailsComponent } from './user-details/user-details.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { RequestComponent } from './request/request.component';



export const adminRoutes: Routes = [
  { path: 'admin-property-details/:id', component: PropertyDetailsComponent},
  { path: 'admin-user-details/:id', component: UserDetailsComponent },
  { path: 'admin/delivery-request', component: RequestComponent },
  { path: 'admin/users', component: UserComponent },
  { path: 'admin/ads', component: PropertyComponent},
  { path: 'admin', redirectTo: 'admin/ads', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    UserComponent,
    PropertyComponent,
    UserDetailsComponent,
    PropertyDetailsComponent,
    RequestComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(adminRoutes), FormsModule,
    ReactiveFormsModule, BrowserAnimationsModule
  ],
  providers: [
    ReactiveFormsModule,
    PropertyService,
    ImageService,
    UserService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    DatePipe
  ],
})
export class AdminModule { }
