import { browser, by, element } from 'protractor';

export class SeattleOpenDataSpringAngularHourlyPage {
  navigateTo() {
    return browser.get('/hourly');
  }

  /* Sections */
  getMainSection() {
    return element(by.css('app-root ng-component section#hourly'));
  }

  getMainHeaderSection() {
    return this.getMainSection().all(by.css('div.container')).first();
  }

  getMainBodySection() {
    return this.getMainSection().all(by.css('div.container')).last();
  }

  getMainBodyFirstRowSection() {
    return this.getMainBodySection().all(by.css('div.row')).first();
  }

  getMainBodyFirstRowLeftSection() {
    return this.getMainBodyFirstRowSection().all(by.css('div')).first();
  }

  getMainBodyFirstRowRightSection() {
    return this.getMainBodyFirstRowSection().all(by.css('div')).last();
  }

  /* Texts */
  getHeaderText() {
    return this.getMainHeaderSection().element(by.css('div.row div div.section-heading div h2')).getText();
  }

  getSubHeaderText() {
    return this.getMainHeaderSection().element(by.css('div.row div div.section-heading p')).getText();
  }

  getFirstGraphHeaderText() {
    return this.getMainBodyFirstRowLeftSection().element(by.css('h3')).getText();
  }

  getQuickDateRangeHeaderText() {
    return this.getMainBodyFirstRowSection().element(by.css('div #date-filters daterangequickbuttons h3')).getText();
  }

  getDateRangeFormHeaderText() {
    return this.getMainBodyFirstRowSection().all(by.css('div #date-filters daterangeform h3')).last().getText();
  }

}