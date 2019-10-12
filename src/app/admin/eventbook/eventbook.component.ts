import { Component, OnInit } from '@angular/core';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventbook',
  templateUrl: './eventbook.component.html',
  styleUrls: ['./eventbook.component.css']
})
export class EventbookComponent implements OnInit {

  getFormDet = [];
  adminform: FormGroup;
  constructor(
  	private fb: FormBuilder,
  	private _getFormService: GetformdetailsService
  ) { }

  ngOnInit() {
  	this._getFormService.geteventDetails()
  	.subscribe(
  		res => {
  			for(let i=0; i<res.length; i++) {
				var x = res[i].date.split('T');
				res[i].date = x[0];
			}
  			for(let i=0; i<res.length; i++) {
				var x = res[i].stime.split('T');
				var y = x[1].split(':');
				res[i].stime = y[0]+':'+y[1];
			}
  			this.getFormDet = res;
  			console.log(res);
      	},
      	err => {
	        console.log(err);
      	}
  	);
  	this.adminform = this.fb.group({
      ORDER_ID: ['', []]
    });
  }

  get aform() { return this.adminform.controls; }

  approvePayment(event) {
  	this.adminform = this.fb.group({
      ORDER_ID: [event.target.id, [
  	    Validators.required
  	  ]]
    });
  	console.log(this.adminform.value);
  	this._getFormService.posteventApprove(this.adminform.value)
  	.subscribe(
      	res => {
      		this._getFormService.geteventDetails()
		  	.subscribe(
		  		res => {
		  			for(let i=0; i<res.length; i++) {
						var x = res[i].date.split('T');
						res[i].date = x[0];
					}
		  			for(let i=0; i<res.length; i++) {
						var x = res[i].stime.split('T');
						var y = x[1].split(':');
						res[i].stime = y[0]+':'+y[1];
					}
		  			this.getFormDet = res;
		      	},
		      	err => {
			        console.log(err);
		      	}
		  	);
      	},
      	err => {
          	console.log(err);;
      	}
  	)
  }

}
