import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosComponent } from './pos.component';

const routes: Routes = [
  {
    path: '', component: PosComponent, children: [
      { path: '', redirectTo: '/pos', pathMatch: 'full' },
      { path: 'pos', component: PosComponent },
      { path: '**', redirectTo: '/pos' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
