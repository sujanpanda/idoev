import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  mobView:boolean = false;
  idoEvErrMsg: string;
  idoEvForm: FormGroup;
  constructor(
    private deviceService: DetectmobileService,
  	private _router: Router,
    private fb: FormBuilder,
    private _contact: ContactService,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
      this.mobView = true;
      document.getElementById("logo_wrap").classList.remove("expand_logo");
    } else {
      //desktop here..
      this.mobView = false;
    }
  	this.idoEvForm = this.fb.group({
        name: ['', [
	        Validators.required,
	        Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/),
	        Validators.minLength(3)
      	]],
        email: ['', [
	        Validators.required,
	        Validators.email
      	]],
      	mobile: ['', [
            Validators.required,
            Validators.pattern(/[0-9]/),
            Validators.minLength(10),
            Validators.maxLength(10)
      	]],
      	message: ['', [
          	Validators.required,
          	Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
        ]]
    });
  }

  get ideform() { return this.idoEvForm.controls; }

  contactFunc() {
    document.getElementById("formBtn").setAttribute("disabled", "");
    if(this.idoEvForm.valid){
  	  document.getElementById("formBtn").setAttribute("disabled", "");
  	  this._contact.contactUser(this.idoEvForm.value)
      .subscribe(
          res => {
              this.snackbar.open("Thanks for Contact us. We will get back to you soon.", null, {duration:5000,panelClass: ['blue-snackbar']});
              document.getElementById("formBtn").setAttribute("disabled", "");
              this._router.navigate(['/home']);
          },
          err => {
              document.getElementById("formBtn").removeAttribute("disabled");
              this.idoEvErrMsg = err.error
              setTimeout(()=>{
                  this.idoEvErrMsg = '';
              }, 8000);
          }
      )
    } else {
      	document.getElementById("formBtn").removeAttribute("disabled");
    }
  }

}
