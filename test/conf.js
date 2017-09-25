


exports.config = {


    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test1.js'],

    capabilities: {
        browserName: 'chrome',

        chromeOptions: {
            args: [ "--headless", "--disable-gpu" ]
        }
    }


};
