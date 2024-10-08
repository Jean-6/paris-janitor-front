import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {AsideComponent} from "./aside/aside.component";


export const travelersRoutes: Routes = [
  { path: 'travelers', component: HomeComponent, children: [] },
  { path: 'travelers', redirectTo: 'travelers', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    HomeComponent,
    AsideComponent,
  ],
  exports: [
  ],
    imports: [
        CommonModule, RouterModule.forChild(travelersRoutes), FormsModule,
        ReactiveFormsModule
    ]
})
export class TravelersModule { }
