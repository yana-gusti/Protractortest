const {When} = require('cucumber');
const apiHelper = require('../support/api-helper');

When('User gets coordinates for {text} user on {url}', async (city, string) =>{
    let url = string+'/weather?q='+city+'&appid=b6907d289e10d714a6e88b30761fae22';
    let headers = new Map();
    headers.set("accept", "application/json");
    let response = await apiHelper.sendRequest("GET", url, '', headers);
    return browser.getSession().then(session => {
        let body = JSON.parse(response.body);
        let coordinates = body['coord'];
        let lat = coordinates['lat'];
        let lon = coordinates['lon'];
        console.log("Got lat=" + lat);
        console.log("Got lon=" + lon);
        global.uniqueMap[`${session['id_']}lat`] =lat;
        global.uniqueMap[`${session['id_']}lon`] =lon;
    });

});

When('User gets weather of city on {url}', async (string) =>{
    return browser.getSession().then(session => {
        let lat = global.uniqueMap[`${session['id_']}lat`];
        let lon = global.uniqueMap[`${session['id_']}lon`];
        console.log("Stored lat=" + lat);
        console.log("Stored lon=" + lon);
        let url = string+'/weather?lat='+lat+'&lon='+lon+'&appid=b6907d289e10d714a6e88b30761fae22';
        console.log(url);
        let headers = new Map();
        headers.set("accept", "application/json");
        return apiHelper.sendRequest("GET", url, '', headers).then(function (response) {
            return console.log(JSON.parse(response.body));
        })
    });
});