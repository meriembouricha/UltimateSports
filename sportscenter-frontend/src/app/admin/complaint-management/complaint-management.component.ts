import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintService } from 'src/app/core/services/Complaints-Services/complaint.service';
import { Complaint } from 'src/app/shared/models/complaint';

@Component({
  selector: 'app-complaint-management',
  templateUrl: './complaint-management.component.html',
  styleUrls: ['./complaint-management.component.scss']
})
export class ComplaintManagementComponent implements OnInit {
  complaints!: Complaint[];

  constructor(private complaintService: ComplaintService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getAdminComplaints();
  }


  getAdminComplaints() {
    this.complaintService.getAdminComplaints().subscribe(
      (complaints: Complaint[]) => {
        this.complaints = complaints;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  redirectToResponseComponent(complaintId: number): void {
    // Redirection vers la route 'response/:id' où 'id' est l'ID de la réclamation
    this.router.navigate(['/response', complaintId]);
  }

  deleteComplaint(id: number): void {
    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintService.deleteComplaint(id)
        .subscribe(() => {
          this.complaints = this.complaints.filter(complaint  => complaint.idComplaint !== id);
        });
    }
  }


}
