import { Component, Input } from '@angular/core';
import {
  PoDynamicFormComponent,
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../../types/Product';

@Component({
  selector: 'app-receiving-form',
  standalone: false,
  templateUrl: './receiving-form.component.html',
  styleUrl: './receiving-form.component.css',
})
export class ReceivingFormComponent {
  @Input() updateProductListAfterFormSubmit!: (
    newReceivingProduct: IProduct,
  ) => void;

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

  onSubmit(dynamicForm: PoDynamicFormComponent) {
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

        this.updateProductListAfterFormSubmit(newReceivingProduct);

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
