import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  forgotForm: FormGroup;
  forgotMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private formsBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.loginForm = this.formsBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.forgotForm = this.formsBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

onSubmit() {
  if (this.loginForm.invalid) return;

  this.accountService.login(this.loginForm.value).subscribe({
    next: (user) => this.toastService.success('Connexion réussie'),
    error: (err) => this.toastService.error(err.message)
  });
}


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  openForgotModal() {
  const modalEl = document.getElementById('forgotModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

  submitForgotPassword() {
  if (this.forgotForm.invalid) return;

  const email = this.forgotForm.value.email;

  this.accountService.forgotPassword(email).subscribe({
    next: (res: any) => {
      // Le backend renvoie un message type { message: "..." }
      this.forgotMessage = res.message;
      this.forgotForm.reset();
    },
    error: (err) => {
      // Si l'email n'existe pas ou autre erreur
      this.forgotMessage = err.error?.message || 'Une erreur est survenue, veuillez réessayer';
    }
  });
}

}
