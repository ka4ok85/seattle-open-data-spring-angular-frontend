import { Injectable } from '@angular/core';
import { IMyDate } from 'mydatepicker';
import { FormDateRange } from "../models/form-date-range";

@Injectable()
export class DateRangeUtils {

    public dateToIntlFormattedString(date: IMyDate): string {
        let dateFormatted: string = date.year + '-' + this.pad(date.month, 2) + '-' + this.pad(date.day, 2);

        return dateFormatted;
    }

    public pad(num: number, size: number): string {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    public getIntlFormattedRangeForPastDays(days: number) {
        let result: Array<string> = [];

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let iMyDate = { year: year, month: month, day: day }
        let endDateFormatted: string = this.dateToIntlFormattedString(iMyDate);

        date.setDate(date.getDate() - days);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();

        iMyDate = { year: year, month: month, day: day }
        let startDateFormatted: string = this.dateToIntlFormattedString(iMyDate);

        result['start'] = startDateFormatted;
        result['end'] = endDateFormatted;

        return result;
    }


    public getFormDateRangeForPastDays(days: number) {
        let result: Array<string> = [];

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let iMyDate = { year: year, month: month, day: day }
        let endDateFormatted: string = this.dateToIntlFormattedString(iMyDate);

        date.setDate(date.getDate() - days);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();

        iMyDate = { year: year, month: month, day: day }
        let startDateFormatted: string = this.dateToIntlFormattedString(iMyDate);

        let formDateRange: FormDateRange = new FormDateRange();
        formDateRange.startDate = startDateFormatted;
        formDateRange.endDate = endDateFormatted;

        return formDateRange;
    }
}