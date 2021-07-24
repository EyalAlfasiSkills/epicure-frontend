import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/models/search-results/SearchResults';
import { SearchService } from 'src/app/services/search-service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  searchResults: SearchResults | null = null
  searchTimeoutId!: ReturnType<typeof setTimeout>
  searchStr = ''

  onSearchInput() {
    clearTimeout(this.searchTimeoutId)
    this.searchResults = null
    this.searchTimeoutId = setTimeout(() => {
      this.searchService.fetchSearchResults(this.searchStr).subscribe(results => {
        this.searchResults = results
      }, (err) => {
        console.log(err);
      })
    }, 500);
  }

}
