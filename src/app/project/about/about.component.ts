import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

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
