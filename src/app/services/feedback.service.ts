import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private _userFeedbackUrl = "api/feedback";

  constructor(private http: HttpClient) { }

  updateFeedback(feedbackdata) {
    return this.http.post<any>(this._userFeedbackUrl, feedbackdata).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }
}
