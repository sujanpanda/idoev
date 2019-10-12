import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private _paymentUrl = "api/paypost";
  private _responseUrl = "api/payresponse/";

  constructor(private http: HttpClient) { }

  getResponseDetail(id) {
    return this.http.get<any>(this._responseUrl+id)
  }

  userPayment(paydetail) {
  	return this.http.post<any>(this._paymentUrl, paydetail).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

}
