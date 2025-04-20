import { Component, Input } from '@angular/core';
import { IShippingTableItems } from '../../../types/Product';

@Component({
  selector: 'app-shipping-products-table',
  standalone: false,

  templateUrl: './shipping-products-table.component.html',
  styleUrl: './shipping-products-table.component.css',
})
export class ShippingProductsTableComponent {
  @Input() items: IShippingTableItems[] = [];
  @Input() turnToShippedProduct!: (
    selectedProduct: IShippingTableItems,
  ) => void;

  public columns: Array<any> = [];

  ngOnInit(): void {
    this.columns = [
      { property: 'name', label: 'Nome' },
      { property: 'code', label: 'Código' },
      { property: 'quantity', label: 'Quantidade' },
      { property: 'destination', label: 'Destino' },
      {
        property: 'shipping',
        label: 'Confirmar Expedição',
        type: 'icon',
        sortable: false,
        icons: [
          {
            action: this.turnToShippedProduct.bind(this),
            color: 'green',
            icon: 'an-fill an-check-fat',
            tooltip: 'Expedir',
            value: 'shipping',
          },
        ],
      },
    ];
  }
}
