import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DetectmobileService } from './services/detectmobile.service';
import { AdminauthService } from './adminservice/adminauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showDesk:boolean = false
  mainPage = true;
  showHome = false;
  showReport = false;
  showFeed = false;
  showVenues = false;
  showAbout = false;
  showFaq = false;
  showLogin = false;
  showReg = false;
  showContact = false;
  showDashboard = false;
  showOther = false;
  checkAdmin:boolean = false;
  title = 'dev';
  constructor(
    private _router: Router,
    private _adminauth: AdminauthService,
    private deviceService: DetectmobileService
  ){
    var isMobile = this.deviceService.detectMob();
    if (isMobile) {
      this.showDesk = true;
      this._router.events.subscribe((routerEvent: Event) => {
        if(routerEvent instanceof NavigationStart) {
          var rtrLink = this._router.url;
          var rtrVnu = rtrLink.split("/");
          if(routerEvent.url == "/" || routerEvent.url == "/home") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showHome = true;
          } else if(routerEvent.url == "/reportmissing") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showReport = true;
          } else if(routerEvent.url == "/faq" || routerEvent.url == "/bookstatus" || routerEvent.url == "/bookhistory") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showFaq = true;
          } else if(routerEvent.url == "/givefeedback") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showFeed = true;
          } else if(routerEvent.url == "/venues") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showVenues = true;
          } else if(routerEvent.url == "/about") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showAbout = true;
          } else if(routerEvent.url == "/login") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showLogin = true;
          } else if(routerEvent.url == "/register") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showReg = true;
          } else if(routerEvent.url == "/contact") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showContact = true;
          } else if(routerEvent.url == "/dashboard" || routerEvent.url == "/mydetail" || routerEvent.url == "/bookevent") {
            document.getElementById("logo_wrap").classList.remove("expand_logo");
            this.showDashboard = true;
          } else {
            this.showOther = true;
          }
          this.mainPage = false;
        }
        if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          this.mainPage = true;
          this.showHome = false;
          this.showReport = false;
          this.showFeed = false;
          this.showFaq = false;
          this.showVenues = false;
          this.showAbout = false;
          this.showLogin = false;
          this.showReg = false;
          this.showContact = false;
          this.showDashboard = false;
          this.showOther = false;
        }
      });
    } else {
      //desktop here
      this._router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.checkAdmin = this._adminauth.loggedIn();
          var rtrLink = this._router.url;
          var rtrVnu = rtrLink.split("/");
          if( rtrVnu[1] == "idostar" && rtrVnu[2] != "login" ) {
            this.checkAdmin = this._adminauth.loggedIn();
          } else {
            this.checkAdmin = false;
          }
        }
      });
      this.showDesk = false;
      this._router.events.subscribe((routerEvent: Event) => {
        if(routerEvent instanceof NavigationStart) {
          var rtrLink = this._router.url;
          var rtrVnu = rtrLink.split("/");
          if(routerEvent.url == "/" || routerEvent.url == "/home") {
            this.showHome = true;
          } else if(routerEvent.url == "/reportmissing") {
            this.showReport = true;
          } else if(routerEvent.url == "/faq" || routerEvent.url == "/bookstatus" || routerEvent.url == "/bookhistory") {
            this.showFaq = true;
          } else if(routerEvent.url == "/givefeedback") {
            this.showFeed = true;
          } else if(routerEvent.url == "/venues") {
            this.showVenues = true;
          } else if(routerEvent.url == "/about") {
            this.showAbout = true;
          } else if(routerEvent.url == "/login") {
            this.showLogin = true;
          } else if(routerEvent.url == "/register") {
            this.showReg = true;
          } else if(routerEvent.url == "/contact") {
            this.showContact = true;
          } else if(routerEvent.url == "/dashboard" || routerEvent.url == "/mydetail" || routerEvent.url == "/bookevent") {
            this.showDashboard = true;
          } else {
            this.showOther = true;
          }
          this.mainPage = false;
        }
        if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          this.mainPage = true;
          this.showHome = false;
          this.showReport = false;
          this.showFeed = false;
          this.showFaq = false;
          this.showVenues = false;
          this.showAbout = false;
          this.showLogin = false;
          this.showReg = false;
          this.showContact = false;
          this.showDashboard = false;
          this.showOther = false;
        }
      });
    }
  }

  ngOnInit() {
    this.checkAdmin = this._adminauth.loggedIn();
  }

}