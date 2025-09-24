import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { Variant } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  apiUrl = 'http://localhost:8080/api/baskets';
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals>({
    subtotal: 0,
    shippingPrice: 0,
    total: 0
  });
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      const parsedBasket = JSON.parse(storedBasket);
      const realBasket = new Basket();
      realBasket.id = parsedBasket.id;
      realBasket.items = parsedBasket.items ?? [];
      realBasket.shippingPrice = parsedBasket.shippingPrice ?? 0; // default 0 if missing

      this.basketSource.next(realBasket);
      this.calculateTotals();
    }
  }

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // updateShippingPrice(shippingPrice: number): void {
  //   const updatedBasketTotal = this.basketTotalSource.value;
  //   updatedBasketTotal.shipping = shippingPrice;
  //   updatedBasketTotal.total = updatedBasketTotal.subtotal + shippingPrice;
  //   this.basketTotalSource.next(updatedBasketTotal);
  // }

  updateShippingPrice(shippingPrice: number): void {
    const basket = this.getCurrentBasket();
    if (!basket) return;

    this.http.put<Basket>(
      `${this.apiUrl}/${basket.id}/shipping?shippingPrice=${shippingPrice}`,
      {},
      this.getAuthHeaders()
    ).subscribe({
      next: updatedBasket => {
        this.basketSource.next(updatedBasket);
        this.calculateTotals();
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
      },
      error: err => {
        console.error('Error updating shipping price:', err);
      }
    });
  }


  clearBasket() {
    this.basketSource.next(null);
    localStorage.removeItem('basket_id');
    localStorage.removeItem('basket');
  }

  getBasket(id: string) {
    return this.http.get<Basket>(`${this.apiUrl}/${id}`, this.getAuthHeaders()).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
        localStorage.setItem('basket', JSON.stringify(basket));
      }
    });
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.apiUrl, basket, this.getAuthHeaders()).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
        localStorage.setItem('basket', JSON.stringify(basket));
      }
    });
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1,variant?: Variant) {
    const itemToAdd = this.mapProductToBasket(item);
    const basket = this.getCurrentBasket() ?? this.createBasket();
    basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  upsertItems(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  incrementItemQuantity(itemId: number, quantity: number = 1) {
    const basket = this.getCurrentBasket();
    if (basket) {
      const item = basket.items.find(p => p.id === itemId);
      if (item) {
        item.quantity += quantity;
        if (item.quantity < 1) {
          item.quantity = 1;
        }
        this.setBasket(basket);
      }
    }
  }

  decrementItemQuantity(itemId: number, quantity: number = 1) {
    const basket = this.getCurrentBasket();
    if (basket) {
      const item = basket.items.find(p => p.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= quantity;
        this.setBasket(basket);
      }
    }
  }

  remove(itemId: number) {
    const basket = this.getCurrentBasket();
    if (basket) {
      const itemIndex = basket.items.findIndex(p => p.id === itemId);
      if (itemIndex !== -1) {
        basket.items.splice(itemIndex, 1);
        this.setBasket(basket);
      }
      if (basket.items.length === 0) {
        this.basketSource.next(null);
        localStorage.removeItem('basket_id');
        localStorage.removeItem('basket');
      }
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasket();
    if (!basket) return;
    const shippingPrice = basket.shippingPrice || 0;
    const subTotal = basket.items.reduce((x, y) => (y.price * y.quantity) + x, 0);
    const total = subTotal + shippingPrice;
    this.basketTotalSource.next({ shippingPrice, subtotal: subTotal, total });
  }

  private mapProductToBasket(item: Product): BasketItem {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      productBrand: item.productBrand,
      productType: item.productType
    }
  }
}
