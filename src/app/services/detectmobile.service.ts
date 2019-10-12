import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DetectmobileService {

  constructor(private deviceService: DeviceDetectorService) {}

  detectMob() {
  	return this.deviceService.isMobile();
  }
}
