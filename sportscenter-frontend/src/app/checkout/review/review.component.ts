import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket';
import { CheckoutService } from 'src/app/core/services/checkout.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  basket: Basket | null = new Basket();

  constructor(public basketService: BasketService, private router: Router, private checkoutService: CheckoutService){}


  async submitOrderAndPay() {
    // 1️⃣ Appelle la logique existante pour soumettre la commande
    this.submitOrder();

    // 2️⃣ Ensuite, lance le paiement Stripe
    this.checkoutService.createCheckoutSession().subscribe(async (sessionUrl) => {
      console.log('Session URL:', sessionUrl);
      if (sessionUrl) {
        window.location.href = sessionUrl; // Redirige vers Stripe Checkout
      }
    });
  }


  ngOnInit(): void {
    this.basketService.basketSource$.subscribe((basket) =>{
      this.basket = basket;
    })
  }

  extractImageName(item: BasketItem): string | null{
    if(item && item.pictureUrl){
      const parts = item.pictureUrl.split('/');
      if(parts.length>0){
        return parts[parts.length-1];
      }
    }
    return null;
  }
  submitOrder(){
    this.basketService.clearBasket();
    this.router.navigate(['/store']);
  }

}
