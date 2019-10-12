import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  private _venueList = "api/venues";
  private _searchVenu = "api/venuefilter";

  constructor(private http: HttpClient) { }

  getCityList() {
  	return this.http.get<any>(this._venueList)
  }

  searchVenu(searchData) {
    return this.http.post<any>(this._searchVenu, searchData).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

}
