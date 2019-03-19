import { NgModule } from '@angular/core';
import {
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ]
})
export class ManagerMaterialModule { }
