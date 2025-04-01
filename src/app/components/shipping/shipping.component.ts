import { Component } from '@angular/core';
import { IProduct } from '../../../types/Product';
import { ProductsService } from '../../services/products.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-shipping',
  standalone: false,

  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
})
export class ShippingComponent {
  private products: IProduct[] = [];
  public shippingProducts: IProduct[] = [];
  public items: Array<any> = [];
  public columns: Array<any> = [];

  constructor(
    public productService: ProductsService,
    public poNotification: PoNotificationService,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;

      this.shippingProducts = this.products.filter(
        (product) => product.status === 'Expedição',
      );

      this.items = this.shippingProducts.map((product) => ({
        id: product.id,
        name: product.name,
        code: product.code,
        quantity: product.quantity,
        destination: product.destination,
        shipping: ['shipping', 'documentation'],
      }));

      this.columns = [
        { property: 'name', label: 'Nome' },
        { property: 'code', label: 'Código' },
        { property: 'quantity', label: 'Quantidade' },
        { property: 'quantity', label: 'Destino' },
        {
          property: 'shipping',
          label: 'Actions',
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
    });
  }

  turnToShippedProduct(selectedProduct: any) {
    const productIndex = this.products.findIndex(
      (product) => product.id === selectedProduct.id,
    );

    if (productIndex !== -1) {
      this.products[productIndex].status = 'Expedido';
      this.products[productIndex].updated_at = new Date().toISOString();

      this.productService.updateProduct(this.products[productIndex]).subscribe({
        next: () => {
          this.poNotification.success({
            message: 'Produto expedido com sucesso!',
            duration: 2000,
          });
          this.items = this.items.filter(
            (item) => item.id !== selectedProduct.id,
          );
        },
        error: (error) => {
          console.error('Erro ao atualizar o produto:', error);
          this.poNotification.error({
            message: 'Erro ao expedir o produto!',
            duration: 2000,
          });
        },
      });
    }
  }
}
