let HomePage=require('../pages/HomePage')
describe('check home page title and url', function() {
  it('check home page title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    browser.getTitle().then(title=>expect("Super Calculator").toEqual(title))
  });

  it('check page heading', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    browser.getTitle().then(title=>expect("Super Calculator").toEqual(HomePage.getPageHeadingText()))
  });
});
