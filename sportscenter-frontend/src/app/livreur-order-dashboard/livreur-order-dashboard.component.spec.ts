import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurOrderDashboardComponent } from './livreur-order-dashboard.component';

describe('LivreurOrderDashboardComponent', () => {
  let component: LivreurOrderDashboardComponent;
  let fixture: ComponentFixture<LivreurOrderDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivreurOrderDashboardComponent]
    });
    fixture = TestBed.createComponent(LivreurOrderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
