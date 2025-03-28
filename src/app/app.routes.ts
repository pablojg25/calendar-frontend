import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateUserNotificationComponent } from './components/create-user-notification/create-user-notification.component';
import { authGuard } from './guards/auth.guard';
import { noLoginGuard } from './guards/no-login.guard';
import { ViewUserNotificationComponent } from './components/view-user-notification/view-user-notification.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent,canActivate:[noLoginGuard]},
    {path:'register',component:RegisterComponent,canActivate:[noLoginGuard]},
    {path:'create-user-notification',component:CreateUserNotificationComponent,canActivate:[authGuard]},
    {path:'user-notification',component:ViewUserNotificationComponent,canActivate:[authGuard]},
    {path:'**',redirectTo:''},
];
