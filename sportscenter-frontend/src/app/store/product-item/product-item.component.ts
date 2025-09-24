import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router'; // <-- Ajout du Router

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  user: User | null = null;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router // <-- Injection du Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté si présent
    this.user = this.accountService.getCurrentUser();
  }

  additemToBasket() {
  if (!this.user) {
    // Affiche un toast avec message et bouton simulé
    const toast = this.toastr.warning(
      'You need to log in to add products to your cart. Click here to log in.',
      'Not Logged In',
      {
        tapToDismiss: true, // permet de cliquer sur le toast
        closeButton: true,
        timeOut: 5000,
        disableTimeOut: false,
      }
    );

    // Quand l'utilisateur clique sur le toast lui-même
    toast.onTap?.subscribe(() => {
      this.router.navigate(['/login']); // redirection vers login
    });

    return;
  }

  if (this.product) {
    this.basketService.addItemToBasket(this.product);
    this.toastr.success('Item added to cart');
  }
}


  // Méthode pour extraire le nom de l'image depuis pictureUrl
  extractImageName(): string | null {
    if (this.product && this.product.pictureUrl) {
      const parts = this.product.pictureUrl.split('/');
      return parts.length > 0 ? parts[parts.length - 1] : null;
    }
    return null;
  }
}
