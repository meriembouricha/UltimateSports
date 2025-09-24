import { Component, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { StoreService } from 'src/app/store/store.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';
import { Brand } from 'src/app/shared/models/brand';
import { Type } from 'src/app/shared/models/type';
import { Product } from 'src/app/shared/models/product';

declare var bootstrap: any; // pour utiliser les modals Bootstrap

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  megaMenuOpen = false;
  currentUser$?: Observable<User | null>;
  isLoggedIn = false;
  isStoreRoute = false;
    userMenuOpen = false;
    showToast = false; // <-

  brands: Brand[] = [];
  types: Type[] = [];
  featuredProducts: Product[] = [];

  constructor(
    public basketService: BasketService,
    public accountService: AccountService,
    private router: Router,
    private storeService: StoreService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isStoreRoute = event.urlAfterRedirects.startsWith('/store');
      });
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isLoggedIn = !!localStorage.getItem('token');

    this.loadBrands();
    this.loadTypes();
    this.loadFeaturedProducts();
  }

  loadBrands() {
    this.storeService.getBrands().subscribe({
      next: (res) => (this.brands = res),
      error: (err) => console.error(err),
    });
  }

  loadTypes() {
    this.storeService.getTypes().subscribe({
      next: (res) => (this.types = res),
      error: (err) => console.error(err),
    });
  }

  loadFeaturedProducts() {
    this.storeService.getFeaturedProducts().subscribe({
      next: (res) => (this.featuredProducts = res),
      error: (err) => console.error(err),
    });
  }

  getItemsCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }


logout() {
  // Supprime la session/token
  this.accountService.logout(); 
  this.isLoggedIn = false;

  // Afficher le toast
  this.showToast = true;

  // Masquer le toast après 2 secondes
  setTimeout(() => {
    this.showToast = false;
  }, 5000);


}


  confirmLogout() {
    this.logout();
  }

  openMegaMenu() {
    this.megaMenuOpen = true;
  }

  closeMegaMenu() {
    this.megaMenuOpen = false;
  }

  goToBrand(brandId: number) {
    this.router.navigate(['/store'], { queryParams: { brand: brandId } });
    this.closeMegaMenu();
  }

  goToType(typeId: number) {
    this.router.navigate(['/store'], { queryParams: { type: typeId } });
    this.closeMegaMenu();
  }
}
