import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { MaterialModule } from '../material';
import { FeedbackService } from '../../services/feedback.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: FeedbackComponent }
];

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [FeedbackService]
})
export class FeedbackModule { }
