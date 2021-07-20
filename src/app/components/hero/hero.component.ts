import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { SearchService } from 'src/app/services/search-service/search.service';
import { SearchResults } from 'src/app/models/search-results/SearchResults';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('mountAnimation', [
      state('closed', style({
        transform: 'translateY(-20px)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('closed => open', [
        animate('0.5s ease')
      ]),
      transition('open => closed', [
        animate('0.5s ease')
      ]),
    ])
  ]
})
export class HeroComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  isOpen = false
  searchResults: SearchResults | null = null
  searchTimeoutId!: ReturnType<typeof setTimeout>
  searchStr = ''

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpen = true
    }, 200);
  }

  onSearchInput() {
    clearTimeout(this.searchTimeoutId)
    this.searchResults = null
    this.searchTimeoutId = setTimeout(() => {
      this.searchService.fetchSearchResults(this.searchStr).subscribe(results => {
        this.searchResults = results
      }, (err) => {
        console.log(err);
      })
    }, 2000);
  }
}
