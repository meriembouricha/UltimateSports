import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../shared/models/JwtPayload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser(): User | null {
    return this.currentUserSource.getValue();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
 forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/forgot?email=${email}`, {});
  }
  loadUser(): Observable<User | null> {
    const token = this.getToken();
    if (!token) return this.currentUser$;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<User>(`${this.apiUrl}/user`, { headers }).pipe(
      map((user) => {
        try {
          const decoded: JwtPayload = jwtDecode(token);
          const userWithId: User = {
            ...user,
            id: decoded.id,
            token: token,
            role: decoded.roles ? decoded.roles[0] : '',
          };
          this.currentUserSource.next(userWithId);
          return userWithId;
        } catch (err) {
          console.error('Failed to decode token in loadUser():', err);
          return null;
        }
      }),
      catchError((err) => {
        console.error('Failed to load user from API:', err);
        return of(null);
      })
    );
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload: JwtPayload = jwtDecode(token);
      return payload.id || null;
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  login(values: any): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, values).pipe(
      map((response) => {
        const token = response.token;
        localStorage.setItem('token', token);

        const decoded: JwtPayload = jwtDecode(token);
        const user: User = {
          username: response.username,
          token,
          role: response.role,
          id: decoded.id,
          email: '',
          enabled: true
        };

        this.currentUserSource.next(user);

        // Redirection en fonction du rôle
        if (user.role === 'ROLE_ADMIN') this.router.navigateByUrl('/admin/stats');
        else if (user.role === 'ROLE_LIVREUR') this.router.navigateByUrl('/livreur');
        else this.router.navigateByUrl('/store');

        return user;
      }),
      catchError((error) => {
        let msg = 'Incorrect username or password';
        if (error.status === 404 || error.error?.includes('Utilisateur non trouvé')) msg = 'Utilisateur introuvable';
        else if (error.status === 400) msg = 'Mot de passe incorrect';
        return throwError(() => new Error(msg));
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de l\'inscription:', error);
          return throwError(() => new Error(error.error?.message || 'Erreur lors de l\'inscription.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  getRoles(): string[] {
  const token = this.getToken();
  if (!token) return [];

  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return Array.isArray(tokenPayload.roles) ? tokenPayload.roles : [tokenPayload.roles];
  } catch (error) {
    console.error('Erreur lors de l\'analyse du token JWT:', error);
    return [];
  }
}


  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<{ exists: boolean }>(`${this.apiUrl}/check-email?email=${email}`)
      .pipe(
        map(res => res.exists),
        catchError(err => {
          console.error('Erreur lors de la vérification de l\'email', err);
          return of(false);
        })
      );
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http
      .get<{ exists: boolean }>(`${environment.apiUrl}/api/users/check-username?username=${username}`)
      .pipe(map(res => res.exists));
  }

  changePassword(payload: { username: string, oldPassword: string, newPassword: string }): Observable<any> {
  return this.http.post(`${environment.apiUrl}/auth/profile/change-password`, payload);
}

}
