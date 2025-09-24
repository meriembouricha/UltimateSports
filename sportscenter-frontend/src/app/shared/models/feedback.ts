import { Product } from "./product";
import { User } from "./user";

export interface Feedback {
    id?: number; // Optionnel si vous utilisez un ID généré automatiquement
    rate: number;
    descFeedback: string;
    product: Product | null; // Ajoutez cette propriété
    user: User | null;
  }