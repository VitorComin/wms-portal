import { Component } from '@angular/core';
import { IProduct } from '../../../types/Product';
import { ProductsService } from '../../services/products.service';
import {
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';

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
  public stockProducts: Array<any> = [];
  formFields: Array<PoDynamicFormField> = [];

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

      this.stockProducts = this.products.filter(
        (product) => product.status === 'Estoque',
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
        { property: 'destination', label: 'Destino' },
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

      this.formFields = [
        {
          property: 'product',
          label: 'Produto',
          divider: 'Detalhes do Produto',
          required: true,
          gridColumns: 6,
          gridSmColumns: 12,
          fieldValue: 'value',
          fieldLabel: 'name',
          options: this.stockProducts.map((product) => ({
            value: product.id,
            name: `${product.name} - ${product.quantity} itens`,
          })),
          placeholder: 'Selecione um produto',
        },
        {
          property: 'destination',
          label: 'Destino',
          required: true,
          maxLength: 30,
          gridColumns: 6,
          gridSmColumns: 12,
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

  submitForm(dynamicForm: any) {
    if (!dynamicForm.form.valid) {
      this.poNotification.error({
        message: 'Preencha todos os campos obrigatórios corretamente!',
        duration: 2000,
      });
      return;
    }

    const formValues = dynamicForm.form.value;
    const productIndex = this.products.findIndex(
      (product) => product.id === formValues.product,
    );

    if (productIndex !== -1) {
      this.products[productIndex].status = 'Expedição';
      this.products[productIndex].destination = formValues.destination;

      this.productService.updateProduct(this.products[productIndex]).subscribe({
        next: (value) => {
          this.poNotification.success({
            message: 'Produto em expedição!',
            duration: 2000,
          });

          this.items = [
            { ...value, shipping: ['shipping', 'documentation'] },
            ...this.items,
          ];

          dynamicForm.form.reset();
        },
        error: (error) => {
          console.error('Erro ao expedir o produto:', error);
          this.poNotification.error({
            message: 'Erro ao expedir o produto!',
            duration: 2000,
          });
        },
      });
    }
  }
}
