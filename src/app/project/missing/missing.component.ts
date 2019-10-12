import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CityService } from '../../services/city.service';
import { VenuesService } from '../../services/venues.service';
import { ReportmissService } from '../../services/reportmiss.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.css']
})
export class MissingComponent implements OnInit {

  mobView:boolean = false;
  ctDetail = [];
  vnuDetail = [];
  idoEvErrMsg: string;
  idoEvForm: FormGroup;
  cityForm: FormGroup;
  todaydate:Date = new Date();

  constructor(
    private deviceService: DetectmobileService,
  	private _cityLst: CityService,
  	private _venueLst: VenuesService,
  	private _router: Router,
    private fb: FormBuilder,
    private _rpService: ReportmissService,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
      this.mobView = true;
      document.getElementById("logo_wrap").classList.remove("expand_logo");
    } else {
      //desktop here
      this.mobView = false;
    }
  	this._cityLst.getCityList()
    .subscribe(
      res => {
        var result = Object.keys(res).map(function(key) {
          return [Number(key), res[key]];
        });
        this.ctDetail = result;
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/404']);
          }
        }
      }
    );
  	this._venueLst.getCityList()
    .subscribe(
      res => {
        var result = Object.keys(res).map(function(key) {
          return [Number(key), res[key]];
        });
        this.vnuDetail = result;
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/404']);
          }
        }
      }
    );
    this.idoEvForm = this.fb.group({
        city: ['', [
            Validators.required
      	]],
        venue: ['', [
          	Validators.required
        ]],
        item: ['', [
          	Validators.required,
          	Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
        ]],
        date: ['', [
          	Validators.required
        ]],
        email: ['', [
	        Validators.required,
	        Validators.email
      	]],
      	message: ['', [
          	Validators.required,
          	Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
        ]]
    });

  }

  get ideform() { return this.idoEvForm.controls; }

  missingReportFunc() {
    document.getElementById("formBtn").setAttribute("disabled", "");
    if(this.idoEvForm.valid){
  	  document.getElementById("formBtn").setAttribute("disabled", "");
  	  var dt = new Date(this.idoEvForm.value.date);
      dt.setHours( dt.getHours() + 6 );
  	  this.idoEvForm.value.date = dt.toISOString();
  	  this._rpService.missingReportFunc(this.idoEvForm.value)
      .subscribe(
          res => {
              this.snackbar.open("We have reciept your request. We will get back to you soon.", null, {duration:5000,panelClass: ['blue-snackbar']});
              document.getElementById("formBtn").setAttribute("disabled", "");
              this._router.navigate(['/dashboard']);
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

  selectionChange() {
    this._cityLst.getvenueByCt(this.idoEvForm.value)
  	.subscribe(
      res => {
      	var result = Object.keys(res).map(function(key) {
          	return [Number(key), res[key]];
        });
    	this.vnuDetail = result;
    	this.idoEvForm.reset({
    		city: this.idoEvForm.value.city
    	});
      },
      err => {
          console.log(err);
      }
    )
  }
}
