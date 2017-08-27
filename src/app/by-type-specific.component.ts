import { Title } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';
import { FormDateRange } from "./core/models/form-date-range";
import { DateRangeUtils } from "./core/services/date-range-utils.service";

@Component({
    selector: '',
    templateUrl: './templates/by-type-specific.html',
    styles: ['']
})

export class ByTypeSpecificComponent {
    type: string;
    theDataSource: Observable<string>;
    theRadarDataSource: Observable<string>;
    apiURL: string;
    days: Number;
    busy: Promise<any>;

    public startDate;
    public endDate;
    public lineChartData: Array<any> = [{ data: [] }];
    public lineChartLabels: Array<any> = [];
    public radarChartLabels: String[] = [];
    public radarChartData: Array<any> = [{ data: [] }];

    constructor(private http: Http, private route: ActivatedRoute, private dateRangeUtils: DateRangeUtils, private titleService: Title) {
        this.type = route.snapshot.paramMap.get('type');
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.titleService.setTitle(data.envSpecific.title + ' | By Type - ' + this.type);
                this.apiURL = data.envSpecific.apiURL;
            });

        this.getData(30);
    }

    public getData(days: number) {
        let range = this.dateRangeUtils.getIntlFormattedRangeForPastDays(days);
        this.getDataInternal(range['start'], range['end']);
    }

    private getDataInternal(startDate: string, endDate: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.theDataSource = this.http.get(this.apiURL + 'calls/count/' + startDate + '/' + endDate + "?type=" + this.type).map(res => res.json());
        this.theRadarDataSource = this.http.get(this.apiURL + 'calls/count/per-zip/' + startDate + '/' + endDate + "?type=" + this.type).map(res => res.json());
        this.busy = this.theDataSource.toPromise();
        //this.days = days;

        // Get the data from the REST server
        this.theDataSource.subscribe(
            data => {
                let dataLabels: String[] = [];
                let dataCounts: String[] = [];
                for (let i = 0; i < data.length; i++) {
                    dataLabels.push(data[i][1]);
                    dataCounts.push(data[i][0]);
                }

                this.buildLineChart(dataLabels, dataCounts);
            },
            err => console.log("Can't get Counts. Error code: %s, URL: %s ", err.status, err.url)
        );

        this.theRadarDataSource.subscribe(
            data => {
                let dataLabels: String[] = [];
                let dataCounts: String[] = [];
                for (let i = 0; i < data.length; i++) {
                    dataLabels.push(data[i][1]);
                    dataCounts.push(data[i][0]);
                }

                this.buildRadarChart(dataLabels, dataCounts);
            },
            err => console.log("Can't get Radar Chart Counts. Error code: %s, URL: %s ", err.status, err.url)
        );
    }

    private buildLineChart(labels: String[], dataCounts: String[]) {
        this.lineChartData = [{ data: dataCounts, label: 'Number of calls per day' }];
        let labelsCount = this.lineChartLabels.length;
        for (var index = 0; index < labelsCount; index++) {
            this.lineChartLabels.pop();
        }

        for (let label of labels) {
            this.lineChartLabels.push(label);
        }
    }

    /* CHARTS */
    private buildRadarChart(labels: String[], dataCounts: String[]) {
        this.radarChartData = [{ data: dataCounts, label: 'Breakdown by zip code' }];
        let labelsCount = this.radarChartLabels.length;
        for (var index = 0; index < labelsCount; index++) {
            this.radarChartLabels.pop();
        }

        for (let label of labels) {
            if (label == null) {
                label = 'No ZIP';
            }

            this.radarChartLabels.push(label);
        }

    }
    public lineChartOptions: any = {
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        day: 'YYYY-MM-DD'
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(0, 131, 154,0.2)',
            borderColor: 'rgba(0, 131, 154,1)',
            pointBackgroundColor: 'rgba(0, 131, 154,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 131, 154,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    public chartClicked(e: any): void {
    }
    public chartHovered(e: any): void {
    }

    public radarChartType: string = 'radar';
    public chartRadarClicked(e: any): void {
    }
    public chartRadarHovered(e: any): void {
    }
    public radarChartOptions: any = {
        responsive: true,
        legend: {
            display: true,
            position: "right"
        }
    };
    public radarChartColors: {}[] = [{
        backgroundColor: [
            '#5d8aa8',
            '#e32636',
            '#efdecd',
            '#e52b50',
            '#ffbf00',
            '#ff033e',
            '#9966cc',
            '#a4c639',
            '#f2f3f4',
            '#cd9575',
            '#915c83',
            '#faebd7',
            '#008000'
        ]
    }]

    /* FORMS */
    public onDateRangeFormSubmit(formDateRange: FormDateRange): void {
        this.getDataInternal(formDateRange.startDate, formDateRange.endDate);
    }

    public onDateRangeQuickButtonClick(days: number): void {
        let range = this.dateRangeUtils.getIntlFormattedRangeForPastDays(days);
        this.getDataInternal(range['start'], range['end']);
    }
}