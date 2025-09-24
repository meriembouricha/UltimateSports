import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCategoriesChartComponent } from './popular-categories-chart.component';

describe('PopularCategoriesChartComponent', () => {
  let component: PopularCategoriesChartComponent;
  let fixture: ComponentFixture<PopularCategoriesChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularCategoriesChartComponent]
    });
    fixture = TestBed.createComponent(PopularCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
