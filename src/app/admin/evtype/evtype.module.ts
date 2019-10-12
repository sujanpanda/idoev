import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EvtypeComponent } from './evtype.component';
import { MaterialModule } from '../../project/material';
import { EvlistService } from '../../adminservice/evlist.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: EvtypeComponent }
];

@NgModule({
  declarations: [EvtypeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ EvlistService ]
})
export class EvtypeModule { }
