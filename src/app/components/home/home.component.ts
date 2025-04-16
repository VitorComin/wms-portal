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
  private products: IProduct[] = [];
  public stockProducts: IProduct[] = [];
  public receivingProducts: IProduct[] = [];
  public shippingProducts: IProduct[] = [];
  public shippedProducts: IProduct[] = [];
  public todayShippedProducts: IProduct[] = [];
  public items: Array<any> = [];
  public columns: Array<any> = [];

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

      this.items = this.products.map((product) => ({
        name: product.name,
        code: product.code,
        quantity: product.quantity,
        status: product.status,
      }));

      this.columns = [
        { property: 'name', label: 'Nome' },
        { property: 'code', label: 'Código' },
        { property: 'quantity', label: 'Quantidade' },
        { property: 'status', label: 'Status' },
      ];
    });
  }
}
