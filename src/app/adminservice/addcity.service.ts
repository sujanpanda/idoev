import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddcityService {

  private _addcityUrl = "api/addcity";
  private _getcityUrl = "api/admincity";
  constructor(private http: HttpClient) { }

  addCity(citydata) {
    return this.http.post<any>(this._addcityUrl, citydata).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

  getAllCities() {
    return this.http.get<any>(this._getcityUrl)
  }
}
