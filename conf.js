exports.config = {
    framework: 'jasmine2',
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['features/*.feature'],
    cucumberOpts: {
        require: 'features/step_definitions/*.js',
        keepAlive: false,
        format: ['json:reports/results.json', 'progress'],
        strict: true,
        tags: '@Regression'
    },
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ["--headless", "--disable-gpu"]
        }
    },

    onComplete: function () {
        browser.close();
    },

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            // read the options part https://www.npmjs.com/package/protractor-multiple-cucumber-html-reporter-plugin#options
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            openReportInBrowser: true
        }
    }]


};
