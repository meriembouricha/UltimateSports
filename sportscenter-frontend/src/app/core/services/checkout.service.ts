import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:8080/api/checkout/session';

  constructor(private http: HttpClient) {}

  createCheckoutSession(): Observable<string> {
    const token = localStorage.getItem('token'); // 👈 Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // 👈 Add the Authorization header
    });

    return this.http.post(this.apiUrl, {}, { headers: headers, responseType: 'text' });
  }
}
