import { ToastrService } from 'ngx-toastr';
import { StoreData } from './../shared/models/storeData';
import { Brand } from './../shared/models/brand';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/product';
import { Type } from '../shared/models/type';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { StoreModelService } from './store.service.module';
import { User } from '../shared/models/user';
import { AccountService } from '../account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  @Input() title: string = '';
  user: User | null = null;
  recommendedProducts: Product[] = [];

  constructor(
    private storeService: StoreService,
    public storeData: StoreModelService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialisation par défaut
    this.storeData.selectedBrand = { id: 0, name: 'All' };
    this.storeData.selectedType = { id: 0, name: 'All' };

    // Récupérer les queryParams si l'utilisateur vient du mega menu
    this.route.queryParams.subscribe(params => {
      const brandId = params['brand'];
      const typeId = params['type'];

      if (brandId) {
        const brand = this.storeData.brands.find(b => b.id === +brandId);
        if (brand) this.selectBrand(brand);
      }

      if (typeId) {
        const type = this.storeData.types.find(t => t.id === +typeId);
        if (type) this.selectType(type);
      }

      // Toujours fetch les produits
      this.fetchProducts();
    });

    // Charger les brands et types
    this.getBrands();
    this.getTypes();

    // Récupérer les produits recommandés si l'utilisateur est connecté
    this.accountService.currentUser$
      .pipe(
        tap(user => console.log('[DEBUG] currentUser$ emitted:', user)),
        filter((user): user is User => !!user && !!user.id),
        take(1)
      )
      .subscribe({
        next: user => {
          console.log('[DEBUG] Valid user received in Store:', user);
          this.user = user;
          this.storeService.getRecommendedProducts(user.id).subscribe({
            next: products => {
              this.recommendedProducts = products;
              console.log('[DEBUG] Recommended products:', products);
            },
            error: err => console.error('Error fetching recommendations', err),
          });
        },
      });
  }

  pageChanged(event: PageChangedEvent): void {
    if (event.page !== this.storeData.currentPage) {
      this.storeData.currentPage = event.page;
      this.fetchProducts(this.storeData.currentPage);
    }
  }

  fetchProducts(page: number = 1) {
    const backendPage = page - 1;
    const brandId = this.storeData.selectedBrand?.id || 0;
    const typeId = this.storeData.selectedType?.id || 0;

    let url = `${this.storeService.apiUrl}?page=${backendPage}&size=${this.storeData.pageSize}`;

    if (brandId && brandId !== 0) url += `&brandId=${brandId}`;
    if (typeId && typeId !== 0) url += `&typeId=${typeId}`;
    if (this.storeData.search) url += `&keyword=${this.storeData.search}`;
    if (this.storeData.selectedSort !== 'asc') url += `&sort=name&order=${this.storeData.selectedSort}`;

    this.storeService.getProducts(brandId, typeId, url).subscribe({
      next: data => {
        this.storeData.products = data.content;
        this.storeData.pageable = data.pageable;
        this.storeData.totalElements = data.totalElements;
        this.storeData.currentPage = data.pageable.pageNumber + 1;
        this.toastr.success('Products fetched');
      },
      error: error => {
        this.toastr.error('Error fetching data');
        console.error(error);
      },
    });
  }

  getBrands() {
    this.storeService.getBrands().subscribe({
      next: response => this.storeData.brands = [{ id: 0, name: 'All' }, ...response],
      error: error => console.error(error)
    });
  }

  getTypes() {
    this.storeService.getTypes().subscribe({
      next: response => this.storeData.types = [{ id: 0, name: 'All' }, ...response],
      error: error => console.error(error)
    });
  }

  selectBrand(brand: Brand) {
    this.storeData.selectedBrand = brand;
    this.storeData.selectedType = { id: 0, name: 'All' }; // reset type
    this.router.navigate([], { queryParams: { brand: brand.id }, queryParamsHandling: 'merge' });
    this.fetchProducts();
  }

  selectType(type: Type) {
    this.storeData.selectedType = type;
    this.storeData.selectedBrand = { id: 0, name: 'All' }; // reset brand
    this.router.navigate([], { queryParams: { type: type.id }, queryParamsHandling: 'merge' });
    this.fetchProducts();
  }

  onSortChange() {
    this.fetchProducts();
  }

  onSearch() {
    this.fetchProducts();
  }

  onReset() {
    this.storeData.search = '';
    this.fetchProducts();
  }
}
