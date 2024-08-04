import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AddressComponent } from './address/address.component';
import { ScheduleComponent } from './schedule/schedule.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'address', component: AddressComponent},
    {path: 'orders-list', component: OrdersListComponent},

];
