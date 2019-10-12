import { Component, OnInit, HostListener } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VenuedetailService } from '../../services/venuedetail.service';
import { MydetailService } from '../../services/mydetail.service';
import { LikesService } from '../../services/likes.service';
import { AllcityService } from '../../services/allcity.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-venuedetail',
  templateUrl: './venuedetail.component.html',
  styleUrls: ['./venuedetail.component.css']
})
export class VenuedetailComponent implements OnInit {

  mobView:boolean = false;
  startScroll:boolean = false;
  venueShowide:boolean = false;
  venueRes:boolean = true;
  sIndx = 0;
  venueCount:Number;
  likeCnts:Number;
  id: string;
  venueDet = [];
  newVenueDet = {id: 1};
  userID = {};
  allcities = [];
  constructor(
    private deviceService: DetectmobileService,
  	private _router: Router,
    private _routeAct: ActivatedRoute,
    private _mydetailService: MydetailService,
  	private _venuedetailService: VenuedetailService,
    private _likesService: LikesService,
    private _allcityService: AllcityService,
    public snackbar: MatSnackBar
  ) {
      
    }

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
    } else {
      //desktop here
      this.mobView = false;
    }
    this._allcityService.getCityCount()
    .subscribe(
      res => {
        this.venueCount = parseInt(res);
        this.startScroll = true;
      },
      err => {
        console.log(err);
      }
    );
    this.venueRes = true;
    this._allcityService.getAllCity(this.sIndx)
    .subscribe(
      res => {
          this.allcities = res;
          this.venueRes = false;
      },
      err => {
          this.venueRes = false;
      }
    );
    this._routeAct.paramMap.subscribe(params => {
      this.venueDetCall();
    });
  }

  likeVenue() {
    var btn = document.getElementById("likeBtn");
    btn.classList.add("imgAni");
    setTimeout(function(){
      btn.classList.remove("imgAni");
    }, 200);
    if(document.cookie.indexOf('token') != -1){
      this._mydetailService.getUserDetail()
      .subscribe(
        res => {
          this.userID = res._id;
          var likesUpdData = {usersUniqId:this.userID, venueid: this.id}
          this._likesService.likesUpdate(likesUpdData)
          .subscribe(
            res => {
                this.likeCnts = parseInt(res);
            },
            err => {
                this.userID = {};
                this._router.navigate(['/home']);
                this.snackbar.open("Something Wrong", null, {duration:5000,panelClass: ['blue-snackbar']});
            }
          )
        },
        err => {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401) {
              this.userID = {};
              this._router.navigate(['/login']);
              this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
            } if (err.status === 500) {
              this.userID = {};
              this._router.navigate(['/login']);
              this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
            } else {
              this.userID = {};
              this._router.navigate(['/home']);
              this.snackbar.open("Something Wrong", null, {duration:5000,panelClass: ['blue-snackbar']});
            }
          }
        }
      );
    } else {
      this.userID = {};
      this._router.navigate(['/login']);
      this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
    }
  }

  venueBook() {
    if(document.cookie.indexOf('token') != -1){
      this._mydetailService.getUserDetail()
      .subscribe(
        res => {
          if(res.mobile){
            this.userID = res._id;
            this._router.navigate(['/bookevent/'+this.newVenueDet.id]);
          } else {
            this._router.navigate(['/mydetail']);
            this.snackbar.open("Please update your Mobile Number", null, {duration:5000,panelClass: ['blue-snackbar']});
          }
        },
        err => {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401) {
              this.userID = {};
              this._router.navigate(['/login']);
              this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
            } if (err.status === 500) {
              this.userID = {};
              this._router.navigate(['/login']);
              this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
            } else {
              this.userID = {};
              this._router.navigate(['/home']);
              this.snackbar.open("Something Wrong", null, {duration:5000,panelClass: ['blue-snackbar']});
            }
          }
        }
      );
    } else {
      this.userID = {};
      this._router.navigate(['/login']);
      this.snackbar.open("You need to login", null, {duration:5000,panelClass: ['blue-snackbar']});
    }
  }

  venueDetCall() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
      document.getElementById("logo_wrap").classList.remove("expand_logo");
      this.mobView = true;
    } else {
      //desktop here
      this.mobView = false;
    }
    this.venueShowide = false;
    window.scroll({top: 0, left: 0});
    var pageUrl = this._router.url;
    var venId = pageUrl.split("/");
    this.id = venId[2];
    this._venuedetailService.getCityDetail(this.id)
    .subscribe(
      res => {
        this.venueDet = res;
        this.newVenueDet = res;
        this.venueShowide = true;
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/404']);
          }
        }
      }
    );

    this._likesService.getLikesList(this.id)
    .subscribe(
      res => {
          this.likeCnts = parseInt(res);
      },
      err => {
          console.log(err);
      }
    )
  }

  loadMore() {
    this.sIndx = this.sIndx+4;
    this.venueRes = true;
    if(this.sIndx <= this.venueCount) {
      this._allcityService.getAllCity(this.sIndx)
      .subscribe(
        res => {
            for(let i=0; i<res.length; i++) {
              this.allcities.push(res[i]);
            }
            this.venueRes = false;
        },
        err => {
            this.venueRes = false;
        }
      )
    } else {
      this.venueRes = false;
    }
  }

}
