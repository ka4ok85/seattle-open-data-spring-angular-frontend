import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions, IMyOptions, IMyInputFieldChanged } from 'mydatepicker';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styles: ['.home {background: red}']
})

export class HomeComponent {

  theDataSource: Observable<string>;
  thePieDataSource: Observable<string>;
  apiURL: string;
  labels: Array<string> = [];
  days: Number;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
    width: '150px',
    editableDateField: false,
  };

  public rangeFormModel: FormGroup;

  public lineChartData: Array<any> = [{ data: [] }];
  public lineChartLabels: Array<any> = [];
  public pieChartLabels: String[] = [];
  public pieChartData: String[] = [];
  public pieChartColors: {}[] = [{
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
      '#008000',
      '#8db600',
      '#fbceb1',
      '#00ffff',
      '#7fffd4',
      '#4b5320',
      '#e9d66b',
      '#b2beb5',
      '#87a96b',
      '#ff9966',
      '#a52a2a',
      '#fdee00',
      '#6e7f80',
      '#ff2052',
      '#007fff',
      '#f0ffff',
      '#89cff0',
      '#a1caf1',
      '#f4c2c2',
      '#21abcd',
      '#fae7b5',
      '#ffe135',
      '#848482',
      '#98777b',
      '#bcd4e6',
      '#9f8170',
      '#f5f5dc',
      '#ffe4c4',
      '#3d2b1f',
      '#fe6f5e',
      '#000000',
      '#ffebcd',
      '#318ce7',
      '#ace5ee',
      '#faf0be',
      '#0000ff',
      '#a2a2d0',
      '#6699cc',
      '#0d98ba',
      '#8a2be2',
      '#de5d83',
      '#79443b',
      '#0095b6',
      '#e3dac9',
      '#cc0000',
      '#006a4e',
      '#873260',
      '#0070ff',
      '#b5a642',
      '#cb4154',
      '#1dacd6',
      '#66ff00',
      '#bf94e4',
      '#c32148',
      '#ff007f',
      '#08e8de',
      '#d19fe8',
      '#f4bbff',
      '#ff55a3',
      '#fb607f',
      '#004225',
      '#cd7f32',
      '#a52a2a',
      '#ffc1cc',
      '#e7feff',
      '#f0dc82',
      '#480607',
      '#800020',
      '#deb887',
      '#cc5500',
      '#e97451',
      '#8a3324',
      '#bd33a4',
      '#702963',
      '#007aa5',
      '#e03c31'
    ]
  }];

  constructor(private http: Http, private route: ActivatedRoute, formBuilder: FormBuilder) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    this.rangeFormModel = formBuilder.group({
      startdate: [{ date: { year: year, month: month, day: day } }, Validators.required], // month mismatch
      enddate: [{ date: { year: year, month: month + 1, day: day } }, Validators.required]
    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { envSpecific: EnvSpecific }) => {
        this.apiURL = data.envSpecific.apiURL;
      });

    this.getData(90);
  }

  private getDataInternal(startDate: string, endDate: string) {
    console.log(this.apiURL);
    this.theDataSource = this.http.get(this.apiURL + 'calls/count/' + startDate + '/' + endDate).map(res => res.json());
    this.thePieDataSource = this.http.get(this.apiURL + 'calls/count/per-type/' + startDate + '/' + endDate).map(res => res.json());
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
      err => console.log("Can't get Counts. Error code: %s, URL: %s ", err.status, err.url),
      () => console.log('Counts are retrieved')
    );

    this.thePieDataSource.subscribe(
      data => {
        let dataLabels: String[] = [];
        let dataCounts: String[] = [];
        for (let i = 0; i < data.length; i++) {
          dataLabels.push(data[i][1]);
          dataCounts.push(data[i][0]);
        }

        this.buildPieChart(dataLabels, dataCounts);
      },
      err => console.log("Can't get Pie Chart Counts. Error code: %s, URL: %s ", err.status, err.url),
      () => console.log('Pie Chart Counts are retrieved')
    );
  }


  public getData(days: number) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let endDateFormatted: string = year + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);

    date.setDate(date.getDate() - days);
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    let startDateFormatted: string = year + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);

    this.getDataInternal(startDateFormatted, endDateFormatted);
  }

  private buildLineChart(labels: String[], dataCounts: String[]) {
    this.lineChartData = [{ data: dataCounts, label: '911 Calls #' }];
    let labelsCount = this.lineChartLabels.length;
    for (var index = 0; index < labelsCount; index++) {
      this.lineChartLabels.pop();
    }

    for (let label of labels) {
      this.lineChartLabels.push(label);
    }
  }

  private buildPieChart(labels: String[], dataCounts: String[]) {
    this.pieChartColors.length = 0;
    this.pieChartData = dataCounts;
    let labelsCount = this.pieChartLabels.length;
    for (var index = 0; index < labelsCount; index++) {
      this.pieChartLabels.pop();
    }

    // Init colors
    var colorObject = {
      backgroundColor: []
    };

    for (let label of labels) {
      this.pieChartLabels.push(label);
      //colorObject.backgroundColor.push('red');
    }

    //this.pieChartColors.push(colorObject); // controlled dynamic color set is not needed for now
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

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

  public pieChartType: string = 'pie';

  // events
  public chartPieClicked(e: any): void {
    console.log(e);
  }

  public chartPieHovered(e: any): void {
    console.log(e);
  }


  public pieChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: "right"
    }
  };

  onDatepickerFormSubmit(): void {

    let startDateObject = this.rangeFormModel.controls['startdate'].value.date;
    let startDateFormatted: string = startDateObject.year + '-' + this.pad(startDateObject.month, 2) + '-' + this.pad(startDateObject.day, 2);

    let endDateObject = this.rangeFormModel.controls['enddate'].value.date;
    let endDateFormatted: string = endDateObject.year + '-' + this.pad(endDateObject.month, 2) + '-' + this.pad(endDateObject.day, 2);

    this.getDataInternal(startDateFormatted, endDateFormatted);
  }

  pad(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

}