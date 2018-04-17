const {Given, When} = require('cucumber');
const pageObjects = require('../../test-data/page-objects');

Given(/^User prints comment "([^"]*)"$/, (comment) => {
    return console.log(comment);
});

When('User navigates to the Calculator page with url {css}', function (string) {
    return browser.get(string);
});

When(/^User enters (\d+) in field "([^"]*)"$/, (number, model) => {
    return element(by.model(model)).sendKeys(number);
});

When(/^User clicks Go Button "([^"]*)"$/, (id) => {
    const elem = element(by.id(id));
    return elem.click();
});

When(/^User selects "([^"]*)" from dropdown "([^"]*)"$/, (operator, parentLocator) => {
    const selector = element(by.css(parentLocator));
    const option = selector.all(by.css("option")).filter(function (item) {
        return item.getText().then(function (text) {
            if (text == operator) {
                return true;
            }
        })
    }).first();

    return option.click();
});

When(/^User clicks Go Button$/, () => {
    const elem = element(by.id(pageObjects.mainPage.goButton));
    return elem.click();
});

When(/^User enters (\d+) in "([^"]*)" field$/, (number, field) => {
    switch (field) {
        case ("first"):
            return element(by.model(pageObjects.mainPage.firstfield)).sendKeys(number);
        case ("second"):
            return element(by.model(pageObjects.mainPage.secondfield)).sendKeys(number);
        default:
            return true;
    }

});