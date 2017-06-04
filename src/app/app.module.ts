import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { MainAppModule } from './main-app/main-app.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { i18nService } from './shared/i18n/i18n.service';

import { SimpleNotificationsModule } from 'angular2-notifications';
import * as $ from 'jquery';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MainAppModule,
    LoginModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [ i18nService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
