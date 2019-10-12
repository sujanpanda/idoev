import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CityService } from '../../services/city.service';
import { EditvenueService } from '../../adminservice/editvenue.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-editvenuedetail',
  templateUrl: './editvenuedetail.component.html',
  styleUrls: ['./editvenuedetail.component.css']
})
export class EditvenuedetailComponent implements OnInit {

  venueDetail = [];
  disableSelect:boolean = false;
  adminform: FormGroup;
  imageChangedEvent: any = '';
  ctDetail = [];
  ctList = [];
  chEvent = [];
  errorMsg: string;
  successMsg: string;
  cityAddData = {};
  ownerImgErr: string;
  venueImgErr: string;
  venuId:string;
  constructor(
  	private _editVenueService: EditvenueService,
  	private _router: Router,
  	private fb: FormBuilder,
  	private _cityLst: CityService
  ) { }

  ngOnInit() {
  	var rtUrl = this._router.url.split('/');
  	this._editVenueService.getVenueDetail(rtUrl[3])
  	.subscribe(
  		res => {
  			if(res.msge != "found") {
  				this._router.navigate(['/404']);
  			} else {
  				this.venueDetail = res.data[0];
  				this.venuId = res.data[0]._id;
  			}
  		},
  		err => {
  			this._router.navigate(['/404']);
  		}
	);
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
    this._editVenueService.getEventType()
    .subscribe(
      res => {
        this.chEvent = res;
      },
      err => {
        this._router.navigate(['/404']);
      }
    );
    forkJoin(this._editVenueService.getVenueDetail(rtUrl[3])
    ).subscribe((data) => {
    	if(data[0].data[0].type.includes("all")) {
    		this.disableSelect = true;
    	}
      	this.adminform = this.fb.group({
	      id: [data[0].data[0].id, [
		    Validators.required
		  ]],
		  name: [data[0].data[0].name, [
		    Validators.required
		  ]],
		  city: [data[0].data[0].city, [
		    Validators.required
		  ]],
		  owner: [data[0].data[0].owner, [
		    Validators.required
		  ]],
		  detail: [data[0].data[0].detail, [
		    Validators.required,
	      	Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
		  ]],
		  baseprice: [data[0].data[0].baseprice, [
		    Validators.required,
		    Validators.pattern(/[0-9]/)
		  ]],
		  type: [data[0].data[0].type, [
		    Validators.required
		  ]]
	    });
    });
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
  		this._editVenueService.editVenue(this.adminform.value)
      	.subscribe(
	      	res => {
	      		this.successMsg = "Updated successfully."
	      		setTimeout(()=>{
	      			this._router.navigate(['/idostar/venuephoto/'+this.venuId]);
	      		}, 2000);
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
