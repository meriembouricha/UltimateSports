import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  username!: string;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // 🔹 Récupérer le user connecté depuis AccountService
    this.accountService.currentUser$.subscribe((user: User | null) => {
      if (!user) {
        alert('Utilisateur non connecté !');
        return;
      }

      this.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);


      // Formulaire profil (readonly)
      this.profileForm = this.fb.group({
        username: [{ value: this.username, disabled: true }]
      });
    });

    // Formulaire mot de passe
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  onChangePassword(): void {
  if (this.passwordForm.invalid) return;

  const { oldPassword, newPassword, confirmNewPassword } = this.passwordForm.value;

  if (newPassword !== confirmNewPassword) {
    this.toastr.error('Les nouveaux mots de passe ne correspondent pas.');
    return;
  }

  const payload = {
    username: this.username,
    oldPassword,
    newPassword
  };

  this.accountService.changePassword(payload).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message);
      this.passwordForm.reset();
    },
    error: (err) => {
      this.toastr.error(err.error.message || 'Erreur lors du changement de mot de passe');
    }
  });
}

}
