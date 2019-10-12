import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../project/material';
import { AddvenueComponent } from './addvenue.component';
import { CityService } from '../../services/city.service';
import { AddvenueService } from '../../adminservice/addvenue.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: AddvenueComponent }
];

@NgModule({
  declarations: [AddvenueComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ CityService, AddvenueService ]
})
export class AddvenueModule { }
