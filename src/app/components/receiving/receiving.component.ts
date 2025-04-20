import { Component } from '@angular/core';
import { IProduct, IReceivingProductsTableItems } from '../../../types/Product';
import { ProductsService } from '../../services/products.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-receiving',
  standalone: false,
  templateUrl: './receiving.component.html',
  styleUrl: './receiving.component.css',
})
export class ReceivingComponent {
  public products: IProduct[] = [];
  public receivingProducts: IProduct[] = [];
  public items: Array<IReceivingProductsTableItems> = [];
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
    });
  }

  putReceivedProductIntoStock(selectedProduct: any) {
    const productIndex = this.products.findIndex(
      (product) => product.id === selectedProduct.id,
    );

    if (productIndex !== -1) {
      this.products[productIndex].status = 'Estoque';

      this.productService.updateProduct(this.products[productIndex]).subscribe({
        next: () => {
          this.poNotification.success({
            message: 'Produto recebido com sucesso!',
            duration: 2000,
          });
          this.items = this.items.filter(
            (item) => item.id !== selectedProduct.id,
          );
        },
        error: (error) => {
          console.error('Erro ao atualizar o produto:', error);
          this.poNotification.error({
            message: 'Erro ao receber o produto!',
            duration: 2000,
          });
        },
      });
    }
  }

  updateProductListAfterFormSubmit = (newReceivingProduct: IProduct): void => {
    this.items = [
      ...this.items,
      { ...newReceivingProduct, receive: ['receive', 'documentation'] },
    ];
    this.products = [...this.products, newReceivingProduct];
  };
}
