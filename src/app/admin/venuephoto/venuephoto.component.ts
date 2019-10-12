import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AddvenueService } from '../../adminservice/addvenue.service';

@Component({
  selector: 'app-venuephoto',
  templateUrl: './venuephoto.component.html',
  styleUrls: ['./venuephoto.component.css']
})
export class VenuephotoComponent implements OnInit {

  adminform: FormGroup;
  selectedFile:File = null;
  imgErr:string; 
  errorMsg:string;
  successMsg:string;
  routerNext:string;
  constructor(
  	private fb: FormBuilder,
  	private _router: Router,
  	private _addVenService: AddvenueService
  ) { }

  ngOnInit() {
  	var rtUrl = this._router.url.split('/');
  	this.routerNext = rtUrl[3];
  	this._addVenService.checkVenue(rtUrl[3])
  	.subscribe(
  		res => {
  			if(res.msge != "found") {
  				this._router.navigate(['/404']);
  			}
    	},
    	err => {
        this._router.navigate(['/404']);
    	}
  	);
  	this.adminform = this.fb.group({
      id: [rtUrl[3], [
	    Validators.required
	  ]],
	  upfile: []
    });
  }

  get aform() { return this.adminform.controls; }

  fileChangeEvent(event) {
      if(event.target.files.length > 0) {
      	var input = event.target;
      	for ( var i=0; i<input.files.length; i++ ) {
      		var ext = input.files[i].name.substring(input.files[i].name.lastIndexOf('.')+1).toLowerCase();
      		if(ext == 'jpg' || ext == 'png') {
      			this.imgErr = "";
      			this.selectedFile = <File>event.target.files[0];
      		} else {
      			this.imgErr = "Please upload a valid image";
      			input.value = "";
      			this.selectedFile = null;
      		}
      	}
      }
  }

  advenPhoto() {
  	document.getElementById("adminbtn").setAttribute("disabled", "");
  	if(this.adminform.valid && this.selectedFile!= null){
  		document.getElementById("adminbtn").removeAttribute("disabled");
  		const fd = new FormData();
      	fd.append("filename", this.selectedFile);
      	fd.append("id", this.adminform.get('id').value);
  		this._addVenService.addVenueImg(fd)
      	.subscribe(
	      	res => {
	      		if(res.msg == "updated") {
	      			this._router.navigate(['/idostar/ownerphoto/'+this.routerNext]);
	      		} else {
	      			this.errorMsg = "Something went wrong. Please try again"
		          	setTimeout(()=>{
		              	this.errorMsg = '';
		          	}, 8000);
	      		}
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
