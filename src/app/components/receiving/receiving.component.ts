import { Component } from '@angular/core';
import { IProduct } from '../../../types/Product';
import { ProductsService } from '../../services/products.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-receiving',
  standalone: false,

  templateUrl: './receiving.component.html',
  styleUrl: './receiving.component.css',
})
export class ReceivingComponent {
  private products: IProduct[] = [];
  public receivingProducts: IProduct[] = [];
  public items: Array<any> = [];
  public columns: Array<any> = [];

  constructor(
    private productService: ProductsService,
    public poNotification: PoNotificationService,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;

      this.receivingProducts = this.products.filter(
        (product) => product.status === 'Recebimento',
      );

      this.items = this.receivingProducts.map((product) => ({
        id: product.id,
        name: product.name,
        code: product.code,
        quantity: product.quantity,
        receive: ['receive', 'documentation'],
      }));

      this.columns = [
        { property: 'name', label: 'Nome' },
        { property: 'code', label: 'Código' },
        { property: 'quantity', label: 'Quantidade' },
        {
          property: 'receive',
          label: 'Actions',
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
    });
  }

  putReceivedProductIntoStock(selectedProduct: any) {
    const productIndex = this.products.findIndex(
      (product) => product.id === selectedProduct.id,
    );

    if (productIndex !== -1) {
      this.products[productIndex].status = 'Estoque';

      this.productService.updateProduct(this.products[productIndex]).subscribe({
        next: (updatedProduct) => {
          console.log('Produto atualizado com sucesso:', updatedProduct);
          this.poNotification.success('Produto atualizado com sucesso!'); // Fazer funcionar
        },
        error: (error) => {
          console.error('Erro ao atualizar o produto:', error);
          this.poNotification.error('Erro ao atualizar o produto!'); // Fazer funcionar
        },
      });

      this.items = this.items.filter((item) => item.id !== selectedProduct.id);
    }
  }
}
