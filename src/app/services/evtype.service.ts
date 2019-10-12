import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvtypeService {

  private _evTypeUrl = "api/eventtype";

  constructor(private http: HttpClient) { }

  getEventType() {
  	return this.http.get<any>(this._evTypeUrl)
  }

}
