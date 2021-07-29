import { Component, HostBinding, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fade } from './animations/route-animations';
import { ChefService } from './services/chef-service/chef.service';
import { DataService } from './services/data-service/data.service';
import { DishService } from './services/dish-service/dish.service';
import { RestaurantService } from './services/restaurant-service/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fade,
  ]
})
export class AppComponent {
  title = 'epicure';
  constructor(
    private dataService: DataService,
    private _router: Router
  ) {
    this.router = this._router
  }
  router: Router
  isAnimationDisabled = false
  // isAnimationDisabled = !this.dataService.isMobile

  ngOnInit() {
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return (outlet && outlet.activatedRoute && outlet.activatedRouteData['animation']) || {}
  }
}
