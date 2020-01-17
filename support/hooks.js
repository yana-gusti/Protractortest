const {Before, After, Status} = require('cucumber');

Before(function () {
    return browser.waitForAngularEnabled(false);
});

After(function () {

    function getWindowLocation() {
        return window.location;
    }

    function clearStorage() {
        window.sessionStorage.clear();
        window.localStorage.clear();
        return window.location.reload();
    }

    return browser.executeScript(getWindowLocation).then(function (location) {
        // NB If no page is loaded in the scenario then calling clearStorage will cause exception
        // so guard against this by checking hostname (If no page loaded then hostname == '')
        if (location.hostname.length > 0) {
            return browser.executeScript(clearStorage);
        }
        else {
            return console.log("browser can not be cleared");
        }
    });
});

After(function (testCase) {
    const world = this;

    if (testCase.result.status === Status.FAILED) {
        return browser.takeScreenshot().then(function (screenShot) {
            //screenShot is a base-64 encoded PNG
            return world.attach(screenShot, 'image/png');
        });
    } else {
        return console.log("test passed");
    }
});
