import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedbacksComponent } from './feedbacks.component';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';

const routes: Routes = [
	{ path: '', component: FeedbacksComponent }
];

@NgModule({
  declarations: [FeedbacksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ GetformdetailsService ]
})
export class FeedbacksModule { }
