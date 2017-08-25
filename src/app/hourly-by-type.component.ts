import { Http } from '@angular/http';
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
    templateUrl: './templates/hourly/by-type.html',
    styles: ['']
})

export class HourlyByTypeComponent extends HourlyAbstractComponent {

    public type: string;

    constructor(protected http: Http, protected route: ActivatedRoute, protected dateRangeUtils: DateRangeUtils, private dateUpdatesService: DateUpdatesService) {
        super(http, route, dateRangeUtils);
        this.type = route.snapshot.paramMap.get('type');
        this.daysSubscription = dateUpdatesService.daysPassed$.subscribe(
            mission => {
                let dateRange: FormDateRange = this.dateRangeUtils.getFormDateRangeForPastDays(mission);
                this.setHourlyCountsApiURL(dateRange);
                this.getData(dateRange);
            });

        this.dateRangeSubscription = dateUpdatesService.dateRangePassed$.subscribe(
            dateRange => {
                this.setHourlyCountsApiURL(dateRange);
                this.getData(dateRange);
            });
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.apiURL = data.envSpecific.apiURL;
            });

        let dateRange: FormDateRange = this.dateRangeUtils.getFormDateRangeForPastDays(30);
        this.setHourlyCountsApiURL(dateRange);
        this.getData(dateRange);
    }

    public setHourlyCountsApiURL(dateRange: FormDateRange) {
        this.hourlyCountsApiURL = this.apiURL + 'calls/count/' + dateRange.startDate + '/' + dateRange.endDate + '/?type=' + this.type + '&hourly';
    }
}