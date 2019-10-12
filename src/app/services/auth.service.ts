import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "api/register";
  private _loginUrl = "api/login";
  constructor(
  	private http: HttpClient,
  	private _router: Router,
  	private cookieService: CookieService
  ) { }
  	registerUser(user) {
	    return this.http.post<any>(this._registerUrl, user).pipe(
	      catchError(err => err.code === 401 
	        ? observableThrowError(err)
	        : observableThrowError(err)
	      )  
	    );
	}
  	loginUser(user) {
	    return this.http.post<any>(this._loginUrl, user).pipe(
	      catchError(err => err.code === 401 
	        ? observableThrowError(err)
	        : observableThrowError(err)
	      )  
	    );
	}
	loggedIn() {
	    return !!this.cookieService.get('token');
  	}
	loggeOut() {
	    return this.cookieService.delete('token');
  	}
	getToken() {
	    return this.cookieService.get('token');
	}
	getTokenWeb() {
	    return this.http.get('api/tokengetting', {
	      observe: 'body',
	      params: new HttpParams().append('token', this.cookieService.get('token'))
	    })
	}
	checkToken() {
		return this.http.get('api/tokengetting');
	}
}
