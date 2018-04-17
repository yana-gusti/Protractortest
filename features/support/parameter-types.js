const object = require('../../test-data/page-objects');

const {defineParameterType} = require('cucumber');
const STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"/;

defineParameterType({
    regexp: STRING_REGEXP,
    name: 'css',
    useForSnippets: false,
    transformer: function (s) {
        let dataArray = s.split('|');
        let project = dataArray[0];
        let role = dataArray[1];
        return object[project][role];
    }
});

defineParameterType({
    regexp: /[^"]*/,
    name: 'detail',
    useForSnippets: false
});