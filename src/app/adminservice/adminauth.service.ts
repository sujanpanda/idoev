import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthService {

  	private _adminLoginUrl = "api/adminlogin";
  	constructor(
	  	private http: HttpClient,
	  	private _router: Router,
	  	private cookieService: CookieService
  	) { }

  	loginUser(adminUser) {
	    return this.http.post<any>(this._adminLoginUrl, adminUser).pipe(
	      catchError(err => err.code === 401 
	        ? observableThrowError(err)
	        : observableThrowError(err)
	      )  
	    );
	}

	loggedIn() {
	    return !!this.cookieService.get('admintk');
  	}
	loggeOut() {
	    return this.cookieService.delete('token');
	    return this.cookieService.delete('admintk');
	    return this.cookieService.delete('usertype');
  	}
	getToken() {
	    return this.cookieService.get('admintk');
	}
	getTokenWeb() {
	    return this.http.get('api/admingetting', {
	      observe: 'body',
	      params: new HttpParams().append('admintk', this.cookieService.get('admintk'))
	    })
	}
	checkToken() {
		return this.http.get('api/admingetting');
	}

}
