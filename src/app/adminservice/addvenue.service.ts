import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddvenueService {

  private _geteventUrl = "api/eventtype";
  private _addvenueUrl = "api/addvenues";
  private _chkvenueUrl = "api/checkvenue/";
  private _addvenueIMG = "api/addvenueimg";
  private _addownerIMG = "api/addownerimg";
  constructor(private http: HttpClient) { }

  getEventsList() {
    return this.http.get<any>(this._geteventUrl)
  }

  checkVenue(venueid) {
    return this.http.get<any>(this._chkvenueUrl+venueid)
  }

  addNewVenue(venuedata) {
    return this.http.post<any>(this._addvenueUrl, venuedata).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

  addVenueImg(venueimg) {
    return this.http.post<any>(this._addvenueIMG, venueimg).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

  addOwnerImg(ownerimg) {
    return this.http.post<any>(this._addownerIMG, ownerimg).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

}
