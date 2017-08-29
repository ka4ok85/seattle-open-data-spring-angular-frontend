import { browser, by, element } from 'protractor';
import { SeattleOpenDataSpringAngularHourlyPage } from './hourly.po';

export class SeattleOpenDataSpringAngularHourlyByZipPage extends SeattleOpenDataSpringAngularHourlyPage {
  navigateTo() {
    return browser.get('/hourly/by-zip/98104');
  }
}