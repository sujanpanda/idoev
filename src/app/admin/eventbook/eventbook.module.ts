import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../project/material';
import { EventbookComponent } from './eventbook.component';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';

const routes: Routes = [
	{ path: '', component: EventbookComponent }
];

@NgModule({
  declarations: [EventbookComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ GetformdetailsService ]
})
export class EventbookModule { }
