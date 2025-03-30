import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateUserNotificationComponent } from './components/user-notifications/create-user-notification/create-user-notification.component';
import { authGuard } from './guards/auth.guard';
import { noLoginGuard } from './guards/no-login.guard';
import { ViewUserNotificationComponent } from './components/user-notifications/view-user-notification/view-user-notification.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SubscriptionNotifsComponent } from './components/subscriptions/subscription-notifs/subscription-notifs.component';
import { SubscriptionInfoComponent } from './components/subscriptions/subscription-info/subscription-info.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent,canActivate:[noLoginGuard]},
    {path:'register',component:RegisterComponent,canActivate:[noLoginGuard]},
    {path:'create-user-notification',component:CreateUserNotificationComponent,canActivate:[authGuard]},
    {path:'user-notification',component:ViewUserNotificationComponent,canActivate:[authGuard]},
    {path:'user-info',component:UserInfoComponent,canActivate:[authGuard]},
    {path:'subscriptions',component:SubscriptionNotifsComponent,canActivate:[authGuard]},
    {path:'subscription-info',component:SubscriptionInfoComponent,canActivate:[authGuard]},
    {path:'**',redirectTo:''},
];
