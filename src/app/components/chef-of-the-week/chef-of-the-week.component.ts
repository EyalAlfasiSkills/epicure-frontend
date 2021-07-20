import { Component, OnInit } from '@angular/core';
import { Chef } from 'src/app/models/chef/Chef';
import { ChefOfTheWeek } from 'src/app/models/chef/ChefOfTheWeek';
import { ChefService } from 'src/app/services/chef-service/chef.service';

@Component({
  selector: 'app-chef-of-the-week',
  templateUrl: './chef-of-the-week.component.html',
  styleUrls: ['./chef-of-the-week.component.scss'],
})
export class ChefOfTheWeekComponent implements OnInit {

  chefOfTheWeek!: Chef;

  constructor(private chefService: ChefService) { }

  ngOnInit(): void {
    this.chefService.chefOfTheWeek.subscribe((chef) => {
      this.chefOfTheWeek = chef;
    });
  }
}
