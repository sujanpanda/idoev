import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { Router } from '@angular/router';
import { MydetailService } from '../../services/mydetail.service';
import { PayhistoryService } from '../../services/payhistory.service';

@Component({
  selector: 'app-bookhistory',
  templateUrl: './bookhistory.component.html',
  styleUrls: ['./bookhistory.component.css']
})
export class BookhistoryComponent implements OnInit {
  
  mobView:boolean = false;
  bookingBoolean:boolean = false;
  bookResult:boolean = false;
  bookHisDet = [];
  constructor(
    private deviceService: DetectmobileService,
  	private _mydetailService: MydetailService,
  	private _payhistoryService: PayhistoryService,
  	private _router: Router
  ) { }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
      this.mobView = true;
      document.getElementById("logo_wrap").classList.remove("expand_logo");
    } else {
      //desktop here
      this.mobView = false;
    }
  	
  	this._mydetailService.getUserDetail()
  	.subscribe(
  		res => {
  			this._payhistoryService.getPayHistory(res.email)
  			.subscribe(
  				res => {
  					this.bookHisDet = res;
  					if(this.bookHisDet[0]) {
  						this.bookingBoolean = true;
  						this.bookResult = true;
              for(let i=0; i<this.bookHisDet.length; i++) {
                var dt = this.bookHisDet[i].date.substring(0, 10).split('-');
                this.bookHisDet[i].date = parseInt(dt[2])+1+'/'+dt[1]+'/'+dt[0];

                var startTimeISOString = this.bookHisDet[i].stime;

                var startTime = new Date(startTimeISOString);
                startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset()));
                var stTime = startTime.toString().split(' ');
                var H = +stTime[4].substr(0, 2);
                var h = H % 12 || 12;
                var ampm = (H < 12 || H === 24) ? " AM" : " PM";
                stTime[4] = h + stTime[4].substr(2, 3) + ampm;
                this.bookHisDet[i].stime = stTime[4];
              }
              
  					} else {
  						this.bookingBoolean = true;
  						this.bookResult = false;
  					}
  				},
  				err => {
  					this.bookingBoolean = true;
  					console.log(err);
  				}
  			);
  		},
  		err => {
  			this._router.navigate(['/404']);
  		}
  	);
  }

}
