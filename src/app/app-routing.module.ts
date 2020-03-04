import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShoeslistComponent} from './shoeslist/shoeslist.component';
import {OrdersComponent} from './orders/orders.component';
import {OurstorageComponent} from './ourstorage/ourstorage.component';


const routes: Routes = [
  {path: '', component: ShoeslistComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'ourstorage', component: OurstorageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
