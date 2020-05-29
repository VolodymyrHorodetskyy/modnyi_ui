import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShoeslistComponent} from './shoeslist/shoeslist.component';
import {OrdersComponent} from './orders/orders.component';
import {FinanceComponent} from './finance/finance.component';
import {CanceledComponent} from './canceled/canceled.component';
import {NeeddeliveryComponent} from './needdelivery/needdelivery.component';
import {ImportordersComponent} from './importorders/importorders.component';
import {GetreturnedComponent} from './canceled/getreturned/getreturned.component';
import {EarningsComponent} from './earnings/earnings.component';
import {StatisticComponent} from './statistic/statistic.component';


const routes: Routes = [
  {path: '', component: ShoeslistComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'import', component: ImportordersComponent},
  {path: 'finance', component: FinanceComponent},
  {path: 'canceled', component: CanceledComponent},
  {path: 'delivery', component: NeeddeliveryComponent},
  {path: 'returned', component: GetreturnedComponent},
  {path: 'earnings', component: EarningsComponent},
  {path: 'statistic', component: StatisticComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
