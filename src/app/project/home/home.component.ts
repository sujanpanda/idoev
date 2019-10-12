import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper/dist/js/swiper.js';
import { DetectmobileService } from '../../services/detectmobile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobView:boolean = false;
  constructor(private deviceService: DetectmobileService) { }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    
    if(isMobile) {
      this.mobView = true;
      document.getElementById("logo_wrap").classList.remove("expand_logo");
      setTimeout(function() {
        var mySwiper = new Swiper ('.main_banner', {
          speed: 200,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
          loop: true,
          autoplay: {
            delay: 7000,
          }
        });
        var mySwiper2 = new Swiper ('.work_slide', {
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
        var mySwiper = new Swiper ('.desk_banner', {
          speed: 200,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          loop: true,
          autoplay: {
            delay: 7000,
          }
        });
        var mySwiper2 = new Swiper ('.work_slide', {
          speed: 200,
          slidesPerView: 4,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        });
      }, 200);
    }
  }
  
}
