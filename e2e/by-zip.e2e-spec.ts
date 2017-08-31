import { browser, by, element } from 'protractor';
import { SeattleOpenDataSpringAngularByZipPage } from './by-zip.po';
import { Helpers } from './helpers';

describe('seattle-open-data-spring-angular-frontend App', () => {
    let page: SeattleOpenDataSpringAngularByZipPage;
    let helpers: Helpers;

    beforeEach(() => {
        page = new SeattleOpenDataSpringAngularByZipPage();
        helpers = new Helpers();
    });

    it('should display header message', () => {
        page.navigateTo();
        expect(page.getHeaderText()).toEqual('Seattle 9-1-1 Calls');
    });

    it('should display sub-header message', () => {
        page.navigateTo();
        expect(page.getSubHeaderText()).toEqual('Emergency 9-1-1 calls reported in Seattle');
    });

    it('should display first graph header text', () => {
        page.navigateTo();
        let range = helpers.getFormattedDatesForLastNDays(30);
        expect(page.getFirstGraphHeaderText()).toEqual('Top 5 Calls zip codes from ' + range.startDate + ' to ' + range.endDate);
    });

    it('should display second graph header text', () => {
        page.navigateTo();
        let range = helpers.getFormattedDatesForLastNDays(30);
        expect(page.getSecondGraphHeaderText()).toEqual('Calls breakdown by zip code from ' + range.startDate + ' to ' + range.endDate);
    });

    it('should display quick date range header message', () => {
        page.navigateTo();
        expect(page.getQuickDateRangeHeaderText()).toEqual('Date Range');
    });

    it('should display date range form header message', () => {
        page.navigateTo();
        expect(page.getDateRangeFormHeaderText()).toEqual('Custom Date Range');
    });


    it('should display correct date range in headers after "Last 7 days" button clicked', () => {
        page.navigateTo();
        element(by.buttonText('Last 7 days')).click().then(function () {
            let range = helpers.getFormattedDatesForLastNDays(7);
            expect(page.getFirstGraphHeaderText()).toEqual('Top 5 Calls zip codes from ' + range.startDate + ' to ' + range.endDate);
            expect(page.getSecondGraphHeaderText()).toEqual('Calls breakdown by zip code from ' + range.startDate + ' to ' + range.endDate);
        });
    });

    it('should display correct date range in headers after "Last 30 days" button clicked', () => {
        page.navigateTo();
        element(by.buttonText('Last 30 days')).click().then(function () {
            let range = helpers.getFormattedDatesForLastNDays(30);
            expect(page.getFirstGraphHeaderText()).toEqual('Top 5 Calls zip codes from ' + range.startDate + ' to ' + range.endDate);
            expect(page.getSecondGraphHeaderText()).toEqual('Calls breakdown by zip code from ' + range.startDate + ' to ' + range.endDate);
        });
    });

    it('should display correct date range in headers after "Last 90 days" button clicked', () => {
        page.navigateTo();
        element(by.buttonText('Last 90 days')).click().then(function () {
            let range = helpers.getFormattedDatesForLastNDays(90);
            expect(page.getFirstGraphHeaderText()).toEqual('Top 5 Calls zip codes from ' + range.startDate + ' to ' + range.endDate);
            expect(page.getSecondGraphHeaderText()).toEqual('Calls breakdown by zip code from ' + range.startDate + ' to ' + range.endDate);
        });
    });

    it('should display correct date range in headers after "Last 360 days" button clicked', () => {
        page.navigateTo();
        element(by.buttonText('Last 360 days')).click().then(function () {
            let range = helpers.getFormattedDatesForLastNDays(360);
            expect(page.getFirstGraphHeaderText()).toEqual('Top 5 Calls zip codes from ' + range.startDate + ' to ' + range.endDate);
            expect(page.getSecondGraphHeaderText()).toEqual('Calls breakdown by zip code from ' + range.startDate + ' to ' + range.endDate);
        });
    });

    it('should display correct date range in headers after "Query" button clicked', () => {
        page.navigateTo();

        // scroll first
        element(by.buttonText('Query')).getLocation().then(function (navDivLocation) {
            var initTop = (navDivLocation.y - 150) > 0 ? navDivLocation.y - 150 : 1;
            var initLeft = navDivLocation.x; browser.executeScript('window.scrollTo(' + initLeft + ',' + initTop + ');');
        });

        element(by.buttonText('Query')).click().then(function () {
            let range = helpers.getFormattedDatesForForm();
            expect(page.getFirstGraphHeaderText()).toEqual('Top 5 Calls zip codes from ' + range.startDate + ' to ' + range.endDate);
            expect(page.getSecondGraphHeaderText()).toEqual('Calls breakdown by zip code from ' + range.startDate + ' to ' + range.endDate);
        });
    });

    it('blank start date should rise an error message', () => {
        page.navigateTo();

        // scroll first
        element(by.buttonText('Query')).getLocation().then(function (navDivLocation) {
            var initTop = (navDivLocation.y - 350) > 0 ? navDivLocation.y - 350 : 1;
            var initLeft = navDivLocation.x; browser.executeScript('window.scrollTo(' + initLeft + ',' + initTop + ');');
        });

        element(by.css('div#start-date my-date-picker div div div button.btnclear')).click().then(function () {
            expect(element(by.css('div#start-date div.alert')).getText()).toEqual('Start Date is required!');
        });
    });

    it('blank end date should rise an error message', () => {
        page.navigateTo();

        // scroll first
        element(by.buttonText('Query')).getLocation().then(function (navDivLocation) {
            var initTop = (navDivLocation.y - 350) > 0 ? navDivLocation.y - 350 : 1;
            var initLeft = navDivLocation.x; browser.executeScript('window.scrollTo(' + initLeft + ',' + initTop + ');');
        });

        element(by.css('div#end-date my-date-picker div div div button.btnclear')).click().then(function () {
            expect(element(by.css('div#end-date div.alert')).getText()).toEqual('End Date is required!');
        });
    });

    it('start date greater then end date should rise an error message', () => {
        page.navigateTo();

        // scroll first
        element(by.buttonText('Query')).getLocation().then(function (navDivLocation) {
            var initTop = (navDivLocation.y - 350) > 0 ? navDivLocation.y - 350 : 1;
            var initLeft = navDivLocation.x; browser.executeScript('window.scrollTo(' + initLeft + ',' + initTop + ');');
        });

        // 2 months forward for start date
        element(by.css('div#start-date my-date-picker div div div button.btnpicker')).click().then(function () {
            element.all(by.css('div#start-date my-date-picker div div table.header button.icon-mydpright')).first().click().then(function () {
                element.all(by.css('div#start-date my-date-picker div div table.header button.icon-mydpright')).first().click().then(function () {
                    element.all(by.css('div#start-date my-date-picker div div table.caltable td.currmonth')).first().click().then(function () {
                        expect(element(by.css('div#end-date div.alert')).getText()).toEqual('End Date must be after Start Date!');
                    });
                });
            });
        });
    });

    it('end date less then start date should rise an error message', () => {
        page.navigateTo();

        // scroll first
        element(by.buttonText('Query')).getLocation().then(function (navDivLocation) {
            var initTop = (navDivLocation.y - 350) > 0 ? navDivLocation.y - 350 : 1;
            var initLeft = navDivLocation.x; browser.executeScript('window.scrollTo(' + initLeft + ',' + initTop + ');');
        });

        // 2 months back for end date
        element(by.css('div#end-date my-date-picker div div div button.btnpicker')).click().then(function () {
            element.all(by.css('div#end-date my-date-picker div div table.header button.icon-mydpleft')).first().click().then(function () {
                element.all(by.css('div#end-date my-date-picker div div table.header button.icon-mydpleft')).first().click().then(function () {
                    element.all(by.css('div#end-date my-date-picker div div table.caltable td.currmonth')).first().click().then(function () {
                        expect(element(by.css('div#end-date div.alert')).getText()).toEqual('End Date must be after Start Date!');
                    });
                });
            });
        });
    });

    it('should display correct Title', () => {
        page.navigateTo();
        browser.getTitle().then(function (webpagetitle) {
            expect(webpagetitle).toEqual('DEV Seattle Open Data 911 Calls | By Zip');
        });
    });

});