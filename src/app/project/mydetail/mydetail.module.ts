import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MydetailComponent } from './mydetail.component';
import { MaterialModule } from '../material';
import { MydetailService } from '../../services/mydetail.service';
import { CityService } from '../../services/city.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const routes: Routes = [
	{ path: '', component: MydetailComponent }
];

@NgModule({
  declarations: [MydetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  providers: [MydetailService, CityService]
})
export class MydetailModule { }
