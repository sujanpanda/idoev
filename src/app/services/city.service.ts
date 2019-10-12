import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private _cityList = "api/cities";
  private _allCities = "api/citylisting";
  private _venueByCt = "api/cityvenues";

  constructor(private http: HttpClient) { }

  getCityList() {
  	return this.http.get<any>(this._cityList)
  }

  getAllCities() {
    return this.http.get<any>(this._allCities)
  }

  getvenueByCt(cityvenues) {
  	return this.http.post<any>(this._venueByCt, cityvenues).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

}
