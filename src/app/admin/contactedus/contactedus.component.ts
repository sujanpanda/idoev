import { Component, OnInit } from '@angular/core';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';

@Component({
  selector: 'app-contactedus',
  templateUrl: './contactedus.component.html',
  styleUrls: ['./contactedus.component.css']
})
export class ContactedusComponent implements OnInit {

  getFormDet = [];
  constructor(
  	private _getFormService: GetformdetailsService
  ) { }

  ngOnInit() {
  	this._getFormService.getFormDetails()
  	.subscribe(
  		res => {
  			this.getFormDet = res;
      	},
      	err => {
	        console.log(err);
      	}
  	);
  }

}
