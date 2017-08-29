import { browser, by, element } from 'protractor';
import { SeattleOpenDataSpringAngularHourlyPage } from './hourly.po';

export class SeattleOpenDataSpringAngularHourlyByTypePage extends SeattleOpenDataSpringAngularHourlyPage {
  navigateTo() {
    return browser.get('/hourly/by-type/Aid%20Response');
  }
}