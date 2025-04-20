import { Component, Input, SimpleChanges } from '@angular/core';
import {
  PoDynamicFormField,
  PoDynamicFormComponent,
} from '@po-ui/ng-components';
import { IProduct } from '../../../types/Product';

@Component({
  selector: 'app-shipping-form',
  standalone: false,
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css',
})
export class ShippingFormComponent {
  @Input() stockProducts: IProduct[] = [];
  @Input() submitForm!: (dynamicForm: PoDynamicFormComponent) => void;

  formFields: Array<PoDynamicFormField> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stockProducts'] && this.stockProducts?.length) {
      this.buildFormFields();
    }
  }

  private buildFormFields(): void {
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
  }
}
