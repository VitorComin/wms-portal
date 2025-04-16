import { Component, Input, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../types/Product';

@Component({
  selector: 'app-home-products-table',
  standalone: false,

  templateUrl: './home-products-table.component.html',
  styleUrl: './home-products-table.component.css',
})
export class HomeProductsTableComponent {
  @Input() products: IProduct[] = [];

  public columns: Array<any> = [];
  public items: Array<any> = [];

  ngOnInit(): void {
    this.columns = [
      { property: 'name', label: 'Nome' },
      { property: 'code', label: 'Código' },
      { property: 'quantity', label: 'Quantidade' },
      { property: 'status', label: 'Status' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.items = this.products.map((product) => ({
        name: product.name,
        code: product.code,
        quantity: product.quantity,
        status: product.status,
      }));
    }
  }
}
