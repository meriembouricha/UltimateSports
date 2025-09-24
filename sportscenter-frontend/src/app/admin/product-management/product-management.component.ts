import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/productService';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  currentPage = 0;
  totalPages = 1;

  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    pictureUrl: '',
    productType: '',
    productBrand: '',
    productQuantity: 0
  };
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage); // Load the first page
  }

  loadPage(page: number): void {
    this.productService.getProducts(page).subscribe((response) => {
      this.products = response.content; // Update the products array
      this.totalPages = response.totalPages; // Update the total number of pages
      this.currentPage = page; // Update the current page
    });
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadPage(this.currentPage + 1); // Load the next page
    }
  }

  loadPreviousPage(): void {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1); // Load the previous page
    }
  }

  createProduct(): void {
    if (this.newProduct.name && this.newProduct.price) {
      const newProductWithId: Product = {
        ...this.newProduct,
        id: Date.now(), // Temporary ID (backend should generate this)
      };
      this.productService.addProduct(newProductWithId).subscribe(
        (product) => {
          this.products.push(product); // Add the new product to the list
          this.newProduct = { // Reset the form
            id: 0,
            name: '',
            description: '',
            price: 0,
            pictureUrl: '',
            productType: '',
            productBrand: '',
            productQuantity: 0
          };
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit', error);
        }
      );
    }
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct)
      .subscribe((data: Product) => {
        const index = this.products.findIndex(product => product.id === data.id);
        this.products[index] = data;
        this.selectedProduct = null;
      });
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id); // Remove the product from the list
    });
  }

  selectProduct(product: Product): void {
    this.selectedProduct = { ...product }; // Create a copy of the selected product
  }

  cancelEdit(): void {
    this.selectedProduct = null; // Cancel editing
  }
}
