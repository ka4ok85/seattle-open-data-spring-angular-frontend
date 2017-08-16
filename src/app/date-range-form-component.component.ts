import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';
import { DateRangeUtils } from "./core/services/date-range-utils.service";
import { FormDateRange } from "./core/models/form-date-range";

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions, IMyOptions, IMyInputFieldChanged, IMyDate } from 'mydatepicker';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'dateRangeForm',
  templateUrl: './templates/date-range-form.html',
  styles: ['']
})

export class DateRangeFormComponent {

  @Output() onDateRangeFormSubmit = new EventEmitter<FormDateRange>();

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
    width: '130px',
    editableDateField: false,
  };

  public rangeFormModel: FormGroup;
  public rangeForm: FormGroup;
  private angulartics2: Angulartics2;

  constructor(private http: Http, private route: ActivatedRoute, formBuilder: FormBuilder, private dateRangeUtils: DateRangeUtils, angulartics2: Angulartics2) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    this.angulartics2 = angulartics2;

    // sub-form
    this.rangeForm = formBuilder.group(
      {
        startdate: [{ date: { year: year, month: month, day: day } }, Validators.required],
        enddate: [{ date: { year: year, month: month + 1, day: day } }, Validators.required]
      },
      {
        validator: this.startEndDatesRangeValidator.bind(this)
      }
    );

    // main form
    this.rangeFormModel = formBuilder.group({
      'rangeForm': this.rangeForm
    });
  }

  ngOnInit() {
  }

  /* FORMS */
  public onDatepickerFormSubmit(): void {
    let startDateObject = this.rangeForm.controls['startdate'].value.date;
    let startDateFormatted: string = this.dateRangeUtils.dateToIntlFormattedString(startDateObject);

    let endDateObject = this.rangeForm.controls['enddate'].value.date;
    let endDateFormatted: string = this.dateRangeUtils.dateToIntlFormattedString(endDateObject);

    let formDateRange: FormDateRange = new FormDateRange();
    formDateRange.startDate = startDateFormatted;
    formDateRange.endDate = endDateFormatted;

    // google analytics event
    this.angulartics2.eventTrack.next({ action: 'Date Range Form Submit', properties: { category: 'Date Range', label: 'Date Range Form Submitted' } });

    this.onDateRangeFormSubmit.emit(formDateRange);
  }

  private startEndDatesRangeValidator(group: FormGroup) {
    if (!group.controls.startdate || !group.controls.startdate.value || !group.controls.enddate || !group.controls.enddate.value) return;

    let startDate = group.controls.startdate.value.date;
    let endDate = group.controls.enddate.value.date;

    let startDateNumber: number = startDate.year * 10000 + startDate.month * 100 + startDate.day;
    let endDateNumber: number = endDate.year * 10000 + endDate.month * 100 + endDate.day;

    if (startDateNumber > endDateNumber) {
      return {
        badRange: true
      };
    }
  }

}