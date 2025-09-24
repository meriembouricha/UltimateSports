import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/productService';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})

export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  productId!: number;  // Variable pour stocker l'ID du produit

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private routes: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du produit à partir de l'URL
    const id = this.routes.snapshot.paramMap.get('id');
    
    if (id) {
      this.productId = +id;  // Convertir l'ID en nombre
      this.loadProductData(this.productId);  // Charger les données du produit
    } else {
      console.error('Produit ID manquant dans l\'URL');
    }

    // Initialisation du formulaire après la vérification de l'ID
    this.updateProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      pictureUrl: ['', Validators.required],
      productType: ['', Validators.required],
      productBrand: ['', Validators.required]
    });
  }

  loadProductData(productId: number): void {
    this.productService.getProductById(productId).subscribe(product => {
      this.updateProductForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        pictureUrl: product.pictureUrl,
        productType: product.productType,
        productBrand: product.productBrand
      });
    });
  }

  onSubmit(): void {
    if (this.updateProductForm.valid) {
      const updatedProduct = { 
        ...this.updateProductForm.value,
        id: this.productId  
      };

      this.productService.updateProduct(updatedProduct).subscribe(response => {
        console.log('Produit mis à jour avec succès');
      });
       this.router.navigate(['/admin/products']);
    }
  }
}
