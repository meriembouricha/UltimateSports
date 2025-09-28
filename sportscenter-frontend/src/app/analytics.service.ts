import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlySalesDTO, DailySalesDTO } from './shared/models/analytics';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private baseUrl = `${environment.apiUrl}/api/analytics`;

  constructor(private http: HttpClient) {}

  getDailySales(year: number, month: number): Observable<DailySalesDTO[]> {
    return this.http.get<DailySalesDTO[]>(`${this.baseUrl}/sales/daily-complete`, {
      params: { year, month }
    });
  }

  getMonthlySales(year: number): Observable<MonthlySalesDTO[]> {
    return this.http.get<MonthlySalesDTO[]>(`${this.baseUrl}/sales/monthly`, {
      params: { year }
    });
  }

  getBestSellingProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/best-products`);
  }

  getTopBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/top-brands`);
  }

  getPopularCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/popular-categories`);
  }
}
