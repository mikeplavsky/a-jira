import { browser, $$, element, by, logging } from 'protractor';
import { go, click } from 'blue-harvest';
import { protractor } from 'protractor/built/ptor';

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
      async (el,idx) => {

        await browser.wait(
          EC.elementToBeClickable(el));

        return el.getText()

    });

    expect(actions).toEqual(["Sprint", "Epics", "Releases"]);

  });

  it('should display products', async () => {

    let es = $$('.mat-card-title');

    expect(es.getText()).toEqual( [
      'RMADFE', 'RMAZ', 'QMMP']);

  });

  it('should get product velocity', async () => {

    let hs = $$('.mat-card-header');
    let ps: {product,velocity}[] = await hs.map( async (elm, idx) => {

      let product = elm.element(
        by.css('.mat-card-title')).getText();

      let velocity_txt = await elm.element(
        by.css('.mat-card-subtitle')).getText();
      
      let velocity = parseFloat(velocity_txt);
      return {product,velocity};

    });
    
    let compare = (
      idx: number, 
      product: string, 
      velocity_low: number,
      velocity_high: number) => {

      expect(ps[idx].product).toEqual( product );
      expect(ps[idx].velocity).toBeGreaterThan( velocity_low );
      expect(ps[idx].velocity).toBeLessThan( velocity_high );

    };

    let check: [string,number, number][]= [
      ["RMADFE", 30, 40], 
      ["RMAZ", 9, 20], 
      ["QMMP", 2, 10]];

    check.forEach(
      (v,idx) => compare(idx, ...v));

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
