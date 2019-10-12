import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminauthService } from '../../adminservice/adminauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routerNm = "";
  checkAdmin:boolean = false;
  checkToken:boolean = false;
  checkTokenDesk:boolean = false;
  mobView:boolean = false;
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _adminauth: AdminauthService,
    private deviceService: DetectmobileService
  ) {

    var isMobile = this.deviceService.detectMob();

    if(isMobile) {
      this.mobView = true;
    	this._router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
              this.checkToken = this._auth.loggedIn();
              this.checkTokenDesk = false;
              var rtrLink = this._router.url;
              var rtrVnu = rtrLink.split("/");
              if(
              	rtrLink == "/home" ||
              	rtrLink == "/dashboard" ||
              	rtrLink == "/login" ||
              	rtrLink == "/register" ||
              	rtrLink == "/venues" ||
              	rtrLink == "/faq"
              ){
              	this.routerNm = rtrLink.split('/')[1];
              } else if( rtrLink == "/mydetail" ) {
              	this.routerNm = "my detail";
              } else if( rtrVnu[1] == "venuedetail" ) {
              	this.routerNm = "venue detail";
              } else if( rtrVnu[1] == "bookevent" ) {
              	this.routerNm = "book event";
              } else if( rtrLink == "/bookhistory" ) {
              	this.routerNm = "book history";
              } else if( rtrLink == "/givefeedback" ) {
              	this.routerNm = "give us feedback";
              } else if( rtrLink == "/reportmissing" ) {
              	this.routerNm = "report missing";
              } else if( rtrLink == "/contact" ) {
              	this.routerNm = "contact us";
              } else if( rtrLink == "/about" ) {
              	this.routerNm = "about us";
              } else if( rtrLink == "/payment" ) {
                this.routerNm = "payment";
              } else if( rtrLink == "/addphoto" ) {
                this.routerNm = "add photo";
              } else if( rtrVnu[1] == "response" ) {
                this.routerNm = "payment response";
              } else {
              	this.routerNm = "404";
              }
          }
      });
    } else {
      //desktop here
      this._router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.checkToken = this._auth.loggedIn();
          this.checkTokenDesk = this._auth.loggedIn();
          this.checkAdmin = this._adminauth.loggedIn();
        }
      });
      this.mobView = false;
    }
  }

  ngOnInit() {
  	this.checkToken = this._auth.loggedIn();
    this.checkTokenDesk = this._auth.loggedIn();
    this.checkAdmin = this._adminauth.loggedIn();
  }

  logoutUser() {
    this._auth.loggeOut();
    this._adminauth.loggeOut();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "admintk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "usertype=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
