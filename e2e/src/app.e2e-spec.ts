import { browser, logging } from 'protractor';

describe('workspace-project App', () => {

  beforeEach(() => {
  });

  it('should display welcome message', () => {
    browser.get("http://localhost:4200");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
