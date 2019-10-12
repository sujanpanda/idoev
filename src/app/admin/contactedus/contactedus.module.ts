import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactedusComponent } from './contactedus.component';
import { GetformdetailsService } from '../../adminservice/getformdetails.service';

const routes: Routes = [
	{ path: '', component: ContactedusComponent }
];

@NgModule({
  declarations: [ContactedusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ GetformdetailsService ]
})
export class ContactedusModule { }
