import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VenuedetailService } from '../../services/venuedetail.service';
import { BookingService } from '../../services/booking.service';
import { MydetailService } from '../../services/mydetail.service';
import { PaymentService } from '../../services/payment.service';
import { EvtypeService } from '../../services/evtype.service';
import { MatSnackBar } from '@angular/material';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bookevent',
  templateUrl: './bookevent.component.html',
  styleUrls: ['./bookevent.component.css']
})
export class BookeventComponent implements OnInit {

  mobView:boolean = false;
  venueDet = [];
  eventType = [];
  eventList = [];
  idoEvErrMsg: string;
  idoEvForm: FormGroup;
  todaydate:Date = new Date();
  bookForm = {};
  bookCalc = {};
  id: string;
  cityvalue: string;
  vnuvalue: string;

  basePrice:number;
  guestPrice:number = 1;
  guestNumb:number = 1;
  guestChair:number = 10;
  chairstr:number = 0;
  equipPrice:number = 0;
  djPrice:number = 0;
  mikePrice:number = 0;
  projectorPrice:number = 0;
  foodPrice:number = 0;
  breakfastPr:number = 0;
  lunchPr:number = 0;
  dinnerPr:number = 0;
  snacksPr:number = 0;
  teabevPr:number = 0;
  lunchNrm:number = 0;
  dinnerNrm:number = 0;
  lunchSemi:number = 0;
  dinnerSemi:number = 0;
  lunchDlx:number = 0;
  dinnerDlx:number = 0;
  addNonvg:number = 0;
  addVg:number = 0;
  lightPr:number = 0;
  lightNrm:number = 0;
  lightSemi:number = 0;
  lightDlx:number = 0;
  flwrPr:number = 0;
  flwrNrm:number = 0;
  flwrSemi:number = 0;
  flwrDlx:number = 0;
  seatPr:number = 0;
  seatNrm:number = 0;
  seatSemi:number = 0;
  seatDlx:number = 0;
  foodStr:number = 0;
  totalPrice:number;

  constructor(
    private deviceService: DetectmobileService,
  	private _router: Router,
  	private fb: FormBuilder,
    private _mydetailService: MydetailService,
    private _paymentService: PaymentService,
    private _evTypeService: EvtypeService,
    public snackbar: MatSnackBar,
  	private _venuedetailService: VenuedetailService,
  	private _bookingService: BookingService
  ) { }

