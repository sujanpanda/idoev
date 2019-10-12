import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../services/payment.service';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  mobView:boolean = false;
  respBoolean:boolean = false;
  respID = {}
  constructor(
    private deviceService: DetectmobileService,
    private _payService: PaymentService,
  	private _router: Router
  ) { }

  ngOnInit() {

    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
      this.mobView = true;
    } else {
      //desktop here
      this.mobView = false;
    }
    var thisUrl = this._router.url;
    var splitUrl = thisUrl.split('/');
    this._payService.getResponseDetail(splitUrl[2])
    .subscribe(
      res => {
        if(res.bookStatus === "paid") {
          this.respID = res;
          this.respBoolean = true;
        }
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/404']);
          }
        }
      }
    );
  }

}

