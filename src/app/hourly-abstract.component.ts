import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';
import { FormDateRange } from "./core/models/form-date-range";
import { DateRangeUtils } from "./core/services/date-range-utils.service";
import { EventEmitter, Input, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MissionService } from './core/services/mission.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: '',
    templateUrl: './templates/hourly/all.html',
    styles: ['']
})

export class HourlyAbstractComponent {
    theDataSource: Observable<string>;
    apiURL: string;
    days: Number;
    busy: Promise<any>;
    subscription: Subscription;



    protected hourlyCountsApiURL: string;

    public rawData = [];
    public barChartData: Array<any> = [{ data: [] }];
    public barChartLabels: string[] = [];

    constructor(protected http: Http, protected route: ActivatedRoute, protected dateRangeUtils: DateRangeUtils, private missionService: MissionService) {
        this.subscription = missionService.missionAnnounced$.subscribe(
            mission => {
                console.log("oppa:" + mission);
            });
    }

    public setHourlyCountsApiURL(days: number) { }

    public getData(days: number) {
        console.log("base getData");
        let range = this.dateRangeUtils.getIntlFormattedRangeForPastDays(days);
        this.getDataInternal(range['start'], range['end']);
    }

    private getDataInternal(startDate: string, endDate: string) {
        console.log(this.hourlyCountsApiURL);
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

    /* FORMS */
    public onDateRangeFormSubmit(formDateRange: FormDateRange): void {
        this.getDataInternal(formDateRange.startDate, formDateRange.endDate);
    }




}