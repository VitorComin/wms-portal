import { Component, Input } from '@angular/core';
import {
  IReceivingProductsTableItems,
  IReceivingTableColumns,
} from '../../../types/Product';

@Component({
  selector: 'app-receiving-products-table',
  standalone: false,

  templateUrl: './receiving-products-table.component.html',
  styleUrl: './receiving-products-table.component.css',
})
export class ReceivingProductsTableComponent {
  @Input() putReceivedProductIntoStock!: (
    selectedProduct: IReceivingProductsTableItems,
  ) => void;
  @Input() items: IReceivingProductsTableItems[] = [];

  public columns: Array<IReceivingTableColumns> = [];

  ngOnInit(): void {
    this.columns = [
      { property: 'name', label: 'Nome' },
      { property: 'code', label: 'Código' },
      { property: 'quantity', label: 'Quantidade' },
      {
        property: 'receive',
        label: 'Confirmar Recebimento',
        type: 'icon',
        sortable: false,
        icons: [
          {
            action: this.putReceivedProductIntoStock.bind(this),
            color: 'green',
            icon: 'an-fill an-check-fat',
            tooltip: 'Receber',
            value: 'receive',
          },
        ],
      },
    ];
  }
}
