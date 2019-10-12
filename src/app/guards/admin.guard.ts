import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminauthService } from '../adminservice/adminauth.service';

@Injectable()
export class AdminGuard implements CanActivate  {
  constructor(
  	private _authService: AdminauthService,
  	private _router: Router
  ) {}
  canActivate(): boolean {
  	if(this._authService.loggedIn()){
  		return true
  	}
  	else {
  		this._router.navigate(['/login'])
  		return false
  	}
  }
}
