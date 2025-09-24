import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.scss']
})
export class RecommendedProductsComponent {
  @Input() products: Product[] = [];
}
