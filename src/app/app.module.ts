import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
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
import { TestPageComponent } from './pages/test-page/test-page.component';
import { RestaurantPreviewComponent } from './components/restaurant-preview/restaurant-preview.component';

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
    TestPageComponent,
    RestaurantPreviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
