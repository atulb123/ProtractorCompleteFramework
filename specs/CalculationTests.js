let HomePage=require('../pages/HomePage')
describe('Validate addition operation', function() {
    it('check addition of two numbers', function() {
      browser.get('http://juliemr.github.io/protractor-demo/');
      HomePage.enterNumberInFirstTextBox("2")
      HomePage.enterNumberInSecondTextBox("2")
      HomePage.clickGoButton()
      expect("4").toEqual(HomePage.getCalculationResult());
    });
  });