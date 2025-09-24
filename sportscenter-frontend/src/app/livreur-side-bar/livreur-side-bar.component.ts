import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-livreur-side-bar',
  templateUrl: './livreur-side-bar.component.html',
  styleUrls: ['./livreur-side-bar.component.scss']
})
export class LivreurSideBarComponent  implements OnInit {
  currentUser$?: Observable<User | null>;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}