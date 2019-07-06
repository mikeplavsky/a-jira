import { browser, by, logging } from 'protractor';
import { go, click, see, not, below, under} from 'blue-harvest';

describe('releases page', () => {

  beforeAll( async () => {

    await go( browser.baseUrl );
    await click('RMADFE');
    await click('Releases');

  });

  it ('should show releases', async () => {

    await see('10.1');
    await see('10.0');

  });
  
  it ('should show dates', async () => {

    await see(by.css("[id='10.1'] .startDate"));
    await see(by.css("[id='10.1'] .releaseDate"));

  });

  it ('should show in progress stats', async () => {

    await see(by.css("[id='10.1'] .days"));

    await see(by.css("[id='10.1'] .of-points"));
    await see(by.css("[id='10.1'] .of-features"));

    await see(by.css("[id='10.1'] .left-points"));
    await see(by.css("[id='10.1'] .left-features"));

    await see(by.css("[id='10.1'] .velocity"));
    await see(by.css("[id='10.1'] .left-sprints"));

  });

  it ('should show done release stats', async () => {

    await see(by.css("[id='10.0'] .days"));

    await see(by.css("[id='10.0'] .points"));
    await see(by.css("[id='10.0'] .features"));

    await not.see(by.css("[id='10.0'] .of-points"));
    await not.see(by.css("[id='10.0'] .of-features"));

    await not.see(by.css("[id='10.0'] .left-points"));
    await not.see(by.css("[id='10.0'] .left-features"));

    await see(by.css("[id='10.0'] .velocity"));
    await see(by.css("[id='10.0'] .left-sprints"));

  });

});

describe('products page', () => {

  beforeAll( async () => {
    await go( browser.baseUrl );
  });

  beforeEach(() => {
  });

  it('should display and hide menu', async () => {

    await click('RMADFE');

    await see('Sprint');
    await see('Epics');
    await see('Releases');

    await click(by.css('.cdk-overlay-backdrop'));

    await not.see('Sprint');
    await not.see('Epics');
    await not.see('Releases');

  });

  it('should display products', async () => {

    await see('RMADFE');
    await see('QMMP');
    await see('RMAZ');

  });

  it ('should show product velocity', async () => {

    await under('RMADFE').see(by.id(
      "RMADFE_velocity"
    ));

    await below('RMAZ').not.see(by.id(
      "RMADFE_velocity"
    ));

    await below('RMAZ').see(by.id(
      "RMAZ_velocity"
    ));

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
