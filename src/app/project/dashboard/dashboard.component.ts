import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetectmobileService } from '../../services/detectmobile.service';
import { AuthService } from '../../services/auth.service';
import Swiper from 'swiper/dist/js/swiper.js';
import { MydetailService } from '../../services/mydetail.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PayhistoryService } from '../../services/payhistory.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mobView:boolean = false;
  defNoimage = '/assets/images/no_image_def.jpg'
  noimage = '/assets/images/no_image.jpg'
  defaultImage = '/assets/images/no_image_def.jpg';
  image = '/assets/images/no_image_def.jpg';
  tokenMake = '';
  authToken = '';
  userDetail = {};
  bookHisDet = [];
  aprCount:number = 0;
  pndCount:number = 0;
  constructor(
    private deviceService: DetectmobileService,
    private _auth: AuthService,
    private _mydetailService: MydetailService,
    private _payhistoryService: PayhistoryService,
    private _router: Router
  ) {
    this._auth.getTokenWeb()
    .subscribe(
      data => this.tokenMake = data.toString(),
      err => this._router.navigate(['/home'])
    )
  }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
        this.mobView = true;
        document.getElementById("logo_wrap").classList.remove("expand_logo");
        setTimeout(function() {
          var mySwiper3 = new Swiper ('.work_slide', {
            speed: 200,
            slidesPerView: 2,
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
            },
          });
        }, 200);
    } else {
        //desktop here
        this.mobView = false;
        setTimeout(function() {
          var mySwiper3 = new Swiper ('.work_slide', {
            speed: 200,
            slidesPerView: 5,
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
            },
          });
        }, 200);
    }

    this.authToken = this._auth.getToken();
    

    this._mydetailService.getUserDetail()
    .subscribe(
      res => {
        this.userDetail = res;
        this.defaultImage = 'http://localhost:3000/'+res.loadpath;
        this.image = 'http://localhost:3000/'+res.imgpath;
        this._payhistoryService.getPayHistory(res.email)
        .subscribe(
          res => {
            this.bookHisDet = res;
            if(this.bookHisDet[0]) {
              for(var i = 0; i < this.bookHisDet.length; ++i){
                  if(this.bookHisDet[i].bookStatus == "paided"){
                    this.aprCount++;
                  }
                  this.pndCount = i-this.aprCount+1;
              }
            }
          },
          err => {
            console.log(err);
          }
        );
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
