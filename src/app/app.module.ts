import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {PathLocationStrategy} from "@angular/common";
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart.js';

import {AboutComponent} from "./about.component";
import {HomeComponent} from "./home.component";
import {ByTypeComponent} from "./by-type.component";
import {routing} from "./app.routing";
import {ProductDetailComponentParam} from "./product-param.component";

import {EnvironmentSpecificService} from "./core/services/environment-specific.service";
import {EnvironmentSpecificResolver} from "./core/services/environment-specific-resolver.service";


@NgModule({
  declarations: [
    AppComponent, HomeComponent, ByTypeComponent, AboutComponent, ProductDetailComponentParam
  ],
  imports: [
    BrowserModule, RouterModule, routing, ChartsModule, HttpModule
  ],
  providers:[{provide: LocationStrategy, useClass: PathLocationStrategy}, EnvironmentSpecificService, EnvironmentSpecificResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
