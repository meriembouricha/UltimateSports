import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface QuestionRequest {
  question: string;
}

interface AnswerResponse {
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = `${environment.chatbotUrl}/ask`; // URL FastAPI

  constructor(private http: HttpClient) { }

  askQuestion(question: string): Observable<AnswerResponse> {
    const payload: QuestionRequest = { question };
    return this.http.post<AnswerResponse>(this.apiUrl, payload);
  }
}
