import { Component, OnInit } from '@angular/core';
import { AddcityService } from '../../adminservice/addcity.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  adminform: FormGroup;
  ctList = [];
  errorMsg: string;
  successMsg: string;
  cityAddData = {};
  constructor(
  	private _ctAddService: AddcityService,
  	private fb: FormBuilder
  ) { }

  ngOnInit() {
  	this._ctAddService.getAllCities()
    .subscribe(
      res => {
        this.ctList = res;
      },
      err => {
        console.log(err);
      }
    );
    this.adminform = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      id: [0, [
        Validators.required
      ]]
    });
  }

  get aform() { return this.adminform.controls; }

  adCity() {
  	document.getElementById("adminbtn").setAttribute("disabled", "");
  	if(this.adminform.valid){
  		this.cityAddData = this.adminform.value;
  		console.log(this.cityAddData);
  		this._ctAddService.addCity(this.adminform.value)
  		.subscribe(
          	res => {
            	document.getElementById("adminbtn").removeAttribute("disabled");
            	this.adminform.reset({});
            	this.successMsg = "Your City added successfully";
            	setTimeout(() => {
                	this.successMsg = '';
            	}, 8000);
            	this._ctAddService.getAllCities()
    			    .subscribe(
    			      res => {
    			        this.ctList = res;
    			      },
    			      err => {
    			        console.log(err);
                }
              );
          	},
          	err => {
              	document.getElementById("adminbtn").removeAttribute("disabled");
              	this.errorMsg = err.error
              	setTimeout(() => {
                  	this.errorMsg = '';
              	}, 8000);
              	console.log(err);
          }
      )
  	} else {
  		document.getElementById("adminbtn").removeAttribute("disabled");
  	}
  }

}
