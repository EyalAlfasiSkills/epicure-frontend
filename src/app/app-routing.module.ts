import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: "full" },
  { path: "home", component: HomePageComponent, pathMatch: "full", data: { animation: 'fade' } },
  { path: "test", component: TestPageComponent, pathMatch: "full", data: { animation: 'fade' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
