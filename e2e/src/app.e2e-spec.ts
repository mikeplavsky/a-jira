import { browser, $$, element, by, logging } from 'protractor';

describe('products page', () => {

  beforeEach(() => {
  });

  it('should display products', () => {

    browser.get( browser.baseUrl );
    let es = element.all(by.css('.mat-card-title'));

    expect(es.getText()).toEqual( [
      'RMADFE', 'RMAZ', 'QMMP']);

  });

  it('should get product velocity', async () => {

    browser.get( browser.baseUrl );
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
      ["RMAZ", 10, 20], 
      ["QMMP", 5, 10]];

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
