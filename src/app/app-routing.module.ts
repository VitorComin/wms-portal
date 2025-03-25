import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReceivingComponent } from './components/receiving/receiving.component';
import { ShippingComponent } from './components/shipping/shipping.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'receiving', component: ReceivingComponent},
  {path: 'shipping', component: ShippingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
