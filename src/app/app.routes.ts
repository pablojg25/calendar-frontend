import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateUserNotificationComponent } from './components/create-user-notification/create-user-notification.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'create-user-notification',component:CreateUserNotificationComponent,canActivate:[authGuard]},
    {path:'**',redirectTo:''},
];
