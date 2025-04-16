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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReceivingComponent,
    ShippingComponent,
    HomeChartComponent,
    HomeWidgetsComponent,
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
