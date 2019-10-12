import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../project/material';
import { VenuephotoComponent } from './venuephoto.component';
import { AddvenueService } from '../../adminservice/addvenue.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: VenuephotoComponent }
];

@NgModule({
  declarations: [VenuephotoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ AddvenueService ]
})
export class VenuephotoModule { }
