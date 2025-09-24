import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/productService';
import { StockService } from 'src/app/core/services/stock.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss']
})
export class StockManagementComponent implements OnInit {
  products: Product[] = [];
  currentPage = 0;
  totalPages = 1;

  constructor(private productService: ProductService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.productService.getProducts(page).subscribe((response) => {
      this.products = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = page;
    });
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadPage(this.currentPage + 1);
    }
  }

  loadPreviousPage(): void {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }

  incrementStock(productId: number, quantity: number): void {
  if (quantity <= 0) return; // sécurité
  this.stockService.addStock(productId, quantity).subscribe(() => {
    this.loadPage(this.currentPage); // Refresh après update
  });
}

decrementStock(productId: number, quantity: number): void {
  if (quantity > 0) {
    this.stockService.reduceStock(productId, quantity).subscribe(() => {
      this.loadPage(this.currentPage); // Refresh après update
    });
  }
}

  
}
