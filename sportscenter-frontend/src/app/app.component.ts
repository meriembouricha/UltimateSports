import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { Observable } from 'rxjs';
import { User } from './shared/models/user';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Sports Center';
  currentUser$!: Observable<User | null>;
  currentUtilisateur!: User | null;
  isAdminRoute = false;
  isRouteAdmin: boolean = false;
  isRouteLivreur: boolean = false;

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    // Charger l'utilisateur et le panier
    this.accountService.loadUser().subscribe();
    this.loadBasket();
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUtilisateur = this.accountService.getCurrentUser();

    this.currentUser$.subscribe(user => {
      this.isRouteAdmin = user?.role === 'ROLE_ADMIN';
      console.log(this.isRouteAdmin);
      this.isRouteLivreur = user?.role === 'ROLE_LIVREUR';
    });

    // Vérifier si la route est une route admin pour cacher la nav-bar et section-header
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isAdminRoute = event.url.includes('/admin');
      });
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }
}
