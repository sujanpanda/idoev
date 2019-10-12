import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

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
