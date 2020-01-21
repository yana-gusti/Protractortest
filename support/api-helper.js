const request = require('request');

module.exports = thisModule = {

    sendRequest: (method = 'POST', uri, body, headers, additionalOptions) =>{
        return new Promise((resolve, reject) => {
            const options = {
                method,
                uri,
                body,
                headers: mapHeaders(headers),
                agentOptions: { rejectUnauthorized: false },
                ...additionalOptions
            };

            request(options, function (error, response, _body) {
                if (error) {
                    console.error('request error:', error);
                    reject(error);
                    return;
                }
                resolve(response);
            });
        });
    }
};

function mapHeaders(value) {
    let headers = {};
    if (value instanceof Map) {
        value.forEach((value, key) => {
            headers[key] = value;
        });
        return headers;
    } else {
        return value;
    }
}
