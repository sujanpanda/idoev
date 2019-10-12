import { Component, OnInit } from '@angular/core';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  getFormDet = [];
  constructor(
  	private _getFormService: GetformdetailsService
  ) { }

  ngOnInit() {
  	this._getFormService.getFeedbacksDetails()
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
