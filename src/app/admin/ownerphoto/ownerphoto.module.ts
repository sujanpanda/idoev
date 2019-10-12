import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../project/material';
import { OwnerphotoComponent } from './ownerphoto.component';
import { AddvenueService } from '../../adminservice/addvenue.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: OwnerphotoComponent }
];

@NgModule({
  declarations: [OwnerphotoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ AddvenueService ]
})
export class OwnerphotoModule { }
