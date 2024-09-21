import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdCreationComponent} from "./ad-creation/ad-creation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DetailsComponent } from './details/details.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { DeliveryReqComponent } from './delivery-req/delivery-req.component';
import {AsideComponent} from "./aside/aside.component";
import { InvoiceComponent } from './invoice/invoice.component';
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



export const clientLessorRoutes: Routes = [
  { path: 'lessor', component: HomeComponent, children: [] },
  { path: 'ad-creation', component:AdCreationComponent},
  { path: 'details', component:DetailsComponent}, //details/:id
  { path: 'my-ads',component:MyAdsComponent},
  { path: 'delivery-request',component:DeliveryReqComponent},
  { path: 'invoice',component:InvoiceComponent},
  { path: 'lessor', redirectTo: 'lessor', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AdCreationComponent,
    HomeComponent,
    DetailsComponent,
    MyAdsComponent,
    DeliveryReqComponent,
    AsideComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(clientLessorRoutes), FormsModule,
    ReactiveFormsModule, CalendarModule,BrowserAnimationsModule
  ],
  providers:[


  ],
  exports:[RouterModule]
})
export class LessorModule { }
