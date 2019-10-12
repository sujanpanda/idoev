import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportmissService {

  private _reportMissingUrl = "api/reportmissing";

  constructor(private http: HttpClient) { }

  missingReportFunc(reportMissdata) {
    return this.http.post<any>(this._reportMissingUrl, reportMissdata).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

}
