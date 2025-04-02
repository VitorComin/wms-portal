import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../types/Product';
import { ProductsService } from '../../services/products.service';
import {
  PoNotificationService,
  PoDynamicFormField,
} from '@po-ui/ng-components';

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
  validateFields: Array<string> = ['state'];
  formFields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      label: 'Nome',
      divider: 'Detalhes do Produto',
      required: true,
      minLength: 4,
      maxLength: 30,
      gridColumns: 4,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Insira o nome',
    },
    {
      property: 'code',
      label: 'Código',
      placeholder: 'XXXXXXX-XX',
      type: 'number',
      minLength: 4,
      required: true,
      maxLength: 10,
      gridColumns: 4,
      gridSmColumns: 12,
      order: -1,
    },
    {
      property: 'quantity',
      label: 'Quantidade',
      type: 'number',
      required: true,
      maxLength: 5,
      gridColumns: 4,
      gridSmColumns: 12,
    },
  ];

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

  onSubmit(dynamicForm: any) {
    if (!dynamicForm.form.valid) {
      this.poNotification.error({
        message: 'Preencha todos os campos obrigatórios corretamente!',
        duration: 2000,
      });
      return;
    }

    const formValues = dynamicForm.form.value;
    const newReceivingProduct = {
      id: crypto.randomUUID(),
      name: formValues.name,
      code: formValues.code,
      quantity: formValues.quantity,
      status: 'Recebimento',
      updated_at: new Date().toISOString(),
      destination: null,
    };

    this.productService.addProduct(newReceivingProduct).subscribe({
      next: () => {
        this.poNotification.success({
          message: 'Produto em recebimento!',
          duration: 2000,
        });
        const newReceivingProductTableEntry = {
          id: newReceivingProduct.id,
          name: newReceivingProduct.name,
          code: newReceivingProduct.code,
          quantity: newReceivingProduct.quantity,
          receive: ['receive', 'documentation'],
        };

        this.items = [...this.items, newReceivingProductTableEntry];

        dynamicForm.form.reset();
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
