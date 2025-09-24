import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestProductsChartComponent } from './best-products-chart.component';

describe('BestProductsChartComponent', () => {
  let component: BestProductsChartComponent;
  let fixture: ComponentFixture<BestProductsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestProductsChartComponent]
    });
    fixture = TestBed.createComponent(BestProductsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
