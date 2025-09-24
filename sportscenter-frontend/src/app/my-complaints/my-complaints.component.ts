import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../core/services/Complaints-Services/complaint.service';
import { Complaint } from 'src/app/shared/models/complaint';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-complaints',
  templateUrl: './my-complaints.component.html',
  styleUrls: ['./my-complaints.component.scss']
})
export class MyComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];
  currentUser$?: Observable<User | null>;  
  userId: number = 0;

  constructor(
    private complaintService: ComplaintService, 
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;  
    const token = this.accountService.getToken();
    console.log('Token récupéré:', token);
  
    this.userId = this.accountService.getUserIdFromToken() ?? 0;  
    console.log('User ID extrait du token:', this.userId); 
  
    this.fetchMyComplaints();
  }

  // Méthode pour extraire le texte de réponse du JSON
  getResponseText(response: any): string {
    if (!response || !response.descResponse) {
      return 'No response available';
    }

    try {
      // Si descResponse est un string JSON, on le parse
      if (typeof response.descResponse === 'string') {
        const parsed = JSON.parse(response.descResponse);
        // Retourner directement la valeur de responseText ou descResponse
        return parsed.responseText || parsed.descResponse || 'Response content not available';
      }
      
      // Si c'est déjà un objet, retourner directement responseText
      return response.descResponse.responseText || response.descResponse || 'Response content not available';
    } catch (e) {
      // Si ce n'est pas du JSON valide, retourner le texte brut
      console.warn('Error parsing response JSON:', e);
      return response.descResponse;
    }
  }

  // Récupérer les réclamations de l'utilisateur
  fetchMyComplaints(): void {
    this.complaintService.getMyComplaints(this.userId).subscribe(
      (complaints) => {
        this.complaints = complaints;
        // Debug: afficher la structure des réponses pour vérification
        complaints.forEach(complaint => {
          if (complaint.response) {
            console.log('Response structure:', complaint.response);
          }
        });
      },
      (error) => {
        console.error('Erreur de récupération des réclamations:', error);
      }
    );
  }

  // Supprimer une réclamation
  deleteComplaint(id: number): void {
    this.complaintService.deleteComplaint(id).subscribe(
      () => this.fetchMyComplaints(),
      (error) => console.error('Erreur de suppression:', error)
    );
  }
}