import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VenuesComponent } from './venues.component';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvtypeService } from '../../services/evtype.service';
import { CityService } from '../../services/city.service';
import { VenuesService } from '../../services/venues.service';
import { Ng5SliderModule } from 'ng5-slider';

const routes: Routes = [
	{ path: '', component: VenuesComponent }
];

@NgModule({
  declarations: [VenuesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    RouterModule.forChild(routes)
  ],
  providers: [ EvtypeService, CityService, VenuesService ]
})
export class VenuesModule { }
