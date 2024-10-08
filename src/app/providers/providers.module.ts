import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import {AsideComponent} from "./aside/aside.component";



export const providersRoutes: Routes = [
  { path: 'providers', component: HomeComponent, children: [] },
  { path: 'providers', redirectTo: 'providers', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    HomeComponent,
    AsideComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(providersRoutes), FormsModule
  ],
  providers:[],
  exports:[RouterModule]
})
export class ProvidersModule { }
