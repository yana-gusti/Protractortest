const {Given, When} = require('cucumber');
const pageObjects = require('../../test-data/page-objects');

Given('User prints comment {string}', function (comment) {
    return console.log(comment);
});

When('User navigates to the Calculator page', function () {
    return browser.get(pageObjects.calculatorPage.url);
});

When('User enters {int} in field {string}', function (number, model) {
    return element(by.model(model)).sendKeys(number);
});

When('User clicks Go Button {string}', function (id) {
    return element(by.id(id)).click();
});