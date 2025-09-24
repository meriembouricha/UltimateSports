import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBrandsChartComponent } from './top-brands-chart.component';

describe('TopBrandsChartComponent', () => {
  let component: TopBrandsChartComponent;
  let fixture: ComponentFixture<TopBrandsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBrandsChartComponent]
    });
    fixture = TestBed.createComponent(TopBrandsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
