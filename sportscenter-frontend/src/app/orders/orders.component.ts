import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { OrderService } from '../core/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-orders', // correspond à orders.component.html
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  currentUserId!: number;
  orders: Order[] = [];
  paginatedOrders: Order[] = [];
  expandedOrderId: number | null = null;

  currentPage = 0;
  pageSize = 5;
  totalPages = 1;
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserId = user.id;
        this.loadUserOrders();
      } else {
        this.orders = [];
        this.paginatedOrders = [];
        this.isLoading = false;
      }
    });
  }

  loadUserOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        // Filtrer uniquement les commandes de l'utilisateur connecté
        this.orders = orders
          .filter(order => order.userId === this.currentUserId)
          .map(order => ({ ...order, isLoading: false }));

        this.totalPages = Math.ceil(this.orders.length / this.pageSize);
        this.updatePaginatedOrders();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
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
}
