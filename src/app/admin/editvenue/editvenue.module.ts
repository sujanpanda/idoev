import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditvenueComponent } from './editvenue.component';
import { EditvenueService } from '../../adminservice/editvenue.service';

const routes: Routes = [
	{ path: '', component: EditvenueComponent }
];

@NgModule({
  declarations: [EditvenueComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [ EditvenueService ]
})
export class EditvenueModule { }
