import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShoeslistComponent} from './shoeslist/shoeslist.component';
import {OrdersComponent} from './orders/orders.component';
import {OurstorageComponent} from './ourstorage/ourstorage.component';
import {FinanceComponent} from './finance/finance.component';
import {CanceledComponent} from './canceled/canceled.component';
import {NeeddeliveryComponent} from './statistics/needdelivery/needdelivery.component';
import {ImportordersComponent} from './statistics/importorders/importorders.component';
import {GetreturnedComponent} from './canceled/getreturned/getreturned.component';
import {EarningsComponent} from './earnings/earnings.component';


const routes: Routes = [
  {path: '', component: ShoeslistComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'ourstorage', component: OurstorageComponent},
  {path: 'import', component: ImportordersComponent},
  {path: 'finance', component: FinanceComponent},
  {path: 'canceled', component: CanceledComponent},
  {path: 'delivery', component: NeeddeliveryComponent},
  {path: 'returned', component: GetreturnedComponent},
  {path: 'earnings', component: EarningsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
