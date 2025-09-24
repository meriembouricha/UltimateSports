import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurSideBarComponent } from './livreur-side-bar.component';

describe('LivreurSideBarComponent', () => {
  let component: LivreurSideBarComponent;
  let fixture: ComponentFixture<LivreurSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivreurSideBarComponent]
    });
    fixture = TestBed.createComponent(LivreurSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
