import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';



@NgModule({
  declarations: [ 
    NavBarComponent,
    NotFoundComponent, 
    ServerErrorComponent, 
    SectionHeaderComponent, 
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true
    }), 
    BreadcrumbModule
  ],
  exports: [
    NavBarComponent,
    NotFoundComponent, 
    ServerErrorComponent, 
    SectionHeaderComponent, 
    AdminNavbarComponent
  ]
})
export class CoreModule { }
