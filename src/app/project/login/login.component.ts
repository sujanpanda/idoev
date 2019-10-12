import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from'@angular/router';
import { AuthService } from '../../services/auth.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mobView:boolean = false;
  loginUserData = {}
  errorMsg: string;
  loginForm: FormGroup;
  constructor(
    private deviceService: DetectmobileService,
  	private _router: Router,
  	private fb: FormBuilder,
  	private _auth: AuthService,
  	private cookieService: CookieService
	) { }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
      this.mobView = true;
      if (window.location.href.indexOf('/login') > 0) {
        document.getElementById("logo_wrap").classList.add("expand_logo");
      }
    } else {
      //desktop here..
      this.mobView = false;
    }
    this.loginForm = this.fb.group({
      	email: ['', [
	        Validators.required,
	        Validators.email
      	]],
      	password: ['', [
	        Validators.required,
	        Validators.pattern(/^\S+$/),
	        Validators.minLength(6)
      	]]
    });
  }
  get lform() { return this.loginForm.controls; }

  loginUser() {
    document.getElementById("loginbtn").setAttribute("disabled", "");
  	if(this.loginForm.valid){
  		this.loginUserData = this.loginForm.value;
  		this._auth.loginUser(this.loginUserData)
  		.subscribe(
	        res => {
              document.getElementById("loginbtn").removeAttribute("disabled");
	          	this.cookieService.set('token', res.token, 1);
	          	this._router.navigate(['/dashboard']);
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
