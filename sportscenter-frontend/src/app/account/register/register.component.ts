import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message: string | null = null;
  success: boolean = false;
  loading: boolean = false;

  showPassword: boolean = false;         // Toggle password
  showConfirmPassword: boolean = false;  // Toggle confirm password

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['', 
        [Validators.required, Validators.minLength(3)],
        [this.usernameExistsValidator()]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator }); // Validator pour vérifier password == confirmPassword
  }

  ngOnInit(): void {}

  // Toggle show/hide password
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Validator personnalisé pour vérifier que password et confirmPassword correspondent
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Async validator pour vérifier le nom d'utilisateur
  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ usernameTaken: boolean } | null> => {
      if (!control.value) return of(null);
      return of(control.value).pipe(
        debounceTime(500),
        switchMap(username => this.accountService.checkUsernameExists(username)),
        map(exists => (exists ? { usernameTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.message = null;
  
      const { username, email, password } = this.registerForm.value;
  
      this.accountService.register(username, email, password).subscribe(
        (response) => {
          this.loading = false;
          this.success = true;
          this.toastr.success('Registration successful!', 'Success');
  
          const redirect = this.accountService.redirectUrl || '/login';
          this.accountService.redirectUrl = null; 
  
          setTimeout(() => {
            this.router.navigateByUrl(redirect);
          }, 2000);
        },
        (error) => {
          this.loading = false;
          this.success = false;
  
          if (error.status === 400) {
            this.message = 'Invalid data, please check your input.';
          } else if (error.status === 500) {
            this.message = 'Server error, please try again later.';
          } else {
            this.message = error.message || 'Registration failed, please try again.';
          }
  
          this.toastr.error(this.message || 'An error occurred.', 'Error');
        }
      );
    } else {
      this.message = 'Please fill all fields correctly.';
      this.success = false;
      this.toastr.warning(this.message, 'Warning');
    }
  }
}
