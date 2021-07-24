import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: "full" },
  { path: "home", component: HomePageComponent, pathMatch: "full", data: { animation: 'Home' } },
  { path: "login", component: LoginPageComponent, pathMatch: "full", data: { animation: 'Login' } },
  {
    path: "admin", redirectTo: 'admin/chef',
  },
  {
    path: "admin/:entity", component: AdminPageComponent, pathMatch: "full", data: { animation: 'Admin' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
