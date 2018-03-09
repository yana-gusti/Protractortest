const {Then} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;


Then(/^Page title is equal to "([^"]*)"$/, (title) => {
    return expect(browser.getTitle()).to.eventually.equal(title);
});

Then(/^History "([^"]*)" is equal to (\d+)$/, (repeater, count) => {
    return expect(element.all(by.repeater(repeater)).count()).to.eventually.equal(count);
});

