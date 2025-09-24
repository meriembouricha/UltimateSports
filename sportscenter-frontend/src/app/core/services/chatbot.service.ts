import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://127.0.0.1:8000/ask'; // URL FastAPI

  constructor(private http: HttpClient) { }

  askQuestion(question: string): Observable<AnswerResponse> {
    const payload: QuestionRequest = { question };
    return this.http.post<AnswerResponse>(this.apiUrl, payload);
  }
}
