import { SeattleOpenDataSpringAngularFrontendPage } from './app.po';

describe('seattle-open-data-spring-angular-frontend App', () => {
  let page: SeattleOpenDataSpringAngularFrontendPage;

  beforeEach(() => {
    page = new SeattleOpenDataSpringAngularFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
