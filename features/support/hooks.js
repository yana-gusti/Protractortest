//Multiple Before hooks are executed in the order that they were defined. Multiple After hooks are executed in the reverse order that they were defined.
const {After, Status} = require('cucumber');

//https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/attachments.md

After(function(scenario) {
    var attach;
    if (scenario.result.status === Status.FAILED) {
        attach = this.attach; // cucumber's world object has attach function which should be used
        return browser.takeScreenshot().then(function(png) {
            const decodedImage = new Buffer(png, "base64");
            return attach(decodedImage, "image/png");
        });
    }

});