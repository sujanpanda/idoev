import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookcalcService {

  private _getbookCalc = "api/getcalculatebook/";
  private _postbookCalc = "api/bookingcalculation";
  private _updbookCalc = "api/bookcalcupdate";
  constructor(private http: HttpClient) { }

  getBookCalc(getVenue) {
    return this.http.get<any>(this._getbookCalc+getVenue)
  }

  bookCalc(bookData) {
    return this.http.post<any>(this._postbookCalc, bookData).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

  bookCalcupdate(upbookData) {
    return this.http.post<any>(this._updbookCalc, upbookData).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }
}
