import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductsTableComponent } from './home-products-table.component';

describe('HomeProductsTableComponent', () => {
  let component: HomeProductsTableComponent;
  let fixture: ComponentFixture<HomeProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
