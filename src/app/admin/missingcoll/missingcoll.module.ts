import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MissingcollComponent } from './missingcoll.component';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';

const routes: Routes = [
	{ path: '', component: MissingcollComponent }
];

@NgModule({
  declarations: [MissingcollComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ GetformdetailsService ]
})
export class MissingcollModule { }
