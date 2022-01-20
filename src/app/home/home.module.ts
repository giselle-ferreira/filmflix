import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class HomeModule { }
