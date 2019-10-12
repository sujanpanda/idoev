import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AdminauthService } from './adminauth.service';

@Injectable()
export class AdminInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
  	let authService = this.injector.get(AdminauthService)
  	let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
        // Authorization: 'Bearer xx.yy.zz'
      }
  	})
  	return next.handle(tokenizedReq)
  }

}
