const object = require('../test-data/page-objects');
const text = require('../test-data/text');
const {defineParameterType} = require('cucumber');
const STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"/;
const environment = browser.params.env;
const language = browser.params.lan;

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'css',
    useForSnippets: false,
    transformer: function (s) {
        if (s.indexOf('|') !== -1) {
            let dataArray = s.split('|');
            let page = dataArray[0];
            let locator = dataArray[1];
            return object[page][locator][language];
        }
        return s;
    }
});

defineParameterType({
    regexp: /[^"]*/,
    name: 'detail',
    useForSnippets: false
});

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'url',
    useForSnippets: false,
    transformer(string) {
        if (string.indexOf('http') === 0) {
            return string;
        }
        return object.urls[string][environment][language];
    }
});

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'user',
    useForSnippets: false,
    transformer(role) {
        return object.users[role][environment];
    }
});

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'text',
    useForSnippets: false,
    transformer: function (s) {
        if (s.indexOf('REGEXP:') !== -1) {
            s = s.split('REGEXP:')[1];
            let dataArray = s.split(':');
            let page = dataArray[0];
            let textToVerify = dataArray[1];
            return new RegExp(text[page][textToVerify][language]);
        }
        if (s.indexOf(':') !== -1) {
            let dataArray = s.split(':');
            let page = dataArray[0];
            let textToVerify = dataArray[1];
            return text[page][textToVerify][language];
        }
        return s;
    }
});

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'hash',
    useForSnippets: true,
    transformer: (s) => {
        if (s.indexOf('HASH:') !== -1) {
            s = s.split('HASH:')[1];
            let dataArray = s.split(':');
            let textToVerify = dataArray[0];
            return text.hashes[textToVerify];
        }
        return s;
    }
});