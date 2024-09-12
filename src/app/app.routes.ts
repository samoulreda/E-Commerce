import { authGuard } from './layout/global/guard/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { NotFoundComponent } from './layout/pages/not-found/not-found.component';
import { ForgetpasswordComponent } from './layout/pages/forgetpassword/forgetpassword.component';
import { ProductDetalisComponent } from './layout/pages/product-detalis/product-detalis.component';
import { OrderComponent } from './layout/pages/order/order.component';
import { AllordersComponent } from './layout/pages/allorders/allorders.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'brands',component:BrandsComponent,canActivate:[authGuard]},
    {path:'cart',component:CartComponent,canActivate:[authGuard]},
    {path:'order/:id',component:OrderComponent,canActivate:[authGuard]},
    {path:'allorders',component:AllordersComponent,canActivate:[authGuard]},
    {path:'categories',component:CategoriesComponent,canActivate:[authGuard]},
    {path:'products',component:ProductsComponent,canActivate:[authGuard]},
    {path:'product-detalis/:id',component:ProductDetalisComponent,canActivate:[authGuard]},
    {path:'register',component:RegisterComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'login',component:LoginComponent},
    {path:'**',component:NotFoundComponent},
];
