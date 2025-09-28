import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = `${environment.apiUrl}/api/checkout/session`;

  constructor(private http: HttpClient) {}

  createCheckoutSession(): Observable<string> {
    const token = localStorage.getItem('token'); // 👈 Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // 👈 Add the Authorization header
    });

    return this.http.post(this.apiUrl, {}, { headers: headers, responseType: 'text' });
  }
}
