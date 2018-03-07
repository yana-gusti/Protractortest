//Multiple Before hooks are executed in the order that they were defined. Multiple After hooks are executed in the reverse order that they were defined.
const {defineSupportCode, Status} = require('cucumber');
const fileHelper = require('../../features/step-definitions/file-helper.js');

//https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/attachments.md
defineSupportCode(function ({Before}) {
    Before(function () {
        return browser.waitForAngularEnabled(false);
    });
});

defineSupportCode(function({After}) {
    After(function () {
        browser.restart();
    });

    After(function (testCase) {
        var world = this;
        if (testCase.result.status === Status.FAILED) {
            return browser.takeScreenshot().then(function(screenShot) {
                //screenShot is a base-64 encoded PNG
                world.attach(screenShot, 'image/png');
            });
        }
    });

    After(function () {
        fileHelper.removeDirectory(browser.params.basePath)
    })


});