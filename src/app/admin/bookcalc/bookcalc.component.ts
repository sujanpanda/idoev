import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BookcalcService } from '../../adminservice/bookcalc.service';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bookcalc',
  templateUrl: './bookcalc.component.html',
  styleUrls: ['./bookcalc.component.css']
})
export class BookcalcComponent implements OnInit {

  disableSelect:boolean = false;
  adminform: FormGroup;
  getBkCalc = [];
  errorMsg: string;
  successMsg: string;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
  	private _bookcalcService: BookcalcService
  ) { }

  ngOnInit() {
    var rtUrl = this._router.url.split('/');
  	this._bookcalcService.getBookCalc(rtUrl[3])
  	.subscribe(
  		res => {
  			this.getBkCalc = res[0];
    	},
    	err => {
        console.log(err);
    	}
  	);
    this.adminform = this.fb.group({
      venuid: [rtUrl[3], [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      djprice: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      mikeprice: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      projectorprice: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      breaknorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      lunchnorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      dinnorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      snacknorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      tnbevrnorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      breaksemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      lunchsemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      dinsemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      snacksemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      tnbevrsemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      breakdlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      lunchdlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      dindlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      snackdlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      tnbevrdlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      lightnorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      lightsemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      lightdlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      flowernorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      flowersemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      flowerdlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      seatnorm: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      seatsemi: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      seatdlx: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]],
      addNonveg: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
      ]]
    });
    forkJoin(this._bookcalcService.getBookCalc(rtUrl[3])
    ).subscribe((data) => {
      if(data[0][0] != undefined) {
        this.adminform = this.fb.group({
            venuid: [rtUrl[3], [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            djprice: [data[0][0].djprice, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            mikeprice: [data[0][0].mikeprice, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            projectorprice: [data[0][0].projectorprice, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            breaknorm: [data[0][0].breaknorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            lunchnorm: [data[0][0].lunchnorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            dinnorm: [data[0][0].dinnorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            snacknorm: [data[0][0].snacknorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            tnbevrnorm: [data[0][0].tnbevrnorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            breaksemi: [data[0][0].breaksemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            lunchsemi: [data[0][0].lunchsemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            dinsemi: [data[0][0].dinsemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            snacksemi: [data[0][0].snacksemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            tnbevrsemi: [data[0][0].tnbevrsemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            breakdlx: [data[0][0].breakdlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            lunchdlx: [data[0][0].lunchdlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            dindlx: [data[0][0].dindlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            snackdlx: [data[0][0].snackdlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            tnbevrdlx: [data[0][0].tnbevrdlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            lightnorm: [data[0][0].lightnorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            lightsemi: [data[0][0].lightsemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            lightdlx: [data[0][0].lightdlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            flowernorm: [data[0][0].flowernorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            flowersemi: [data[0][0].flowersemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            flowerdlx: [data[0][0].flowerdlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            seatnorm: [data[0][0].seatnorm, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            seatsemi: [data[0][0].seatsemi, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            seatdlx: [data[0][0].seatdlx, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]],
            addNonveg: [data[0][0].addNonveg, [
              Validators.required,
              Validators.pattern(/[0-9]/)
            ]]
        });
      }
    });
  }

  get aform() { return this.adminform.controls; }

  adBookCalc() {
    document.getElementById("adminbtn").setAttribute("disabled", "");
    if(this.adminform.valid){
      document.getElementById("adminbtn").removeAttribute("disabled");
      this._bookcalcService.bookCalc(this.adminform.value)
      .subscribe(
        res => {
          if(res.msg == "Updated") {
            this.successMsg = "Calculation Added";
          }
          setTimeout(()=>{
            this.successMsg = "";
            this._router.navigate(['/idostar/editvenue']);
          }, 5000);
        },
        err => {
          this.errorMsg = err;
        }
      );
    } else {
      document.getElementById("adminbtn").removeAttribute("disabled");
    }
  }

  updBookCalc() {
    document.getElementById("adminbtn").setAttribute("disabled", "");
    if(this.adminform.valid){
      document.getElementById("adminbtn").removeAttribute("disabled");
      this._bookcalcService.bookCalcupdate(this.adminform.value)
      .subscribe(
        res => {
          if(res.msg == "Updated") {
            this.successMsg = "Calculation Updated";
          }
          setTimeout(()=>{
            this.successMsg = "";
            this._router.navigate(['/idostar/editvenue']);
          }, 5000);
        },
        err => {
          this.errorMsg = err;
        }
      );
    } else {
      document.getElementById("adminbtn").removeAttribute("disabled");
    }
  }
}
