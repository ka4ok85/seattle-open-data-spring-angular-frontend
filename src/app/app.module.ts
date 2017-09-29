import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { PathLocationStrategy } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart.js';
import { BusyModule } from 'angular2-busy';

import { AboutComponent } from "./about.component";
import { DateRangeFormComponent } from "./date-range-form-component.component";
import { DateRangeQuickButtonsComponent } from "./date-range-quick-buttons";
import { AuthGuard } from "./auth-guard.service";

import { HomeComponent } from "./home.component";
import { ByTypeComponent } from "./by-type.component";
import { ByTypeSpecificComponent } from "./by-type-specific.component";
import { ByZipComponent } from "./by-zip.component";
import { ByZipSpecificComponent } from "./by-zip-specific.component";
import { HourlyAllComponent } from "./hourly-all.component";
import { HourlyComponent } from "./hourly.component";
import { HourlyAbstractComponent } from "./hourly-abstract.component";
import { HourlyByZipComponent } from "./hourly-by-zip.component";
import { HourlyByTypeComponent } from "./hourly-by-type.component";
import { AdminComponent } from "./admin.component";

import { routing } from "./app.routing";

import { EnvironmentSpecificService } from "./core/services/environment-specific.service";
import { EnvironmentSpecificResolver } from "./core/services/environment-specific-resolver.service";
import { DateRangeUtils } from "./core/services/date-range-utils.service";
import { DateUpdatesService } from './core/services/date-updates.service';

import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ByTypeComponent,
    ByTypeSpecificComponent,
    ByZipComponent,
    ByZipSpecificComponent,
    HourlyComponent,
    HourlyAbstractComponent,
    HourlyAllComponent,
    HourlyByZipComponent,
    HourlyByTypeComponent,
    AboutComponent,
    AdminComponent,
    DateRangeFormComponent,
    DateRangeQuickButtonsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    ChartsModule,
    HttpModule,
    MyDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    BusyModule,
    BrowserAnimationsModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    Angulartics2Module.forChild()
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, Title, EnvironmentSpecificService, EnvironmentSpecificResolver, DateRangeUtils, DateUpdatesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
