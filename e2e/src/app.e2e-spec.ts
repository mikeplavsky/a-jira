import { browser, element, by, logging } from 'protractor';

describe('jira app', () => {

  beforeEach(() => {
  });

  it('should display products', () => {

    browser.get( browser.baseUrl );
    let es = element.all(by.css('.mat-card-title'));

    expect(es.getText()).toEqual( [
      'RMADFE', 'RMAZ', 'QMMP']);

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
