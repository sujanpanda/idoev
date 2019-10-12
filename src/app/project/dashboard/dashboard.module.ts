import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material';
import { MydetailService } from '../../services/mydetail.service';
import { PayhistoryService } from '../../services/payhistory.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const routes: Routes = [
	{ path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  providers: [MydetailService, PayhistoryService]
})
export class DashboardModule { }
