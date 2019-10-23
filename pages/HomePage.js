let HomePage = function () {
    let pageHeadingTxt = element(by.css('div>h3'));
    let firstTextBox = element(by.model('first'));
    let secondTextBox = element(by.model('second'));
    let goButton = element(by.id('gobutton'));
    let resultTextBlock = element(by.css('h2[class*="ng-binding"]'));

    this.enterNumberInFirstTextBox = function (number) {
        firstTextBox.sendKeys(number);
    }

    this.enterNumberInSecondTextBox = function (number) {
        secondTextBox.sendKeys(number);
    }

    this.getPageHeadingText = function () {
        return pageHeadingTxt.getText().then(pageName=>{return pageName})
    }

    this.clickGoButton=function(){
        goButton.click()
    }

    this.getCalculationResult = function () {
        return resultTextBlock.getText().then(result=>{return result})
    }
}
module.exports=new HomePage();