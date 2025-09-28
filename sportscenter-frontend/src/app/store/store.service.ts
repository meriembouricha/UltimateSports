import { Brand } from './../shared/models/brand';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductData } from '../shared/models/productData';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { environment } from 'src/environments/environment';

export interface ProductViewRequest {
  user: { id: number};
  product: { id: number};
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  
  public apiUrl = `${environment.apiUrl}/api/products`;
  public viewUrl = `${environment.apiUrl}/api/product-views`;

  getProducts(brandId?: number, typeId?: number, url?: string): Observable<ProductData> {
    const apiUrl = url || this.apiUrl;
    return this.http.get<ProductData>(apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getBrands(): Observable<Brand[]> {
    const url = `${this.apiUrl}/brands`;
    return this.http.get<Brand[]>(url);
  }

  getTypes(): Observable<Brand[]> {
    const url = `${this.apiUrl}/types`;
    return this.http.get<Brand[]>(url);
  }

  postUserProductView(viewData: ProductViewRequest) {
    return this.http.post(this.viewUrl, viewData);
  }

 getRecommendedProducts(userId: number): Observable<Product[]> {
  const url = `${environment.apiUrl}/api/recommendations/${userId}`;
  return this.http.get<Product[]>(url);
}

  // ⚡ Ajout de la méthode pour les produits en avant
  getFeaturedProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/featured`;
    return this.http.get<Product[]>(url);
  }
}
