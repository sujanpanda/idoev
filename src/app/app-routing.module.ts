import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './project/pagenotfound/pagenotfound.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedinGuard } from './guards/loggedin.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: './project/home/home.module#HomeModule'
	},
	{
		path: 'payment',
		loadChildren: './project/payment/payment.module#PaymentModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadChildren: './project/login/login.module#LoginModule',
		canActivate: [LoggedinGuard]
	},
	{
		path: 'register',
		loadChildren: './project/register/register.module#RegisterModule',
		canActivate: [LoggedinGuard]
	},
	{
		path: 'dashboard',
		loadChildren: './project/dashboard/dashboard.module#DashboardModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'mydetail',
		loadChildren: './project/mydetail/mydetail.module#MydetailModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'venues',
		loadChildren: './project/venues/venues.module#VenuesModule'
	},
	{
		path: 'venuedetail/:id',
		loadChildren: './project/venuedetail/venuedetail.module#VenuedetailModule'
	},
	{
		path: 'bookevent/:id',
		loadChildren: './project/bookevent/bookevent.module#BookeventModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'bookhistory',
		loadChildren: './project/bookhistory/bookhistory.module#BookhistoryModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'givefeedback',
		loadChildren: './project/feedback/feedback.module#FeedbackModule'
	},
	{
		path: 'reportmissing',
		loadChildren: './project/missing/missing.module#MissingModule'
	},
	{
		path: 'faq',
		loadChildren: './project/faq/faq.module#FaqModule'
	},
	{
		path: 'about',
		loadChildren: './project/about/about.module#AboutModule'
	},
	{
		path: 'contact',
		loadChildren: './project/contact/contact.module#ContactModule'
	},
	{
		path: 'response/:id',
		loadChildren: './project/payment/payment.module#PaymentModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'addphoto',
		loadChildren: './project/addphoto/addphoto.module#AddphotoModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'idostar',
		loadChildren: './admin/adlogin/adlogin.module#AdloginModule'
	},
	{
		path: '**',
		component: PagenotfoundComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
