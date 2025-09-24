import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';  // L'URL de l'API pour récupérer les utilisateurs

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);  // Appel API pour récupérer la liste des utilisateurs
  }


   deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

// Désactiver un utilisateur
  deactivateUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/deactivate/${id}`, {});
  }

  // Activer un utilisateur
  activateUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/activate/${id}`, {});
  }
}
