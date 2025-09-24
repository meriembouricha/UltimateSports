import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/response'; // Assurez-vous que le chemin vers Response est correct

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private baseUrl = 'http://localhost:8080'; // Base URL de votre API

  constructor(private http: HttpClient) { }
  
  // Méthode pour répondre à une réclamation
  respondToComplaint(complaintId: number, responseText: string): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/response/${complaintId}`, { responseText });
  }

  // Méthode pour récupérer les réponses d'une réclamation
  getResponsesForComplaint(complaintId: number): Observable<Response[]> {
    return this.http.get<Response[]>(`${this.baseUrl}/responses/${complaintId}`);
  }

  
}
