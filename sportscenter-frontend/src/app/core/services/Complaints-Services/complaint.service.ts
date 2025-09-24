import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Complaint } from 'src/app/shared/models/complaint';
import { ComplaintResponse } from 'src/app/shared/models/complaintResponse';
import { switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private baseUrl = 'http://localhost:8080'; // URL de base de l'API

  constructor(private http: HttpClient) { }

  // Ajouter une réclamation
  addComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/addComplaint`, complaint);
  }

  // Récupérer toutes les réclamations pour l'administration avec leur réponse unique
  getAdminComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/complaints`).pipe(
      switchMap(complaints => {
        const observables = complaints.map(complaint =>
          this.getResponseForComplaint(complaint.idComplaint).pipe(
            map(response => {
              complaint.response = response; // Assigner la réponse unique à la réclamation
              complaint.status = !!response; // Statut = vrai si une réponse existe
              return complaint;
            })
          )
        );
        return forkJoin(observables);
      })
    );
  }

  // Supprimer une réclamation
  deleteComplaint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteComplaint/${id}`);
  }

  // Récupérer les réclamations d'un utilisateur avec leur réponse unique
  getMyComplaints(userId: number): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/mycomplaints/${userId}`).pipe(
      switchMap(complaints => {
        const observables = complaints.map(complaint =>
          this.getResponseForComplaint(complaint.idComplaint).pipe(
            map(response => {
              complaint.response = response;
              complaint.status = !!response;
              return complaint;
            })
          )
        );
        return forkJoin(observables);
      })
    );
  }

  // Récupérer **une seule réponse** pour une réclamation spécifique
  getResponseForComplaint(complaintId: number): Observable<ComplaintResponse | null> {
    return this.http.get<ComplaintResponse>(`${this.baseUrl}/responses/${complaintId}`);
  }
}
