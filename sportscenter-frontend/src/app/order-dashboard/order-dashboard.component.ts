import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {
  orders: Order[] = [];
  paginatedOrders: Order[] = [];
  expandedOrderId: number | null = null;

  currentPage = 0;
  pageSize = 5;
  totalPages = 1;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.totalPages = Math.ceil(this.orders.length / this.pageSize);
        this.updatePaginatedOrders();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'status status-pending';
      case 'IN_TRANSIT':
        return 'status status-in-transit';
      case 'DELIVERED':
        return 'status status-delivered';
      case 'CANCELLED':
        return 'status status-cancelled';
      default:
        return 'status';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'IN_TRANSIT':
        return 'En cours';
      case 'DELIVERED':
        return 'Livré';
      case 'CANCELLED':
        return 'Annulé';
      default:
        return status;
    }
  }

}
