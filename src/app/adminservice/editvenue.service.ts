import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditvenueService {

  private _getvenueList = "api/allvenuelist";
  private _getvenueDetail = "api/getvenuedetail/";
  private _geteventUrl = "api/eventtype";
  private _editVenueUrl = "api/editvenues";
  constructor(private http: HttpClient) { }

  getEventsList() {
    return this.http.get<any>(this._getvenueList)
  }

  getVenueDetail(getVenue) {
    return this.http.get<any>(this._getvenueDetail+getVenue)
  }

  getEventType() {
    return this.http.get<any>(this._geteventUrl)
  }

  editVenue(venuedata) {
    return this.http.post<any>(this._editVenueUrl, venuedata).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

}
