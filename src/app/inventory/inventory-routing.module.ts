import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { InventoryComponent } from './inventory.component';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { ProductsComponent } from './products/products.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';

const routes: Routes = [
  {
    path: '', component: InventoryComponent, children: [
      { path: '', redirectTo: '/inventory/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: InventoryDashboardComponent },
      { path: 'stockEntry', component: StockEntryComponent },
      { path: 'stockentry', component: StockEntryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
