import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormDateRange } from "../models/form-date-range";

@Injectable()
export class DateUpdatesService {

    // Observable string sources
    private dateRangePassedSource = new Subject<FormDateRange>();
    private daysPassedSource = new Subject<number>();

    // Observable string streams
    dateRangePassed$ = this.dateRangePassedSource.asObservable();
    daysPassed$ = this.daysPassedSource.asObservable();

    // Service message commands
    passDateRange(dateRange: FormDateRange) {
        this.dateRangePassedSource.next(dateRange);
    }

    passDays(days: number) {
        this.daysPassedSource.next(days);
    }
}