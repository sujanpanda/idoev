import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentService } from '../../services/payment.service';
import { MaterialModule } from '../material';

const routes: Routes = [
	{ path: '', component: PaymentComponent },
	{ path: 'response', component: PaymentComponent }
];

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [PaymentService]
})
export class PaymentModule { }
