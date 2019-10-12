import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq.component';
import { MaterialModule } from '../material';

const routes: Routes = [
	{ path: '', component: FaqComponent }
];

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class FaqModule { }
