import { Component, OnInit } from '@angular/core';
import { EditvenueService } from '../../adminservice/editvenue.service';

@Component({
  selector: 'app-editvenue',
  templateUrl: './editvenue.component.html',
  styleUrls: ['./editvenue.component.css']
})
export class EditvenueComponent implements OnInit {

  venuList = [];
  constructor(
  	private _editService: EditvenueService
  ) { }

  ngOnInit() {
  	this._editService.getEventsList()
  	.subscribe(
  		res => {
  			this.venuList = res;
      	},
      	err => {
	        console.log(err);
      	}
  	);
  }

}
