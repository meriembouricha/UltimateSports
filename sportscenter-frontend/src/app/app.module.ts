import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintComponent } from './complaint/complaint.component';
import { MyComplaintsComponent } from './my-complaints/my-complaints.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { MonthlySalesChartComponent } from './monthly-sales-chart/monthly-sales-chart.component';
import { NgChartsModule } from 'ng2-charts';
// import { DailySalesChartComponent } from './daily-sales-chart/daily-sales-chart.component';
// import { BestProductsChartComponent } from './best-products-chart/best-products-chart.component';
import { TopBrandsChartComponent } from './top-brands-chart/top-brands-chart.component';
import { LivreurOrderDashboardComponent } from './livreur-order-dashboard/livreur-order-dashboard.component';
import { LivreurSideBarComponent } from './livreur-side-bar/livreur-side-bar.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { FaqComponent } from './faq/faq.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PowerBiEmbeddedComponent } from './power-bi-embedded/power-bi-embedded.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ComplaintComponent,
    MyComplaintsComponent,
    SuccessComponent,
    CancelComponent,
    OrderDashboardComponent,
    LivreurOrderDashboardComponent,
    LivreurSideBarComponent,
    NotAuthorizedComponent,
    FaqComponent,
    AboutusComponent,
    PowerBiEmbeddedComponent,
    ProfileComponent,
    OrdersComponent,
    ChatbotComponent, 
    ChatbotComponent,
    LivreurSideBarComponent,
    ChatbotComponent,
    MyOrdersComponent
    // DailySalesChartComponent,
    // BestProductsChartComponent,
    // TopBrandsChartComponent,
    // Supprime AdminComponent de cette liste
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    HomeModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
