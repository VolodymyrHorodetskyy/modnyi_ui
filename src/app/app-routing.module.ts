import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShoeslistComponent} from './shoeslist/shoeslist.component';
import {OrdersComponent} from './orders/orders.component';
import {OurstorageComponent} from './ourstorage/ourstorage.component';
import {StatisticpageComponent} from './statistics/statisticpage/statisticpage.component';
import {FinanceComponent} from './finance/finance.component';
import {CanceledComponent} from './canceled/canceled.component';
import {NeeddeliveryComponent} from './statistics/needdelivery/needdelivery.component';


const routes: Routes = [
  {path: '', component: ShoeslistComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'ourstorage', component: OurstorageComponent},
  {path: 'statistics', component: StatisticpageComponent},
  {path: 'finance', component: FinanceComponent},
  {path: 'canceled', component: CanceledComponent},
  {path: 'delivery', component: NeeddeliveryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
