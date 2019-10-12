import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MissingComponent } from './missing.component';
import { MaterialModule } from '../material';
import { CityService } from '../../services/city.service';
import { VenuesService } from '../../services/venues.service';
import { ReportmissService } from '../../services/reportmiss.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: MissingComponent }
];

@NgModule({
  declarations: [MissingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [CityService, VenuesService, ReportmissService]
})
export class MissingModule { }
