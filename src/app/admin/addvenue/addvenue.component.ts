import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CityService } from '../../services/city.service';
import { AddvenueService } from '../../adminservice/addvenue.service';


@Component({
  selector: 'app-addvenue',
  templateUrl: './addvenue.component.html',
  styleUrls: ['./addvenue.component.css']
})
export class AddvenueComponent implements OnInit {

  disableSelect:boolean = false;
  adminform: FormGroup;
  ctDetail = [];
  ctList = [];
  chEvent = [];
  errorMsg: string;
  successMsg: string;
  cityAddData = {};
  ownerImgErr: string;
  venueImgErr: string;
  constructor(
  	private fb: FormBuilder,
  	private _router: Router,
  	private _cityLst: CityService,
  	private _addVenService: AddvenueService
  ) { }

  ngOnInit() {
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
    this._addVenService.getEventsList()
    .subscribe(
      res => {
        this.chEvent = res;
      },
      err => {
        this._router.navigate(['/404']);
      }
    );
  	this.adminform = this.fb.group({
      id: [0, [
  	    Validators.required
  	  ]],
  	  name: ['', [
  	    Validators.required
  	  ]],
  	  city: ['', [
  	    Validators.required
  	  ]],
  	  owner: ['', [
  	    Validators.required
  	  ]],
  	  detail: ['', [
  	    Validators.required,
        	Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
  	  ]],
  	  baseprice: ['', [
  	    Validators.required,
  	    Validators.pattern(/[0-9]/)
  	  ]],
  	  type: ['', [
  	    Validators.required
  	  ]]
    });
  }

  get aform() { return this.adminform.controls; }

  eventChange(event) {
  	if(event.value.includes("all")) {
  		event.value = ["all"];
  		this.disableSelect = true;
  	} else {
  		this.disableSelect = false;
  	}
  }

  adVenue() {
  	document.getElementById("adminbtn").setAttribute("disabled", "");
  	if(this.adminform.valid){
  		document.getElementById("adminbtn").removeAttribute("disabled");
  		this._addVenService.addNewVenue(this.adminform.value)
      	.subscribe(
	      	res => {
	      		this._router.navigate(['/idostar/venuephoto/'+res]);
	      	},
	      	err => {
	          	document.getElementById("adminbtn").removeAttribute("disabled");
	          	this.errorMsg = err.error
	          	setTimeout(()=>{
	              	this.errorMsg = '';
	          	}, 8000);
	      	}
      	)
  	} else {
  		document.getElementById("adminbtn").removeAttribute("disabled");
  	}
  }

}
