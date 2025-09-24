import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];              // All users from backend
  filteredUsers: User[] = [];      // After search filter
  paginatedUsers: User[] = [];     // After pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  searchTerm: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filterUsers(); // Apply initial filter & pagination
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(term)
    );
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
        this.filterUsers(); // Refresh filter and pagination
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }
  activateUser(id: number): void {
  this.userService.activateUser(id).subscribe(
    (updatedUser) => {
      // mettre à jour la liste locale
      this.users = this.users.map(user =>
        user.id === id ? updatedUser : user
      );
      this.filterUsers();
    },
    (error) => {
      console.error("Erreur lors de l'activation de l'utilisateur", error);
    }
  );
}

deactivateUser(id: number): void {
  this.userService.deactivateUser(id).subscribe(
    (updatedUser) => {
      // mettre à jour la liste locale
      this.users = this.users.map(user =>
        user.id === id ? updatedUser : user
      );
      this.filterUsers();
    },
    (error) => {
      console.error("Erreur lors de la désactivation de l'utilisateur", error);
    }
  );
}

}
