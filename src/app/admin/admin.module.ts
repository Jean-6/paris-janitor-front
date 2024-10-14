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



export const adminRoutes: Routes = [
  { path: 'admin-property-details/:id', component: PropertyDetailsComponent, children: [] },
  { path: 'admin-user-details/:id', component: UserDetailsComponent, children: [] },
  { path: 'admin/users', component: UserComponent, children: [] },
  { path: 'admin/ads', component: PropertyComponent, children: [] },
  { path: 'admin', redirectTo: 'admin/ads', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    UserComponent,
    PropertyComponent,
    UserDetailsComponent,
    PropertyDetailsComponent
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
