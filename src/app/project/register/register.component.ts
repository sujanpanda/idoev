import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from'@angular/router';
import { AuthService } from '../../services/auth.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mobView:boolean = false;
  registerUserData = {};
  errorMsg: string;
  registerForm: FormGroup;
  constructor(
    private deviceService: DetectmobileService,
  	private _router: Router,
  	private fb: FormBuilder,
  	private _auth: AuthService,
  	private cookieService: CookieService
  ) { }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/),
        Validators.minLength(3)
      ]],
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
    if(isMobile) {
      this.mobView = true;
    	document.getElementById("logo_wrap").classList.add("expand_logo");
    } else {
      // desktop here...
      this.mobView = false;
    }
  }
  get rform() { return this.registerForm.controls; }

  registerUser() {
  	document.getElementById("registerbtn").setAttribute("disabled", "");
  	if(this.registerForm.valid){
  		this.registerUserData = this.registerForm.value;
  		this._auth.registerUser(this.registerUserData)
  		.subscribe(
	        res => {
              document.getElementById("registerbtn").removeAttribute("disabled");
	          	this.cookieService.set('token', res.token, 1);
	          	this._router.navigate(['/dashboard']);
	        },
	        err => {
	        	document.getElementById("registerbtn").removeAttribute("disabled");
	          	this.errorMsg = err.error
	          	setTimeout(()=>{
	                this.errorMsg = '';
	          	}, 8000);
	        }
      	)
  	} else {
  		document.getElementById("registerbtn").removeAttribute("disabled");
  	}
  }
}
