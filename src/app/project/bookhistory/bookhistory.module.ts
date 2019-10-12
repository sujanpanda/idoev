import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookhistoryComponent } from './bookhistory.component';
import { MydetailService } from '../../services/mydetail.service';
import { PayhistoryService } from '../../services/payhistory.service';
import { MaterialModule } from '../material';

const routes: Routes = [
	{ path: '', component: BookhistoryComponent }
];

@NgModule({
  declarations: [BookhistoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [MydetailService, PayhistoryService]
})
export class BookhistoryModule { }
