import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  template: `
  <mat-toolbar color="accent">
    <a mat-button routerLink="/inventory/dashboard" routerLinkActive="active-link">Inventory Dashboard</a>
    <a mat-button routerLink="/inventory/stockentry" routerLinkActive="active-link">Stock Entry</a>
    <a mat-button routerLink="/inventory/products" routerLinkActive="active-link">Products</a>
    <a mat-button routerLink="/inventory/categories" routerLinkActive="active-link">Categories</a>
  </mat-toolbar>
  <router-outlet></router-outlet>
`,
  styles: []
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
