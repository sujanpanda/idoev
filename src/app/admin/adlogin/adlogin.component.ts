import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from'@angular/router';
import { AdminauthService } from '../../adminservice/adminauth.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-adlogin',
  templateUrl: './adlogin.component.html',
  styleUrls: ['./adlogin.component.css']
})
export class AdloginComponent implements OnInit {
  hide:boolean = false;
  loginUserData = {}
  errorMsg: string;
  adminForm: FormGroup;
  constructor(
  	private deviceService: DetectmobileService,
  	private _router: Router,
  	private fb: FormBuilder,
  	private _auth: AdminauthService,
  	private cookieService: CookieService
  ) { }

  ngOnInit() {
  	var isMobile = this.deviceService.detectMob();
  	if(isMobile) {
  		this._router.navigate(['/home']);
  	}
  	this.adminForm = this.fb.group({
	  	userid: ['', [
	        Validators.required
	  	]],
	  	password: ['', [
	        Validators.required
	  	]]
	});
  }
  get lform() { return this.adminForm.controls; }

  loginUser() {
    document.getElementById("loginbtn").setAttribute("disabled", "");
  	if(this.adminForm.valid){
  		this.loginUserData = this.adminForm.value;
  		this._auth.loginUser(this.loginUserData)
  		.subscribe(
	        res => {
            	document.getElementById("loginbtn").removeAttribute("disabled");
	          	this.cookieService.set('admintk', res.admintk, 1);
	          	this.cookieService.set('usertype', res.usertype, 1);
	          	this._router.navigate(['/idostar/city']);
	        },
	        err => {
              document.getElementById("loginbtn").removeAttribute("disabled");
	          	this.errorMsg = err.error
	          	setTimeout(()=>{
	                this.errorMsg = '';
	          	}, 8000);
	        }
      	)
  	} else {
      document.getElementById("loginbtn").removeAttribute("disabled");
    }
  }

}
