import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  mobView:boolean = false;	

  constructor(private deviceService: DetectmobileService) {
  	var isMobile = this.deviceService.detectMob();
  	if(isMobile) {
      this.mobView = true;
  	}
  }

  ngOnInit() { }

  footLink() {
    window.scrollTo(0, 0);
  }

}
