import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../../types/Product';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public products: IProduct[] = [];
  public stockProducts: IProduct[] = [];
  public receivingProducts: IProduct[] = [];
  public shippingProducts: IProduct[] = [];
  public shippedProducts: IProduct[] = [];
  public todayShippedProducts: IProduct[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      const today = new Date().toISOString().slice(0, 10);

      this.stockProducts = this.products.filter(
        (product) => product.status === 'Estoque',
      );
      this.receivingProducts = this.products.filter(
        (product) => product.status === 'Recebimento',
      );
      this.shippingProducts = this.products.filter(
        (product) => product.status === 'Expedição',
      );
      this.shippedProducts = this.products.filter(
        (product) => product.status === 'Expedido',
      );
      this.todayShippedProducts = this.shippedProducts.filter(
        (product) => product.updated_at.slice(0, 10) === today,
      );
    });
  }
}
