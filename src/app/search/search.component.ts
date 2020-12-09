import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  inputField: FormControl = new FormControl();
  searchResults: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.inputField.valueChanges
      .subscribe(inputField => this.searchService.searchArtists(inputField)
      .subscribe(result => {
          if(result.status === 400) { return;}
          else { this.searchResults = result.artists.items; }
      }));
  }

}
