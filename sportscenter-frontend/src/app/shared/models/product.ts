export interface Variant {
  id: number;
  size?: string;        // Taille (optionnelle)
  color?: string;       // Couleur (optionnelle)
  stock?: number;       // Stock disponible pour cette variante
  price?: number;       // Prix spécifique si nécessaire
  pictureUrl?: string;  // <-- Image spécifique à la variante
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;   // Image par défaut
  productType: string;
  productBrand: string;
  productQuantity: number;

  addQuantity?: number;

  variants?: Variant[]; // Liste des variantes
}
