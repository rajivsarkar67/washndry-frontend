import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AddressComponent } from './address/address.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SelectionComponent } from './selection/selection.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'selection', component: SelectionComponent, canActivate: [authGuard]},
    {path: 'schedule', component: ScheduleComponent, canActivate: [authGuard]},
    {path: 'address', component: AddressComponent, canActivate: [authGuard]},
    {path: 'orders-list', component: OrdersListComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
];