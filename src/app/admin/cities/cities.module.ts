import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities.component';
import { MaterialModule } from '../../project/material';
import { AddcityService } from '../../adminservice/addcity.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: CitiesComponent }
];

@NgModule({
  declarations: [CitiesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ AddcityService ]
})
export class CitiesModule { }
