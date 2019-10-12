import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../project/material';
import { EditvenuedetailComponent } from './editvenuedetail.component';
import { CityService } from '../../services/city.service';
import { EditvenueService } from '../../adminservice/editvenue.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: EditvenuedetailComponent }
];

@NgModule({
  declarations: [EditvenuedetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ EditvenueService, CityService ]
})
export class EditvenuedetailModule { }
