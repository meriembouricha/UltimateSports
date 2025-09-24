import { AccountService } from '../account/account.service';
import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/core/services/Complaints-Services/complaint.service';
import { Complaint } from 'src/app/shared/models/complaint';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  objet: string = '';
  description: string = '';
  autreObjet: string = '';
  complaint: Complaint = new Complaint();
  user!: User | null;
  complaints: Complaint[] = []; 

  // Propriétés pour l'état de chargement et les messages de feedback
  loading: boolean = false; // Indique si le formulaire est en cours de soumission
  successMessage: string = ''; // Message de succès après soumission
  errorMessage: string = ''; // Message d'erreur en cas de problème

  constructor(
    private complaintService: ComplaintService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.getCurrentUser();
    console.log('User:', this.user);

    if (this.user) {
      this.user.id = this.accountService.getUserIdFromToken() ?? 0;
    }
  }

  // Méthode pour vérifier si l'option "Autre" est sélectionnée
  checkOtherOption() {
    if (this.objet !== 'autre') {
      this.autreObjet = ''; // Réinitialiser le champ "autreObjet" si l'option "Autre" n'est pas sélectionnée
    }
  }

  // Méthode pour soumettre le formulaire
  submitForm(): void {
    // Réinitialiser les messages de feedback
    this.successMessage = '';
    this.errorMessage = '';

    // Valider les champs obligatoires
    if (!this.objet || !this.description) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Activer l'état de chargement
    this.loading = true;

    // Préparer l'objet Complaint
    this.complaint.descComplaint = this.description;
    this.complaint.user = this.user;
    this.complaint.titleComplaint = this.objet === 'autre' ? this.autreObjet : this.objet;

    // Appeler le service pour ajouter la réclamation
    this.complaintService.addComplaint(this.complaint).subscribe(
      (response) => {
        console.log('Complaint added successfully:', response);
        this.successMessage = 'Votre réclamation a été envoyée avec succès !';
        this.resetForm(); // Réinitialiser le formulaire après succès
      },
      (error) => {
        console.error('Failed to add complaint:', error);
        this.errorMessage = 'Une erreur est survenue lors de l\'envoi de votre réclamation. Veuillez réessayer.';
      }
    ).add(() => {
      this.loading = false; // Désactiver l'état de chargement après la soumission
    });
  }

  // Méthode pour réinitialiser le formulaire
  resetForm(): void {
    this.objet = '';
    this.description = '';
    this.autreObjet = '';
    this.complaint = new Complaint(); // Réinitialiser l'objet Complaint
  }
}