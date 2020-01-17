const {Given, When} = require('cucumber');
browser.ignoreSynchronization = true;

Given('User prints comment {text}', async (comment) => {
    return console.log(comment);
});

When('User navigates to the {detail} with url {url}', async (_, string) =>{
    console.log(string);
    return browser.get(string);
});

When('User enters {int} in {detail} {css}', (number, _, css) => {
    return element(by.css(css)).sendKeys(number);
});

When('User clicks {detail} {css}', (_, css) => {
    const elem = element(by.css(css));
    return elem.click();
});

When('User selects {string} from {detail} {css}', (operator, _, parentLocator) => {
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

When('User waits {int} seconds', function (seconds) {
    return browser.sleep(seconds * 1000);
});