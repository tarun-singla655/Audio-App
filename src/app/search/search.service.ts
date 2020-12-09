import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private clientId: string = '44b6976203c748c8b55f7654246ff550';
  private artistsUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id='+this.clientId+'&q=';

  constructor(private http: HttpClient) { }

  searchArtists(searchTerm: string) {
    let url = this.artistsUrl + searchTerm;
    return this.http.get(url).pipe(map((res:any) => res.json()));
  }
}
