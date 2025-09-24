import { Taille } from "./taille.enum";
import { Pointure } from "./pointure.enum";
import { Product } from "./product";

export interface ProductVariant {
  id: number;
  taille?: Taille;
  pointure?: Pointure;
  stockQuantity: number;
  product: Product;
}
