import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material.module';
import { ManagerMaterialModule } from './manager-material.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedComponentsModule } from '../shared-components.module';


import { ManagerComponent } from './manager.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagementComponent } from './user-management/user-management.component';

import { AuthService } from '../auth/auth.service';
import { UserTableComponent } from './user-table/user-table.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { UserResolve } from '../user/user/user.resolve';
import { UserService } from '../user/user/user.service';

@NgModule({
  declarations: [
    ManagerComponent,
    ManagerHomeComponent,
    ReceiptLookupComponent,
    UserManagementComponent,
    UserTableComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ManagerMaterialModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserResolve,
    UserService
  ]
})
export class ManagerModule { }
