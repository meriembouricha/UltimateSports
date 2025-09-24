import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-livreur-order-dashboard',
  templateUrl: './livreur-order-dashboard.component.html',
  styleUrls: ['./livreur-order-dashboard.component.scss']
})
export class LivreurOrderDashboardComponent implements OnInit {
  orders: Order[] = [];
  paginatedOrders: Order[] = [];
  expandedOrderId: number | null = null;
toastr: any;
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
        console.log('Commandes récupérées :', orders);
        this.orders = orders.map(order => ({
          ...order,
          isLoading: false
        }));
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

  updateStatus(order: Order): void {
  order.isLoading = true;

  this.orderService.updateDeliveryStatus(order.id, order.deliveryStatus).subscribe({
    next: () => {
      order.isLoading = false;
      this.toastr.success(`Email envoyé à ${order.userEmail} pour le statut ${order.deliveryStatus}`);
    },
    error: () => {
      order.isLoading = false;
      this.toastr.error('Erreur lors de la mise à jour du statut');
    }
  });
}


}
