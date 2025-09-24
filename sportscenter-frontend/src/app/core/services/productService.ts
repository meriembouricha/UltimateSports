import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `http://localhost:8080/api/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(page: number): Observable<{ content: Product[], totalPages: number }> {
    const url = `${this.apiUrl}?page=${page}`; // Add pagination parameters
    return this.http.get<{ content: Product[], totalPages: number }>(url);
  }


  // Recursive function to fetch all pages
  private fetchAllPages(page: number, accumulatedProducts: Product[]): Observable<Product[]> {
    const url = `${this.apiUrl}?page=${page}`; // Add pagination parameters
    return this.http.get<{ content: Product[], totalPages: number }>(url).pipe(
      tap(response => console.log('Fetched page:', page, 'Response:', response)), // Log the response
      switchMap(response => {
        const allProducts = [...accumulatedProducts, ...response.content]; // Accumulate products
        if (page < response.totalPages - 1) {
          // If there are more pages, recursively fetch the next page
          return this.fetchAllPages(page + 1, allProducts);
        } else {
          // If all pages are fetched, return the accumulated products
          return of(allProducts);
        }
      }),
      tap((products) => {
        this.productsSubject.next(products); // Update the BehaviorSubject
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

// product.service.ts
updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${updatedProduct.id}`, updatedProduct);
  }
  
  

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

 

}