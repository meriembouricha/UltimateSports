import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  constructor(private router: Router) {}

  goToStore() {
    this.router.navigate(['/store']); // 👈 Back to store or homepage
  }
}
