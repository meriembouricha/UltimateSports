// Product Details Component TS
import { Component, OnInit } from '@angular/core';
import { Product, Variant } from 'src/app/shared/models/product';
import { StoreService } from '../store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { Feedback } from 'src/app/shared/models/feedback';
import { ProductService } from 'src/app/core/services/productService';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/user';
import toast from 'bootstrap/js/dist/toast';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  feedback: Feedback;
  feedbacks: Feedback[] = [];
  user!: User | null;

  selectedSize: string | null = null;
  selectedColor: string | null = null;
  mainImage: string = '';

  constructor(
    private storeService: StoreService,
    private activateRoute: ActivatedRoute,
    private basketService: BasketService,
    private productService: ProductService,
    private feedbackService: FeedbackService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.feedback = { rate: 0, descFeedback: '', product: null, user: {} as User };
  }

  ngOnInit(): void {
    const productId = this.activateRoute.snapshot.paramMap.get('id');
    if (productId) {
      const productIdNumber = Number(productId);
      this.productService.getProductById(productIdNumber).subscribe((data) => {
        this.product = data;
        this.feedback.product = this.product;
        this.mainImage = this.product.pictureUrl;
        this.loadFeedbacks(productIdNumber);
      });
    }
    this.user = this.accountService.getCurrentUser();
  }

  onVariantChange() {
    if (!this.product) return;
    const variant = this.product.variants?.find(v =>
      (!this.selectedSize || v.size === this.selectedSize) &&
      (!this.selectedColor || v.color === this.selectedColor)
    );
    this.mainImage = variant?.pictureUrl ?? this.product.pictureUrl;
  }

  loadFeedbacks(productId: number): void {
    this.feedbackService.getFeedbacksByProductId(productId).subscribe(
      (data) => this.feedbacks = data,
      (error) => console.error('Erreur lors du chargement des feedbacks:', error)
    );
  }

  submitFeedback(): void {
    if (!this.user) {
      this.toastr.error("Vous devez être connecté pour laisser un avis.");
      return;
    }
    this.feedback.user = this.user;
    this.feedbackService.addFeedback(this.feedback).subscribe(
      (response) => {
        this.feedbacks.push(response);
        this.toastr.success('Votre avis a été soumis avec succès.');
        this.feedback = { rate: 0, descFeedback: '', product: this.product, user: this.user };
      },
      (error) => this.toastr.error("Erreur lors de l'envoi de votre avis.")
    );
  }

  setRating(rating: number) { this.feedback.rate = rating; }

addToCart() {
  if (!this.user) {
    // Affiche le toast avec ngx-toastr
    const toastRef = this.toastr.warning(
      'You need to log in to add products to your cart. Click here to log in.',
      'Not Logged In',
      {
        tapToDismiss: true,
        closeButton: true,
        timeOut: 5000,
        disableTimeOut: false,
      }
    );

    // Redirection si l'utilisateur clique sur le toast
    toastRef.onTap?.subscribe(() => {
      this.router.navigate(['/login']);
    });

    return;
  }

  if (!this.product) return;

  let variantToAdd: Variant | undefined;
  if (this.product.variants?.length) {
    variantToAdd = this.product.variants.find(v =>
      v.size === this.selectedSize && v.color === this.selectedColor
    );
    if (!variantToAdd) {
      this.toastr.error('Please select a size and color.');
      return;
    }
  }

  this.basketService.addItemToBasket(this.product, this.quantity, variantToAdd);
  this.toastr.success('Article ajouté au panier');
}



  incrementQuantity() { this.quantity++; }
  decrementQuantity() { if (this.quantity > 1) this.quantity--; }

getStars(rating: number): number[] { return new Array(rating).fill(1); }

  get hasSizeVariants(): boolean { return !!this.product?.variants?.some(v => !!v.size); }
  get hasColorVariants(): boolean { return !!this.product?.variants?.some(v => !!v.color); }
  get hasVariants(): boolean { return !!(this.product?.variants && this.product.variants.length > 0); }
}
