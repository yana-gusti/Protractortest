exports.config = {
    framework: 'custom',
    ignoreUncaughtExceptions: true, //This allows cucumber to handle the exception and record it appropriately.
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    seleniumAddress: 'http://localhost:4444/wd/hub',
    // specs: ['features/*.feature'],
    cucumberOpts: {
        require: ['features/step_definitions/*.js', 'features/support/hooks.js'],
        keepAlive: false,
        format: ['json:reports/results.json', 'progress'],
        strict: true,
        tags: '@Regression'
    },
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['disable-infobars', 'start-fullscreen', 'no-sandbox',
                'test-type=browser', 'disable-notifications', 'incognito',
                'disable-application-cache'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true
                }
            }
        },
        // allows different specs to run in parallel.
        // If this is set to be true, specs will be sharded by file
        // (i.e. all files to be run by this set of capabilities will run in parallel).
        // Default is false.
        shardTestFiles: true,

        // Maximum number of browser instances that can run in parallel for this
        // set of capabilities. This is only needed if shardTestFiles is true.
        // Default is 1.
        maxInstances: 1,
    },

    // Spec patterns are relative to this directory.
    specs: ['features/test-feature.feature'],
    // suites: {
    //     precondition: 'features/test.feature',
    //     suite1: ['features/test-feature.feature', 'features/test.feature'],
    //     suite2: ['features/test-feature.feature']
    // },

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
