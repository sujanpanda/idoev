import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VenuedetailComponent } from './venuedetail.component';
import { MydetailService } from '../../services/mydetail.service';
import { MaterialModule } from '../material';
import { VenuedetailService } from '../../services/venuedetail.service';
import { AllcityService } from '../../services/allcity.service';
import { LikesService } from '../../services/likes.service';

const routes: Routes = [
	{ path: '', component: VenuedetailComponent }
];

@NgModule({
  declarations: [VenuedetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [VenuedetailService, MydetailService, LikesService, AllcityService]
})
export class VenuedetailModule { }
