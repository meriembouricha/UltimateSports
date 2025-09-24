import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../core/services/productService';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  randomProducts: Product[] = [];
  private subscription?: Subscription;
  readonly productsToShow = 20; // facilement configurable

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadRandomProducts();
  }

  ngOnDestroy(): void {
    // On évite les memory leaks
    this.subscription?.unsubscribe();
  }

  private loadRandomProducts(): void {
    this.subscription = this.productService.products$.subscribe(products => {
      if (products && products.length > 0) {
        // Prend des produits aléatoires depuis le BehaviorSubject
        this.randomProducts = this.getRandomProducts(products, this.productsToShow);
      } else {
        // Si BehaviorSubject vide, on appelle directement l’API
        this.productService.getProducts(0).subscribe({
          next: (res) => {
            const allProducts = res.content ?? [];
            this.randomProducts = this.getRandomProducts(allProducts, this.productsToShow);
          },
          error: (err) => {
            console.error('Erreur lors du chargement des produits', err);
            this.randomProducts = [];
          }
        });
      }
    });
  }

  private getRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
