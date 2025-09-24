import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/core/services/order.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  paginatedOrders: Order[] = [];
  expandedOrderId: number | null = null;
  userId?: number;

  // Pagination
  currentPage = 0;
  pageSize = 5;
  totalPages = 1;

  // Loading
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.loadOrders();
      } else {
        this.orders = [];
        this.paginatedOrders = [];
        this.isLoading = false;
      }
    });
  }

  loadOrders(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        // Filtrer uniquement les commandes de l'utilisateur connecté
        this.orders = orders.filter(order => order.userId === this.userId);
        this.isLoading = false;
        console.log("Commandes de l'utilisateur :", this.orders);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
        this.isLoading = false;
      }
    });
  }

  updatePaginatedOrders(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedOrders = this.orders.slice(start, end);
  }

  loadPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  toggleExpand(orderId: number): void {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj).filter(k => k !== 'id' && k !== 'status' && k !== 'userId');
  }

  getOrderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
}

}
