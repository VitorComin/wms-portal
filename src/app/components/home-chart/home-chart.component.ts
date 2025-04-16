import { Component, Input, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../types/Product';
import { PoChartSerie } from '@po-ui/ng-components';

@Component({
  selector: 'app-home-chart',
  standalone: false,

  templateUrl: './home-chart.component.html',
  styleUrl: './home-chart.component.css',
})
export class HomeChartComponent {
  @Input() productsData!: {
    stockProducts: IProduct[];
    receivingProducts: IProduct[];
    shippingProducts: IProduct[];
    shippedProducts: IProduct[];
  };

  public pizzaChart: PoChartSerie[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productsData'] && this.productsData) {
      this.pizzaChart = [
        { label: 'Em Estoque', data: this.productsData.stockProducts.length },
        {
          label: 'Recebimento',
          data: this.productsData.receivingProducts.length,
        },
        {
          label: 'Em Expedição',
          data: this.productsData.shippingProducts.length,
        },
        { label: 'Expedido', data: this.productsData.shippedProducts.length },
      ];
    }
  }
}
