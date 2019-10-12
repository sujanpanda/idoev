import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdloginComponent } from './adlogin.component';
import { MaterialModule } from '../../project/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminGuard } from '../../guards/admin.guard';
import { AdminInterceptorService } from '../../adminservice/admin-interceptor.service';

const routes: Routes = [
	{
    path: '',
    redirectTo: '/idostar/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AdloginComponent
  },
	{
		path: 'city',
		loadChildren: '../cities/cities.module#CitiesModule',
		canActivate: [AdminGuard]
	},
  {
    path: 'evtype',
    loadChildren: '../evtype/evtype.module#EvtypeModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'addvenue',
    loadChildren: '../addvenue/addvenue.module#AddvenueModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'editvenue',
    loadChildren: '../editvenue/editvenue.module#EditvenueModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'editvenuedetail/:id',
    loadChildren: '../editvenuedetail/editvenuedetail.module#EditvenuedetailModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'venuephoto/:id',
    loadChildren: '../venuephoto/venuephoto.module#VenuephotoModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'editcalc/:id',
    loadChildren: '../bookcalc/bookcalc.module#BookcalcModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'ownerphoto/:id',
    loadChildren: '../ownerphoto/ownerphoto.module#OwnerphotoModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'contactedus',
    loadChildren: '../contactedus/contactedus.module#ContactedusModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'feedbacks',
    loadChildren: '../feedbacks/feedbacks.module#FeedbacksModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'getmissing',
    loadChildren: '../missingcoll/missingcoll.module#MissingcollModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'eventbooking',
    loadChildren: '../eventbook/eventbook.module#EventbookModule',
    canActivate: [AdminGuard]
  }
];

@NgModule({
  declarations: [AdloginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [AdminGuard,
  {
  	provide: HTTP_INTERCEPTORS,
    useClass: AdminInterceptorService,
    multi: true
  }]
})
export class AdloginModule { }
