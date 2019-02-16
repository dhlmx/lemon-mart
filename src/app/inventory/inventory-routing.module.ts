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
      { path: 'categories', component: CategoriesComponent },
      { path: 'dashboard', component: InventoryDashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'stockentry', component: StockEntryComponent },
      { path: 'stock-entry', component: StockEntryComponent },
      { path: '**', redirectTo: '/inventory/dashboard' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
