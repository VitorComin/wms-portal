import { Component, Input } from '@angular/core';
import { IProduct } from '../../../types/Product';

@Component({
  selector: 'app-home-widgets',
  standalone: false,

  templateUrl: './home-widgets.component.html',
  styleUrl: './home-widgets.component.css',
})
export class HomeWidgetsComponent {
  @Input() productsData!: {
    stockProducts: IProduct[];
    receivingProducts: IProduct[];
    shippingProducts: IProduct[];
    todayShippedProducts: IProduct[];
  };
}
