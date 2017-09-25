


exports.config = {
    framework: 'jasmine2',
    onPrepare: function() {
        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test1.js'],

    capabilities: {
        browserName: 'chrome',

        chromeOptions: {
            args: [ "--headless", "--disable-gpu" ]
        }
    }


};
