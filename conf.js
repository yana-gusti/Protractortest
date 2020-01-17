exports.config = {
    seleniumAddress: 'http://127.0.0.1:5571/wd/hub',
    getPageTimeout: 60000, //60 sec
    allScriptsTimeout: 60000,//60 seconds
    ignoreUncaughtExceptions: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    capabilities: {
        'browserName': 'chrome',
        acceptSslCerts: true,
        chromeOptions: {
            args: ['disable-gpu', 'window-size=1920,1080',
                'test-type=browser', 'incognito',
                'disable-application-cache',
                //'headless'
            ],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'profile.password_manager_enabled': false,
                    'credentials_enable_service': false,
                    'password_manager_enabled': false
                }
            }
        },
        shardTestFiles: true,
        maxInstances: 1,
    },
    SELENIUM_PROMISE_MANAGER: false,
    restartBrowserBetweenTests: true,
    specs: ['features/Wiki.feature'],

    cucumberOpts: {
        require: ['step_definitions/*.js', 'support/helper.js', 'support/cucumber-expressions.js'],
        keepAlive: false,
        format: ['json:reports/results.json', 'progress'],
        strict: true,
        // tags: '@Regression'
    },

    params: {
        timeout: 15000, //15 sec
        env: process.env.TEST_ENV || 'DEV',
        lan: process.env.TEST_LAN || 'ENG'
    },

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            // read the options part https://www.npmjs.com/package/protractor-multiple-cucumber-html-reporter-plugin#options
            automaticallyGenerateReport: false,
            removeExistingJsonReportFile: false,
            openReportInBrowser:false
        }
    }]
};
