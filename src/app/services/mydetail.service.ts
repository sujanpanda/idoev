import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MydetailService {

  private _userDetailUrl = "api/userdetail";
  private _userUpdateUrl = "api/updateuser";

  constructor(private http: HttpClient) { }

  getUserDetail() {
  	return this.http.get<any>(this._userDetailUrl)
  }

  updateUser(updateuser) {
    return this.http.post<any>(this._userUpdateUrl, updateuser).pipe(
      catchError(err => err.code === 401 
        ? observableThrowError(err)
        : observableThrowError(err)
      )  
    );
  }

}