  dtFilter = (d: Date): boolean => {
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    return (day !== this.todaydate.getDate() || month !== this.todaydate.getMonth()) && (day !== 15 || month !== 7) && (day !== 26 || month !== 0) && (year !== 2020);
  }


  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
      this.mobView = true;
      document.getElementById("logo_wrap").classList.remove("expand_logo");
    } else {
      //desktop here
      this.mobView = false;
    }

  	var pageUrl = this._router.url;
    var venId = pageUrl.split("/");
    this.id = venId[2];
  	this._venuedetailService.getStrictDetail(this.id)
    .subscribe(
      res => {
        this.venueDet = res;
        this.cityvalue = res.city;
        this.vnuvalue = res.name;
        this.basePrice = res.baseprice;
        this.totalPrice = res.baseprice;
        if(res.type[0] == "all") {
          this._evTypeService.getEventType()
          .subscribe(
            resp => {
              //this.eventType = resp.type;
              for(let i=0; i<resp.length; i++) {
                console.log(resp[i].type);
                this.eventList.push(resp[i].type);
              }
              this.eventType = this.eventList;
            },
            err => {
              if(err instanceof HttpErrorResponse) {
                if(err.status === 401 || err.status === 500) {
                  this._router.navigate(['/404']);
                }
              }
            }
          );
        } else {
          this.eventType = res.type;
        }
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
            this._router.navigate(['/404']);
          }
        }
      }
    );

    forkJoin(this._venuedetailService.getStrictDetail(this.id))
    .subscribe((data) => {
    	this.idoEvForm = this.fb.group({
    		city: [{value:data[0].city}, []],
    		cityshow: [{value:'', disabled: true},[]],
    		venue: [{value:data[0].name}, []],
    		venueshow: [{value:'', disabled: true},[]],
	        venuetype: ['', [
	            Validators.required
	      	]],
	      	guest: ['', [
	          	Validators.required,
	          	Validators.pattern(/[0-9]/),
              Validators.min(1)
	        ]],
	        date: ['', [
	          	Validators.required
	        ]],
	        stime: ['', [
	          	Validators.required
	        ]],
	        hours: ['', [
	          	Validators.required,
	          	Validators.pattern(/[0-9]/)
	        ]],
	        equip: ['', []],
	        food: ['', []],
	        foodgan: ['', []],
	        foodtype: ['', []],
	        lighting: ['', []],
	        flowers: ['', []],
	        seating: ['', []]
    	});
    	this.idoEvForm.patchValue({ 'city': this.cityvalue, 'cityshow': this.cityvalue, 'venue': this.vnuvalue, 'venueshow': this.vnuvalue });
    });

    this.idoEvForm = this.fb.group({
        city: [{value:this.cityvalue},[]],
        cityshow: [{value:this.cityvalue, disabled: true},[]],
        venue: [{value:this.vnuvalue},[]],
        venueshow: [{value:this.vnuvalue, disabled: true},[]],
        venuetype: ['', [
            Validators.required
      	]],
      	guest: ['', [
          	Validators.required,
          	Validators.pattern(/[0-9]/)
        ]],
        date: ['', [
          	Validators.required
        ]],
        stime: ['', [
          	Validators.required
        ]],
        hours: ['', [
          	Validators.required,
          	Validators.pattern(/[0-9]/)
        ]],
        equip: ['', []],
        food: ['', []],
        foodgan: ['', []],
        foodtype: ['', []],
        lighting: ['', []],
        flowers: ['', []],
        seating: ['', []]
    });

    this._bookingService.getBookingCalc(this.id)
    .subscribe(
      res => {
       	this.bookCalc = res[0];
        this.djPrice = res[0].djprice;
        this.mikePrice = res[0].mikeprice;
        this.projectorPrice = res[0].projectorprice;
        this.breakfastPr = res[0].breaknorm;
        this.lunchPr = res[0].lunchnorm;
        this.dinnerPr = res[0].dinnorm;
        this.snacksPr = res[0].snacknorm;
        this.teabevPr = res[0].tnbevrnorm;
        this.lunchNrm = res[0].lunchnorm;
        this.dinnerNrm = res[0].dinnorm;
        this.lunchSemi = res[0].lunchsemi;
        this.dinnerSemi= res[0].dinsemi;
        this.lunchDlx = res[0].lunchdlx;
        this.dinnerDlx= res[0].dindlx;
        this.addNonvg= res[0].addNonveg;
        this.lightPr= res[0].lightnorm;
        this.lightNrm= res[0].lightnorm;
        this.lightSemi= res[0].lightsemi;
        this.lightDlx= res[0].lightdlx;
        this.flwrPr= res[0].flowernorm;
        this.flwrNrm= res[0].flowernorm;
        this.flwrSemi= res[0].flowersemi;
        this.flwrDlx= res[0].flowerdlx;
        this.seatPr= res[0].seatnorm;
        this.seatNrm= res[0].seatnorm;
        this.seatSemi= res[0].seatsemi;
        this.seatDlx= res[0].seatdlx;
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

  guestNumber(eValue) {
    var eVal = parseInt(eValue);
    if(!isNaN(eVal)) {
      this.guestNumb = eVal;
      this.guestChair = eVal;
      this.callFood(this.foodStr);
      this.seatChange(this.chairstr);
      if(eVal<=10) {
        this.guestPrice = 1;
      } else {
        this.guestPrice = ~~(eVal / 10);
      }
      this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
    }
  }

  callEquip(eq) {
    if(eq.length>0) {
      if(eq.includes("dj")) {
        this.equipPrice = this.djPrice;
      } if(eq.includes("mike")) {
        this.equipPrice = this.mikePrice;
      } if(eq.includes("projector")) {
        this.equipPrice = this.projectorPrice;
      } if(eq.includes("dj") && eq.includes("mike")) {
        this.equipPrice = this.djPrice + this.mikePrice;
      } if(eq.includes("dj") && eq.includes("projector")) {
        this.equipPrice = this.djPrice + this.projectorPrice;
      } if(eq.includes("mike") && eq.includes("projector")) {
        this.equipPrice = this.mikePrice + this.projectorPrice;
      } if(eq.includes("dj") && eq.includes("mike") && eq.includes("projector")) {
        this.equipPrice = this.djPrice + this.mikePrice + this.projectorPrice;
      }
    } else {
      this.equipPrice = 0;
    }
    this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
  }

  callFood(fd) {
    this.foodStr = fd;
    if(fd.length>0) {
      if(fd.includes("breakfast")) {
        this.foodPrice = this.breakfastPr*this.guestNumb;
      }
      if(fd.includes("lunch")) {
        this.foodPrice = (this.lunchPr*this.guestNumb) + this.addVg;
      }
      if(fd.includes("dinner")) {
        this.foodPrice = (this.dinnerPr*this.guestNumb) + this.addVg;
      }
      if(fd.includes("snacks")) {
        this.foodPrice = this.snacksPr*this.guestNumb;
      }
      if(fd.includes("teabev")) {
        this.foodPrice = this.teabevPr*this.guestNumb;
      }
      if(fd.includes("breakfast") && fd.includes("lunch")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg;
      }
      if(fd.includes("breakfast") && fd.includes("dinner")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.dinnerPr*this.guestNumb) + this.addVg;
      }
      if(fd.includes("breakfast") && fd.includes("snacks")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.snacksPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("lunch") && fd.includes("dinner")) {
        this.foodPrice = (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg;
      }
      if(fd.includes("lunch") && fd.includes("snacks")) {
        this.foodPrice = (this.lunchPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb);
      }
      if(fd.includes("lunch") && fd.includes("teabev")) {
        this.foodPrice = (this.lunchPr*this.guestNumb) + this.addVg + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("dinner") && fd.includes("snacks")) {
        this.foodPrice = (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb);
      }
      if(fd.includes("dinner") && fd.includes("teabev")) {
        this.foodPrice = (this.dinnerPr*this.guestNumb) + this.addVg + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("snacks") && fd.includes("teabev")) {
        this.foodPrice = (this.snacksPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("dinner")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg;
      }
      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("snacks")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("dinner") && fd.includes("snacks")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("dinner") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.dinnerPr*this.guestNumb) + this.addVg + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("snacks") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.snacksPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("lunch") && fd.includes("dinner") && fd.includes("snacks")) {
        this.foodPrice = (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb);
      }
      if(fd.includes("lunch") && fd.includes("dinner") && fd.includes("teabev")) {
        this.foodPrice = (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("dinner") && fd.includes("snacks") && fd.includes("teabev")) {
        this.foodPrice = (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }

      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("dinner") && fd.includes("snacks")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("dinner") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("dinner") && fd.includes("snacks") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("snacks") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("dinner") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("lunch") && fd.includes("dinner") && fd.includes("snacks") && fd.includes("teabev")) {
        this.foodPrice = (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }
      if(fd.includes("breakfast") && fd.includes("lunch") && fd.includes("dinner") && fd.includes("snacks") && fd.includes("teabev")) {
        this.foodPrice = (this.breakfastPr*this.guestNumb) + (this.lunchPr*this.guestNumb) + this.addVg + (this.dinnerPr*this.guestNumb) + this.addVg + (this.snacksPr*this.guestNumb) + (this.teabevPr*this.guestNumb);
      }
    } else {
      this.foodPrice = 0;
    }
    this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
  }

  foodType(ft) {
    if(ft == "normal") {
      this.lunchPr = this.lunchNrm + this.addVg;
      this.dinnerPr = this.dinnerNrm + this.addVg;
    } if (ft == "semi") {
      this.lunchPr = this.lunchSemi + this.addVg;
      this.dinnerPr = this.dinnerSemi + this.addVg;
    } if (ft == "delux") {
      this.lunchPr = this.lunchDlx + this.addVg;
      this.dinnerPr = this.dinnerDlx + this.addVg;
    }
    this.callFood(this.foodStr);
    this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
  }

  radioChange(rdc) {
    if(rdc == "veg") {
      this.addVg = 0;
    } if(rdc == "nonveg") {
      this.addVg = this.addNonvg;
    }
    this.callFood(this.foodStr);
    this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
  }

  lightChange(light) {
    if(light == "normal") {
      this.lightPr = this.lightNrm;
    } if(light == "semi") {
      this.lightPr = this.lightSemi;
    } if(light == "delux") {
      this.lightPr = this.lightDlx;
    }
    this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
  }

  flowerChange(flower) {
    if(flower == "normal") {
      this.flwrPr = this.flwrNrm;
    } if(flower == "semi") {
      this.flwrPr = this.flwrSemi;
    } if(flower == "delux") {
      this.flwrPr = this.flwrDlx;
    }
    this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
  }

  seatChange(seat) {
    this.chairstr = seat;
    if(seat == "normal") {
      this.seatPr = this.seatNrm*this.guestChair;
    } if(seat == "semi") {
      this.seatPr = this.seatSemi*this.guestChair;
    } if(seat == "delux") {
      this.seatPr = this.seatDlx*this.guestChair;
    }
    this.totalPrice = this.calcPrice(this.guestPrice, this.basePrice, this.equipPrice, this.foodPrice, this.lightPr, this.flwrPr, this.seatPr);
  }

  calcPrice(a, b, c, d, e, f, g) {
    return (a*b)+c+d+e+f+g;
  }

  get ideform() { return this.idoEvForm.controls; }

  bookEvent() {
    document.getElementById("pay_btn").setAttribute("disabled", "");
    if(this.idoEvForm.valid){
      if(document.cookie.indexOf('token') != -1){
        this._mydetailService.getUserDetail()
        .subscribe(
          res => {
            document.getElementById("pay_btn").removeAttribute("disabled");
            if(res.mobile){
              this.idoEvForm.value.city = this.cityvalue;
              this.idoEvForm.value.venue = this.vnuvalue;
              this.bookForm = this.idoEvForm.value;
              Object.assign(this.bookForm, {ORDER_ID: this.id + '_IDOEVENT_' + new Date().getTime()});
              Object.assign(this.bookForm, {TXN_AMOUNT: this.totalPrice});
              Object.assign(this.bookForm, {EMAIL: res.email});
              Object.assign(this.bookForm, {MOBILE_NO: res.mobile});
              Object.assign(this.bookForm, {bookStatus: "request"});
              console.log(this.bookForm);
              this._paymentService.userPayment(this.bookForm)
              .subscribe(
                res => {
                  window.location.replace("http://localhost:3000/api/pay/"+res);
                },
                err => {
                  console.log(err);
                }
              )
            } else {
              this._router.navigate(['/mydetail']);
              this.snackbar.open("Please update your Mobile Number", null, {duration:5000,panelClass: ['blue-snackbar']});
            }
          },
          err => {
            if(err instanceof HttpErrorResponse) {
              if(err.status === 401) {
                this._router.navigate(['/login']);
                this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
              } if (err.status === 500) {
                this._router.navigate(['/login']);
                this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
              } else {
                this._router.navigate(['/home']);
                this.snackbar.open("Something Wrong", null, {duration:5000,panelClass: ['blue-snackbar']});
              }
            }
          }
        )
      } else {
        this._router.navigate(['/login']);
        this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
      }
    } else {
      document.getElementById("pay_btn").removeAttribute("disabled");
      this.snackbar.open("Fill all required fields", null, {duration:5000,panelClass: ['blue-snackbar']});
    }
  }

}
