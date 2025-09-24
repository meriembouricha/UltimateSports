import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from 'src/app/core/services/Complaints-Services/response.service';

@Component({
  selector: 'app-response-complaint',
  templateUrl: './response-complaint.component.html',
  styleUrls: ['./response-complaint.component.scss']
})
export class ResponseComplaintComponent implements OnInit {
  responseText: string = '';
  complaintId?: number;
  isLoading: boolean = false;
  existingResponse: any = null; // Juste pour stocker la réponse existante

  constructor(
    private responseService: ResponseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.complaintId = +params['complaintId'];
    });
  }

  submitResponse(): void {
    if (!this.responseText.trim()) {
      alert('⚠️ Veuillez saisir une réponse avant d\'envoyer.');
      return;
    }
    
    if (!this.complaintId) {
      alert('⚠️ Identifiant de la réclamation manquant.');
      return;
    }

    this.isLoading = true;

    this.responseService.respondToComplaint(this.complaintId, this.responseText).subscribe(
      (response) => {
        console.log('✅ Réponse envoyée avec succès:', response);
        this.responseText = '';
        this.isLoading = false;
        this.existingResponse = response; // Stocker la réponse
        alert('✅ Votre réponse a été envoyée avec succès !');
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  getResponseText(response: any): string {
    if (!response || !response.descResponse) return '';

    try {
      if (typeof response.descResponse === 'string') {
        const parsed = JSON.parse(response.descResponse);
        return parsed.responseText || parsed.descResponse || '';
      }
      return response.descResponse.responseText || response.descResponse || '';
    } catch (e) {
      return response.descResponse;
    }
  }
}