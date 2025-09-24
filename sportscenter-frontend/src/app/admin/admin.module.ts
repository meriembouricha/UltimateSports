import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../core/core.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ComplaintManagementComponent } from './complaint-management/complaint-management.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { AdminSidebarComponent } from '../core/admin-sidebar/admin-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ResponseComplaintComponent } from './response-complaint/response-complaint.component';
import { MonthlySalesChartComponent } from '../monthly-sales-chart/monthly-sales-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { DailySalesChartComponent } from '../daily-sales-chart/daily-sales-chart.component';
import { BestProductsChartComponent } from '../best-products-chart/best-products-chart.component';
import { PopularCategoriesChartComponent } from '../popular-categories-chart/popular-categories-chart.component';
import { AdminStatsComponent } from '../admin-stats/admin-stats.component';
import { TopBrandsChartComponent } from '../top-brands-chart/top-brands-chart.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSidebarComponent,
    UserManagementComponent,
    ProductManagementComponent,
    ComplaintManagementComponent,
    StockManagementComponent,
    ResponseComplaintComponent,
    UpdateProductComponent,
    MonthlySalesChartComponent,
    DailySalesChartComponent,
    BestProductsChartComponent,
    PopularCategoriesChartComponent,
    TopBrandsChartComponent,
    AdminStatsComponent,
      // DailySalesChartComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports: [
    AdminComponent,
    AdminSidebarComponent
  ]
})
export class AdminModule { }
