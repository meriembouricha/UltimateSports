import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/shared/models/feedback';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/api/feedbacks`;

  constructor(private http: HttpClient) {}

  getFeedbacksByProductId(productId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/product/${productId}`);
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }
}