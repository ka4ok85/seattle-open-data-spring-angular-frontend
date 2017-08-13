import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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
    theDataSource: Observable<string>;
    apiURL: string;
    days: number;
    busy: Promise<any>;

    protected dateRangeSubscription: Subscription;
    protected daysSubscription: Subscription;

    protected hourlyCountsApiURL: string;

    public rawData = [];
    public barChartData: Array<any> = [{ data: [] }];
    public barChartLabels: string[] = [];
    constructor(protected http: Http, protected route: ActivatedRoute, protected dateRangeUtils: DateRangeUtils) { }

    public setHourlyCountsApiURL(dateRange: FormDateRange) { }

    public getData(dateRange: FormDateRange) {
        this.getDataInternal();
    }

    private getDataInternal() {
        this.theDataSource = this.http.get(this.hourlyCountsApiURL).map(res => res.json());
        this.busy = this.theDataSource.toPromise();
        //this.days = days;
        this.rawData = [];

        // Get the data from the REST server
        this.theDataSource.subscribe(
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

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.daysSubscription.unsubscribe();
        this.dateRangeSubscription.unsubscribe();
    }

    /* CHARTS */
    private buildBarChart(labels: string[], dataCounts: string[]) {
        this.barChartData = [{ data: dataCounts, label: 'Hourly Breakdown' }];
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