import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingProductsTableComponent } from './receiving-products-table.component';

describe('ReceivingProductsTableComponent', () => {
  let component: ReceivingProductsTableComponent;
  let fixture: ComponentFixture<ReceivingProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivingProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivingProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
