import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _venueDetail = "api/bookingcalc/";

  constructor(private http: HttpClient) { }
  getBookingCalc(id) {
  	return this.http.get<any>(this._venueDetail+id)
  }
}
