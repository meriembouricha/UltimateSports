// stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
// import { ProductResponse } from 'src/app/shared/models/product-response.model'; // or your actual model

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getAllVariants(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  addStock(productId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${productId}/increment?amount=${quantity}`, {});
  }

  reduceStock(productId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${productId}/decrement?amount=${quantity}`, {});
  }
}
