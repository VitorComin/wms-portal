import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReceivingComponent } from './components/receiving/receiving.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { PoChartModule } from '@po-ui/ng-components';
import { PoIconModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { HomeChartComponent } from './components/home-chart/home-chart.component';
import { HomeWidgetsComponent } from './components/home-widgets/home-widgets.component';
import { HomeProductsTableComponent } from './components/home-products-table/home-products-table.component';
import { ReceivingFormComponent } from './components/receiving-form/receiving-form.component';
import { ReceivingProductsTableComponent } from './components/receiving-products-table/receiving-products-table.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShippingProductsTableComponent } from './components/shipping-products-table/shipping-products-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReceivingComponent,
    ShippingComponent,
    HomeChartComponent,
    HomeWidgetsComponent,
    HomeProductsTableComponent,
    ReceivingFormComponent,
    ReceivingProductsTableComponent,
    ShippingFormComponent,
    ShippingProductsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoChartModule,
    PoIconModule,
    PoNotificationModule,
    PoButtonModule,
    PoDynamicModule,
    PoFieldModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
