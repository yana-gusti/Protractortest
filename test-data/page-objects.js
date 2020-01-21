module.exports = {

    urls: {
        MAIN: {
            DEV:{
                ENG:  "http://juliemr.github.io/protractor-demo/",
            },
            PROD:{
                ENG:  "http://juliemr.github.io/protractor-demo/",
            },
        },
        WIKI: {
            DEV:{
                RU:  "https://ru.wikipedia.org/",
                ENG: "https://en.wikipedia.org/"
            },
            PROD:{
                RU:  "https://test.com",
                ENG: "https://test.com"
            },
        },
        API: {
            DEV:{
                ENG:  "http://samples.openweathermap.org/data/2.5",
            }
        },
    },

    users: {
        USER: {
            DEV: {
                login: "test",
                password: "test"
            },
            PROD: {
                login: "user_test@test.com",
                password: "1234"
            }
        },
        ADMIN: {
            DEV: {
                login: "admin",
                password: "admin"
            },
            PROD: {
                login: "admin_test@test.com",
                password: "123456"
            }
        }
    },

    loginPage: {
        passwordInput: ("[name='password']"),
        loginButton: ("button[type='submit']"),
    },

    mainPage: {

            goButton: {
                ENG: "#gobutton",
            },
            firstField: {
                ENG: "[ng-model='first']",
            },
            secondField: {
                ENG: "[ng-model='second']"
            },
    },
    wikiPage: {
            todayText: {
                ENG: "[id='mp-tfl']",
                RU: "[id='main-tga']"
            }

    }

};