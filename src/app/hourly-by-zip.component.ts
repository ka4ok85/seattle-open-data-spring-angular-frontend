import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';
import { FormDateRange } from "./core/models/form-date-range";
import { DateRangeUtils } from "./core/services/date-range-utils.service";
import { HourlyAbstractComponent } from "./hourly-abstract.component";
import { EventEmitter, Input, Output } from '@angular/core';
import { DateUpdatesService } from './core/services/date-updates.service';

@Component({
    selector: '',
    templateUrl: './templates/hourly/by-zip.html',
    styles: ['']
})

export class HourlyByZipComponent extends HourlyAbstractComponent {

    public zip: string;

    constructor(protected http: HttpClient, protected route: ActivatedRoute, protected dateRangeUtils: DateRangeUtils, private dateUpdatesService: DateUpdatesService, private titleService: Title) {
        super(http, route, dateRangeUtils);
        this.zip = route.snapshot.paramMap.get('zip');
        this.daysSubscription = dateUpdatesService.daysPassed$
            .takeUntil(this.unsubscribe)
            .subscribe(
            days => {
                let dateRange: FormDateRange = this.dateRangeUtils.getFormDateRangeForPastDays(days);
                this.setHourlyCountsApiURL(dateRange);
                this.getData(dateRange);
            });

        this.dateRangeSubscription = dateUpdatesService.dateRangePassed$
            .takeUntil(this.unsubscribe)
            .subscribe(
            dateRange => {
                this.setHourlyCountsApiURL(dateRange);
                this.getData(dateRange);
            });
    }

    ngOnInit() {
        this.route.data
            .takeUntil(this.unsubscribe)
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.titleService.setTitle(data.envSpecific.title + ' | Hourly By Zip - ' + this.zip);
                this.apiURL = data.envSpecific.apiURL;
            });

        let dateRange: FormDateRange = this.dateRangeUtils.getFormDateRangeForPastDays(30);
        this.setHourlyCountsApiURL(dateRange);
        this.getData(dateRange);
    }

    public setHourlyCountsApiURL(dateRange: FormDateRange) {
        this.hourlyCountsApiURL = this.apiURL + 'calls/count/' + dateRange.startDate + '/' + dateRange.endDate + '/?zip=' + this.zip + '&hourly';
    }
}