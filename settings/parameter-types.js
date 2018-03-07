const {defineParameterType} = require('cucumber');
const userData = require('../../data/user-data');
const project = require('../../data/projects-enum');

/**
 * @STRING_REGEXP
 * Regular expression for reading value inside the double quotes
 * double quotes are excluded from result
 * will work in case string contains more than one value inside the double quotes
 *
 * Examples:
 *
 * Code field "#form-question-code" is displayed
 * Preview table ".form-question-preview" with text "Question preview" is displayed
 */
const STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"/;

defineParameterType({
    regexp: /[^"]*/,
    name: 'detail',
    useForSnippets: false
});

/**
 * Return locator from general-page-objects if locator string contains unique | symbol
 * In other case return string
 *
 * @returns {string}
 */
defineParameterType({
    regexp: STRING_REGEXP,
    name: 'css',
    useForSnippets: true,
    transformer: function (s) {
        if(s.indexOf('|') !== -1){
            let array = s.split('|');
            let product = project[array[0]];
            let page = array[1];
            let locator = array[2];
            return product[page][locator];
        }
        return s;
    }
});

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'landing-url',
    useForSnippets: false,
    transformer: function (project) {
        let environment = browser.params.env;
        return userData.urls[project][environment];
    }
});

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'user',
    useForSnippets: false,
    transformer: function (s) {
        let dataArray = s.split(':');
        let project = dataArray[0];
        let role = dataArray[1];
        userName = role;
        return userData.users[project][role];
    }
});

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'map',
    useForSnippets: false,
    transformer: function (s) {
        return s.split('=');
    }
});
