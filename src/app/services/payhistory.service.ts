import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayhistoryService {

  private _payHistoryURL = "api/bookhistory/";
  constructor(private http: HttpClient) { }

  getPayHistory(email) {
  	return this.http.get<any>(this._payHistoryURL+email)
  }
}
