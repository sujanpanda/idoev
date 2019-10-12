import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetformdetailsService {

  private _getformsUrl = "api/getcontactform";
  private _getfeedUrl = "api/getuserfeed";
  private _getmissingUrl = "api/getmisscollect";
  private _geteventBookUrl = "api/geteventbooking";
  private _postBookCnf = "api/approvebooking";
  constructor(private http: HttpClient) { }

  getFormDetails() {
    return this.http.get<any>(this._getformsUrl)
  }

  getFeedbacksDetails() {
    return this.http.get<any>(this._getfeedUrl)
  }

  getmissingDetails() {
    return this.http.get<any>(this._getmissingUrl)
  }

  geteventDetails() {
    return this.http.get<any>(this._geteventBookUrl)
  }

  posteventApprove(evBookdata) {
    return this.http.post<any>(this._postBookCnf, evBookdata).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }
}
