import { Component, OnInit, HostListener } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Options } from 'ng5-slider';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EvtypeService } from '../../services/evtype.service';
import { CityService } from '../../services/city.service';
import { VenuesService } from '../../services/venues.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

  mobView:boolean = false;
  eventType = [];
  ctList = [];
  idoEvForm: FormGroup;
  idoEvErrMsg: string;
  skipNumber:number = 0;
  topVen:boolean = true;
  venResult:boolean = false;
  resToShow:boolean = false;
  searchLoader:boolean = false;
  noRes:boolean = false;
  resList = [];
  venueCount:Number;
  startScroll:boolean = false;

  constructor(
    private deviceService: DetectmobileService,
    private _evTypeService: EvtypeService,
    private _ctService: CityService,
    private _vnuService: VenuesService,
    private _router: Router,
    private _routeAct: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() 
  {
    var wrap = document.getElementById('venuDetPage');
    var contentHeight = wrap.offsetHeight;
    var yOffset = window.pageYOffset;
    var y = yOffset + window.innerHeight;
    if(this.startScroll == true && y >= contentHeight) {
      this._routeAct.paramMap.subscribe(params => {
        this.loadMore();
      });
    }
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

    this._evTypeService.getEventType()
    .subscribe(
      res => {
        this.eventType = res;
      },
      err => {
        console.log(err);
      }
    );

    this._ctService.getAllCities()
    .subscribe(
      res => {
        this.ctList = res;
      },
      err => {
        console.log(err);
      }
    );

    this.idoEvForm = this.fb.group({
        venutype: ['', [
          Validators.required
        ]],
        ctname: ['', [
          Validators.required
        ]],
        strange: [this.minValue, [
            Validators.required
        ]],
        endrange: [this.maxValue, [
            Validators.required
        ]],
        resnumb: [this.skipNumber, [
            Validators.required
        ]]
    });
  }

  minValue: number = 2000;
  maxValue: number = 7000;
  options: Options = {
    floor: 500,
    ceil: 10000,
    step: 100,
    minRange: 500
  };

  priceChangeBelow(event) {
    this.minValue = event;
    this.idoEvForm = this.fb.group({
        venutype: [this.idoEvForm.value.venutype, [
          Validators.required
        ]],
        ctname: [this.idoEvForm.value.ctname, [
          Validators.required
        ]],
        strange: [this.minValue, [
            Validators.required
        ]],
        endrange: [this.maxValue, [
            Validators.required
        ]],
        resnumb: [this.skipNumber, [
            Validators.required
        ]]
    });
  }

  priceChangeUp(event) {
    this.maxValue = event;
  }

  get ideform() { return this.idoEvForm.controls; }

  submitFilter() {
    this.idoEvForm.value.resnumb = 0;
    if(this.idoEvForm.valid) {
      document.getElementById("event_btn").setAttribute("disabled", "");
      this.topVen = false;
      this.venResult = true;
      this.searchLoader = true;
      this.noRes = false;
      this._vnuService.searchVenu(this.idoEvForm.value)
      .subscribe(
        res => {
          if(res.result.length == 0) {
            this.noRes = true;
            this.resToShow = false;
            this.startScroll = false;
          } else {
            this.noRes = false;
            this.resToShow = true;
            this.resList = res.result;
            this.startScroll = true;
            this.venueCount = res.totalRes;
          }
          this.searchLoader = false;
          document.getElementById("event_btn").removeAttribute("disabled");
        },
        err => {
          this.noRes = true;
          this.resToShow = false;
          this.startScroll = false;
          document.getElementById("event_btn").removeAttribute("disabled");
        }
      );
    }
  }

  resetFilter() {
    this.minValue = 2000;
    this.maxValue = 7000;
    this.idoEvForm.reset({
      strange: 2000,
      endrange: 7000
    });
    this.startScroll = false;
  }

  loadMore() {

    this.searchLoader = true;
    this.skipNumber = this.skipNumber+2;

    this.idoEvForm = this.fb.group({
        venutype: [this.idoEvForm.value.venutype, [
          Validators.required
        ]],
        ctname: [this.idoEvForm.value.ctname, [
          Validators.required
        ]],
        strange: [this.minValue, [
            Validators.required
        ]],
        endrange: [this.maxValue, [
            Validators.required
        ]],
        resnumb: [this.skipNumber, [
            Validators.required
        ]]
    });

    if(this.skipNumber <= this.venueCount) {
      this._vnuService.searchVenu(this.idoEvForm.value)
      .subscribe(
        res => {
          if(res.result.length != 0) {
            for(let i=0; i<res.result.length; i++) {
              this.resList.push(res.result[i]);
            }
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.searchLoader = false;
    }
  }

}
