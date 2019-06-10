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

    let ps = await hs.map( (elm, idx) => {

      let product = elm.element(
        by.css('.mat-card-title')).getText();

      let velocity = elm.element(
        by.css('.mat-card-subtitle')).getText();

      return {product,velocity};

    });

    expect(ps[0]).toEqual({product: "RMADFE", velocity: '36'});
    expect(ps[1]).toEqual({product: "RMAZ", velocity: '12.3'});
    expect(ps[2]).toEqual({product: "QMMP", velocity: '6.7'});
    
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
