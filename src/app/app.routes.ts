import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AddressComponent } from './address/address.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'orders-list', component: OrdersListComponent},
    {path: 'address', component: AddressComponent},

];
