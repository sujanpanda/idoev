import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { MaterialModule } from './project/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './project/pagenotfound/pagenotfound.component';
import { FooterComponent } from './project/footer/footer.component';
import { HeaderComponent } from './project/header/header.component';

import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth.guard';
import { LoggedinGuard } from './guards/loggedin.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DetectmobileService } from './services/detectmobile.service';
import { SidebarComponent } from './admin/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [CookieService,AuthGuard,LoggedinGuard,DetectmobileService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
