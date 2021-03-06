import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserResolve } from '../user/user/user.resolve';
import { UserTableComponent } from './user-table/user-table.component';
import { ViewUserComponent } from '../user/view-user/view-user.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { Role } from '../auth/role.enum';

const routes: Routes = [
  {
    path: '', component: ManagerComponent, children: [
      { path: '', redirectTo: '/manager/home', pathMatch: 'full' },
      { path: 'home', component: ManagerHomeComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Manager }, },
      {
        path: 'users', component: UserManagementComponent, children: [
          { path: '', component: UserTableComponent, outlet: 'master' },
          { path: 'user', component: ViewUserComponent, outlet: 'detail', resolve: { user: UserResolve } }
        ],
        canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: { expectedRole: Role.None }
      },
      { path: 'receipts', component: ReceiptLookupComponent, canActivate: [AuthGuard], data: { expectedRole: Role.Manager } },
      { path: '**', redirectTo: '/manager/home' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {}
