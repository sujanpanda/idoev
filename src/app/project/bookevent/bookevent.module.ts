import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookeventComponent } from './bookevent.component';
import { MaterialModule } from '../material';
import { VenuedetailService } from '../../services/venuedetail.service';
import { BookingService } from '../../services/booking.service';
import { MydetailService } from '../../services/mydetail.service';
import { PaymentService } from '../../services/payment.service';
import { EvtypeService } from '../../services/evtype.service';
import { MatTimeSelectModule, MatNativeTimeModule } from 'ngx-material-time-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: BookeventComponent }
];

@NgModule({
  declarations: [BookeventComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatTimeSelectModule,
    MatNativeTimeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ VenuedetailService, BookingService, MydetailService, PaymentService, EvtypeService ]
})
export class BookeventModule { }
