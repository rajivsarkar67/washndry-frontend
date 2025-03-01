import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AddressComponent } from './address/address.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SelectionComponent } from './selection/selection.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { isUserGuard } from './is-user.guard';
import { isAdminGuard } from './is-admin.guard';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'selection', component: SelectionComponent, canActivate: [authGuard, isUserGuard]},
    {path: 'schedule', component: ScheduleComponent, canActivate: [authGuard, isUserGuard]},
    {path: 'address', component: AddressComponent, canActivate: [authGuard, isUserGuard]},
    {path: 'orders-list', component: OrdersListComponent, canActivate: [authGuard, isUserGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'admin-signup', component: SignupComponent},
    {path: 'admin-panel', component: AdminPanelComponent, canActivate: [authGuard, isAdminGuard]},
];