import { browser, $$, element, by, logging } from 'protractor';
import { go, click, inside, rightOf } from 'blue-harvest';
import { protractor } from 'protractor/built/ptor';
import { debug } from 'util';

describe('releases page', () => {

  beforeAll( async () => {

    await go( browser.baseUrl );

    const hs = await $$('.mat-card-header');
    await hs[0].click();

    const EC = new protractor.ProtractorExpectedConditions();

    const actions = await $$('.mat-list-item .mat-line');
    await browser.wait(EC.elementToBeClickable(actions[2]));

    await actions[2].click();

  });

  it ('should show releases', async () => {

    const hs = $$('.mat-card-header');

    const releases = await hs.map( async (elm) => {
       return  elm.element(
        by.css('.mat-card-title')).getText(); });

    expect(releases.slice(0, 2)).toEqual(
      ['10.1', '10.0.1']);

  });

});

describe('products page', () => {

  beforeAll( async () => {
    await go( browser.baseUrl );
  });

  beforeEach(() => {
  });

  it('should display menu', async () => {

    const EC = new protractor.ProtractorExpectedConditions();

    const hs = await $$('.mat-card-header');
    await hs[0].click();

    const actions = await $$('.mat-list-item .mat-line').map(
      async (el) => {

        await browser.wait(
          EC.elementToBeClickable(el));
        return el.getText();

    });

    expect(actions).toEqual(['Sprint', 'Epics', 'Releases']);

  });

  it('should display products', async () => {

    const es = $$('.mat-card-title');

    expect(es.getText()).toEqual([
      'RMADFE', 'RMAZ', 'QMMP']);

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
