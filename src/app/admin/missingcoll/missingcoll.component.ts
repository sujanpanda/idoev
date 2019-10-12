import { Component, OnInit } from '@angular/core';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';

@Component({
  selector: 'app-missingcoll',
  templateUrl: './missingcoll.component.html',
  styleUrls: ['./missingcoll.component.css']
})
export class MissingcollComponent implements OnInit {

  getMissDet = [];
  constructor(
  	private _getFormService: GetformdetailsService
  ) { }

  ngOnInit() {
  	this._getFormService.getmissingDetails()
  	.subscribe(
  		res => {
    			for(let i=0; i<res.length; i++) {
    				var x = res[i].date.split('T');
    				res[i].date = x[0];
    			}
    			this.getMissDet = res;
    	},
    	err => {
        console.log(err);
    	}
  	);
  }

}
