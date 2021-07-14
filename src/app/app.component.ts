import { Component, HostBinding, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade } from './animations/route-animations';
import { DataService } from './services/data-service/data.service';

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
    private dataService: DataService
  ) {

  }
  isAnimationDisabled = !this.dataService.isMobile

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRoute && outlet.activatedRouteData.animation
  }
}
