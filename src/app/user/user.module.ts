import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app-material.module';
import { SharedComponentsModule } from '../shared-components.module';
import { UserMaterialModule } from './user-material.module';
import { UserRoutingModule } from './user-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    UserMaterialModule,
    UserRoutingModule
  ]
})
export class UserModule { }
