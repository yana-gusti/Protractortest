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

Then(/^Result "([^"]*)" is equal to "([^"]*)"$/, (resultLocator, number) => {
    const result = element(by.css(resultLocator));
    console.log("test1");
    return result.getText().then(function (text) {
        console.log(text);
        return expect(text).to.equal(number);
    });
});

Then(/^Table cell "([^"]*)" with text "([^"]*)" is displayed$/, (locator, text) => {
    const elem = element(by.cssContainingText(locator, text));
    return expect(elem.isDisabled()).to.eventually.equal(true);
});


Then(/^Table "([^"]*)" match data:$/, (locator, table) => {
    const headers = [];
    const values = [];
    const expectedTable = table.hashes();
    const actualTable = element(by.css(locator));
    const actual = actualTable.all(by.css("thead tr th")).each(function (header, i) {
        header.getText().then(function (text) {
            headers[i]=text;
        });
    }).then(function () {
        actualTable.all(by.css("tbody tr")).each(function (row) {
            let rowAsJson = {};
            row.all(by.css("td")).each(function (cell, i) {
                cell.getText().then(function (text) {
                    rowAsJson[headers[i]]=text;
                });
            });
            values.push(rowAsJson);

        });
    }).then(function () {
        console.log("____________________________!!!!!!!");
        console.log(values);
        return values;
    });

    console.log(expectedTable);
    console.log("____________________________");
    console.log(actual);
    return expect(actual).to.deep.eventually.equal(expectedTable);

});
