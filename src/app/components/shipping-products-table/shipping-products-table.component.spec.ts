import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingProductsTableComponent } from './shipping-products-table.component';

describe('ShippingProductsTableComponent', () => {
  let component: ShippingProductsTableComponent;
  let fixture: ComponentFixture<ShippingProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
