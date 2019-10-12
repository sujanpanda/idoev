import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../project/material';
import { BookcalcComponent } from './bookcalc.component';
import { BookcalcService } from '../../adminservice/bookcalc.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: BookcalcComponent }
];

@NgModule({
  declarations: [BookcalcComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ BookcalcService ]
})
export class BookcalcModule { }
