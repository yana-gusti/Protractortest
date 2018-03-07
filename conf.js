exports.config = {
    framework: 'custom',
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['features/*.feature'],
    cucumberOpts: {
        require: 'features/step_definitions/*.js',
        keepAlive: false,
        strict: true,
        tags: '@Regression'
    },
    capabilities: {
        browserName: 'chrome',

    },

    onComplete: function () {
        browser.close();
    },



};
