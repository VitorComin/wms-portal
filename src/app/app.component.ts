import { Component } from '@angular/core';
import { PoMenuPanelItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  readonly menuItems: PoMenuPanelItem[] = [
    { label: 'Início', link: '/', icon: 'an an-house-line' },
    { label: 'Recebimento', link: 'receiving', icon: 'an an-box-arrow-down' },
    { label: 'Expedição', link: 'shipping', icon: 'an an-box-arrow-up' }
  ];
}
