import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';
import { FormDateRange } from "./core/models/form-date-range";
import { DateRangeUtils } from "./core/services/date-range-utils.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: '',
    templateUrl: './templates/hourly/all.html',
    styles: ['']
})

export class HourlyAbstractComponent implements OnDestroy {
    private theDataSource: Observable<Array<any>>;
    private busyLineChartData: Subscription;

    protected apiURL: string;
    protected dateRangeSubscription: Subscription;
    protected daysSubscription: Subscription;
    protected hourlyCountsApiURL: string;
    protected unsubscribe: Subject<boolean> = new Subject();

    public startDate;
    public endDate;
    public rawData = [];
    public barChartData: Array<any> = [{ data: [] }];
    public barChartLabels: string[] = [];

    constructor(protected http: HttpClient, protected route: ActivatedRoute, protected dateRangeUtils: DateRangeUtils) { }

    public setHourlyCountsApiURL(dateRange: FormDateRange) { }

    public getData(dateRange: FormDateRange) {
        this.startDate = dateRange.startDate;
        this.endDate = dateRange.endDate;
        this.getDataInternal();
    }

    private getDataInternal() {
        this.theDataSource = this.http.get<Array<any>>(this.hourlyCountsApiURL);
        this.rawData = [];

        // Get the data from the REST server
        this.busyLineChartData = this.theDataSource
            .takeUntil(this.unsubscribe)
            .subscribe(
            data => {
                let dataLabels: string[] = [];
                let dataCounts: string[] = [];

                for (let i = 0; i < data.length; i++) {
                    dataLabels.push(data[i][1]);
                    dataCounts.push(data[i][0]);
                }

                this.buildBarChart(dataLabels, dataCounts);
            },
            err => console.log("Can't get Counts. Error code: %s, URL: %s ", err.status, err.url),
            () => console.log('Counts are retrieved')
            );

    }

    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /* CHARTS */
    private buildBarChart(labels: string[], dataCounts: string[]) {
        this.barChartData = [{ data: dataCounts, label: 'Number of calls per hour' }];
        let labelsCount = this.barChartLabels.length;
        for (var index = 0; index < labelsCount; index++) {
            this.barChartLabels.pop();
        }

        for (let label of labels) {
            this.barChartLabels.push(label);
        }
    }

    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    public barChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(0, 131, 154,0.2)',
            borderColor: 'rgba(0, 131, 154,1)',
            pointBackgroundColor: 'rgba(0, 131, 154,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 131, 154,0.8)'
        }
    ];
    public chartClicked(e: any): void {
    }
    public chartHovered(e: any): void {
    }

}