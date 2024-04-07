import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLandingComponent } from '../headers/header-landing/header-landing.component';
import { MainLandingComponent } from './main-landing/main-landing.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MainLandingComponent,
    HeaderLandingComponent
  ], 
  exports: [
    MainLandingComponent,
    HeaderLandingComponent
  ]
})
export class LandingModule { }
