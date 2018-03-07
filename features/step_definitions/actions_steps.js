const {defineSupportCode} = require('cucumber');
const pageObjects = require('../../test-data/page-objects');

defineSupportCode(({Given, When}) => {
    Given(/^User prints comment "([^"]*)"$/, (comment) => {
        return console.log(comment);
    });

    When(/^User navigates to the Calculator page$/, () => {
        return browser.get(pageObjects.calculatorPage.url);
    });

    When(/^User enters (\d+) in field "([^"]*)"$/, (number, model) => {
        return element(by.model(model)).sendKeys(number);
    });

    When(/^User clicks Go Button "([^"]*)"$/, (id) => {
        return element(by.id(id)).click();
    });


});