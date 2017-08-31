export class Helpers {

    public padNumber(num: number, size: number): string {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    public getFormattedDatesForLastNDays(days: number) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let endDate = this.padNumber(month, 2) + '/' + this.padNumber(day, 2) + '/' + year

        date.setDate(date.getDate() - days);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();

        let startDate = this.padNumber(month, 2) + '/' + this.padNumber(day, 2) + '/' + year

        return { 'startDate': startDate, 'endDate': endDate };
    }

    public getFormattedDatesForForm() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        let startDate = this.padNumber(month, 2) + '/' + this.padNumber(day, 2) + '/' + year;
        let endDate = this.padNumber(month + 1, 2) + '/' + this.padNumber(day, 2) + '/' + year;

        return { 'startDate': startDate, 'endDate': endDate };
    }
}



