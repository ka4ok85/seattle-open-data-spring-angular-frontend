import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dateRangeQuickButtons',
    templateUrl: './templates/date-range-quick-buttons.html',
    styles: ['']
})

export class DateRangeQuickButtonsComponent {

    @Output() onDateRangeQuickButtonClick = new EventEmitter<number>();

    public getData(days: number) {
        this.onDateRangeQuickButtonClick.emit(days);
    }
}