import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  mobView:boolean = false;
  constructor(private deviceService: DetectmobileService) { }

  ngOnInit() {
  	var isMobile = this.deviceService.detectMob();
  	if(isMobile) {
      	this.mobView = true;
      	document.getElementById("logo_wrap").classList.remove("expand_logo");
  	} else {
  		//desktop here
  		this.mobView = false;
  	}
  }

}
