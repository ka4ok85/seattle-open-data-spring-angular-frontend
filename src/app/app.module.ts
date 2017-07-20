import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { PathLocationStrategy } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart.js';

import { AboutComponent } from "./about.component";
import { DateRangeFormComponent } from "./date-range-form-component.component";


import { HomeComponent } from "./home.component";
import { ByTypeComponent } from "./by-type.component";
import { ByTypeSpecificComponent } from "./by-type-specific.component";
import { ByZipComponent } from "./by-zip.component";
import { ByZipSpecificComponent } from "./by-zip-specific.component";
import { routing } from "./app.routing";

import { EnvironmentSpecificService } from "./core/services/environment-specific.service";
import { EnvironmentSpecificResolver } from "./core/services/environment-specific-resolver.service";
import { DateRangeUtils } from "./core/services/date-range-utils.service";

import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ByTypeComponent, ByTypeSpecificComponent, ByZipComponent, ByZipSpecificComponent, AboutComponent, DateRangeFormComponent
  ],
  imports: [
    BrowserModule, RouterModule, routing, ChartsModule, HttpModule, MyDatePickerModule, FormsModule, ReactiveFormsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, EnvironmentSpecificService, EnvironmentSpecificResolver, DateRangeUtils],
  bootstrap: [AppComponent]
})
export class AppModule { }
