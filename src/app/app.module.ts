import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {AngularTokenModule} from "angular-token";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase: '/api',
    })
  ],
  providers: [
    AngularTokenModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
