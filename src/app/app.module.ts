import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { DishPreviewComponent } from './components/dish-preview/dish-preview.component';
import { PreviewItemsListComponent } from './components/preview-items-list/preview-items-list.component';
import { IconsMeaningComponent } from './components/icons-meaning/icons-meaning.component';
import { ChefOfTheWeekComponent } from './components/chef-of-the-week/chef-of-the-week.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { RestaurantPreviewComponent } from './components/restaurant-preview/restaurant-preview.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminTableRowComponent } from './components/admin-table-row/admin-table-row.component';
import { AddEntityModalComponent } from './components/add-entity-modal/add-entity-modal.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { EditEntityComponent } from './components/edit-entity/edit-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    HeroComponent,
    DishPreviewComponent,
    PreviewItemsListComponent,
    IconsMeaningComponent,
    ChefOfTheWeekComponent,
    AboutUsComponent,
    FooterComponent,
    RestaurantPreviewComponent,
    LoginPageComponent,
    AdminPageComponent,
    AdminTableRowComponent,
    AddEntityModalComponent,
    AdminHeaderComponent,
    EditEntityComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SwiperModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
