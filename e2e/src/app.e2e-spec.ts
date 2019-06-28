import { browser, $$, by, logging } from 'protractor';
import { go, click, see, not, find} from 'blue-harvest';

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

  it('should get product velocity', async () => {

    const hs = $$('.mat-card-header');
    const ps: {product,velocity}[] = await hs.map( async (elm, idx) => {

      const product = elm.element(
        by.css('.mat-card-title')).getText();

      const velocityTxt = await elm.element(
        by.css('.mat-card-subtitle')).getText();

      const velocity = parseFloat(velocityTxt);
      return {product,velocity};

    });

    const compare = (
      idx: number,
      product: string, 
      velocityLow: number,
      velocityHigh: number) => {

    expect(ps[idx].product).toEqual( product );
    expect(ps[idx].velocity).toBeGreaterThan( velocityLow );
    expect(ps[idx].velocity).toBeLessThan( velocityHigh );

    };

    const check: [string, number, number][] = [
      ['RMADFE', 30, 45],
      ['RMAZ', 7, 20],
      ['QMMP', 2, 10]];

    check.forEach(
      (v, idx) => compare(idx, ...v));

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
