const {Then} = require('cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const helper = require('../support/helper');
const moment = require('moment');


Then('Page title is equal to {text}', async (expectedTitle) => {
    const actualTitle = await browser.getTitle();
    console.log("Actual title: " + actualTitle);
    console.log("Expected title: " + expectedTitle);
    return expect(actualTitle).to.equal(expectedTitle);
});

Then('{detail} {css} is displayed', function (_, cssLocator) {
    const elem = element(by.css(cssLocator));
    return expect(helper.isElementVisible(elem)).to.eventually.equal(true);
});

Then('{detail} {css} with text {text} is displayed', async (_, cssLocator, text)=> {
    console.log(text);
    const elem = element(by.cssContainingText(cssLocator, text));
    const elementText = await elem.getText();
    console.log(elementText);
    return expect(await helper.isElementVisible(elem)).to.equal(true);
});

Then('History {css} is equal to {int}', (repeater, count) => {
    return expect(element.all(by.repeater(repeater)).count()).to.eventually.equal(count);
});

Then('Result {css} is equal to {string}', (resultLocator, number) => {
    const result = element(by.css(resultLocator));
    console.log("test1");
    return result.getText().then(function (text) {
        console.log(text);
        return expect(text).to.equal(number);
    });
});

Then('Table cell {css} with text {string} is displayed', (locator, text) => {
    const elem = element(by.cssContainingText(locator, text));
    return expect(elem.isDisabled()).to.eventually.equal(true);
});


Then('Table {css} match data:', async (locator, table) => {
    const expectedTable = table.hashes();
    const actual = element(by.css(locator));
    const actualTable = await helper.getTableContentAsJSON(actual);
    if ("Time" in actualTable[0]) {
        for (let i = 0; i < expectedTable.length; i++) {
            let actualTime = actualTable[i].Time;
            actualTime = moment(moment(actualTime, 'LTS')).format('LT');
            let expectedTime = moment().format('LT');
            actualTable[i]["Time"] = actualTime;
            expectedTable[i]["Time"] = expectedTime;
            console.log(expectedTable[i]);
            console.log(actualTable[i]);
            expect(actualTable[i]).to.deep.equal(expectedTable[i]);
        }
    } else {
        expect(actualTable).to.include.deep.members(expectedTable);
    }

});

Then('Table {css} contains data:', async (locator, table) => {
    const expectedTable = table.hashes();
    const actual = element(by.css(locator));
    const actualTable = await helper.getTableContentAsJSON(actual);

    for (let i = 0; i < expectedTable.length; i++) {
            expect(actualTable[i]).to.contains(expectedTable[i]);
    }
});

Then('User verify downloaded file {text} hash is equal to {hash}', function (fileName, hash) {
    return expect(helper.getFileHash(fileName)).to.eventually.equal(hash);
});

