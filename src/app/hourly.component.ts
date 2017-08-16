import { Component } from '@angular/core';
import { FormDateRange } from "./core/models/form-date-range";
import { DateUpdatesService } from './core/services/date-updates.service';

@Component({
    selector: '',
    templateUrl: './templates/hourly.html',
    styles: ['']
})

export class HourlyComponent {

    constructor(private dateUpdatesService: DateUpdatesService) { }

    public days;
    public onDateRangeQuickButtonClick(days: number): void {
        this.dateUpdatesService.passDays(days);
    }

    public onDateRangeFormSubmit(formDateRange: FormDateRange): void {
        this.dateUpdatesService.passDateRange(formDateRange);
    }
}