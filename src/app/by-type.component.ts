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
    templateUrl: './templates/by-type.html',
    styles: ['']
})

export class ByTypeComponent {
    theDataSource: Observable<string>;
    apiURL: string;
    days: Number;

    busy: Promise<any>;

    public rawData = [];
    public barChartData: Array<any> = [{ data: [] }];
    public barChartLabels: string[] = [];

    constructor(private http: Http, private route: ActivatedRoute, private dateRangeUtils: DateRangeUtils) {

    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.apiURL = data.envSpecific.apiURL;
            });

        this.getData(30);
    }

    private getDataInternal(startDate: string, endDate: string) {
        this.theDataSource = this.http.get(this.apiURL + 'calls/count/per-type/' + startDate + '/' + endDate).map(res => res.json());
        this.busy = this.theDataSource.toPromise();
        //this.days = days;
        this.rawData = [];

        // Get the data from the REST server
        this.theDataSource.subscribe(
            data => {
                let dataLabels: string[] = [];
                let dataCounts: string[] = [];

                for (let i = 0; i < data.length; i++) {
                    this.rawData.push([data[i][0], data[i][1]]);
                }

                this.rawData.sort(function (count1, count2) {
                    if (count1[0] < count2[0]) {
                        return 1;
                    } else if (count1[0] > count2[0]) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                let limit: number;
                if (this.rawData.length > 5) {
                    limit = 5;
                } else {
                    limit = this.rawData.length;
                }

                for (let i = 0; i < limit; i++) {
                    dataLabels.push(this.rawData[i][1]);
                    dataCounts.push(this.rawData[i][0]);
                }

                this.buildBarChart(dataLabels, dataCounts);
            },
            err => console.log("Can't get Counts. Error code: %s, URL: %s ", err.status, err.url),
            () => console.log('Counts are retrieved')
        );

    }

    public getData(days: number) {
        let range = this.dateRangeUtils.getIntlFormattedRangeForPastDays(days);
        this.getDataInternal(range['start'], range['end']);
    }

    /* CHARTS */
    private buildBarChart(labels: string[], dataCounts: string[]) {
        this.barChartData = [{ data: dataCounts, label: 'Top 5 Call Types' }];
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