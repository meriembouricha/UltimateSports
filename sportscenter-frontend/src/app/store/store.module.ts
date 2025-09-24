import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StoreRoutingModule } from './store-routing.module';
import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';



@NgModule({
  declarations: [
    StoreComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    RecommendedProductsComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
