/**
 * Client
 *
 * From http://www.yoniweisbrod.com/network-requests-in-react-native-using-fetch/
 */

'use strict';

var checkStatus = function(response) {
    // https://github.com/github/fetch
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        console.log('Client.checkStatus error ' + response.statusText);
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

/*
 * Wrapper around fetch.Response which facilitates cancellation of requests.
 */
class Response {
    constructor(responseCallback, errorCallback) {
        this.active = true;
        this._responseCallback = responseCallback;
        this._errorCallback = errorCallback;
    }

    cancel() {
        console.log('Response.cancel');
        this.active = false;
    }

    responseCallback(data) {
        if (this.active) {
            this.active = false;
            this._responseCallback(data);
        }
    }

    errorCallback(data) {
        if (this.active) {
            this.active = false;
            this._errorCallback(data);
        }
    }
};

var dummyRequest = function(result, responseCallback, error, errorCallback) {
    const RESPONSE_DELAY = 1000;

    var wrapper = new Response(responseCallback, errorCallback);

    setTimeout(
        () => {
            if (error) {
                wrapper.errorCallback(error);
            } else {
                wrapper.responseCallback(result);
            }
        },
        RESPONSE_DELAY
    );

    return wrapper;
}

var dummyLogIn = function(username, password, callback) {
    console.log('Client.dummyLogIn'
        + ' username ' + username
        + ' password ' + password);

    const USERNAME = 'test';
    const PASSWORD = 'abc';

    var result = (username == USERNAME && password == PASSWORD);

    return dummyRequest(result, callback, null, null);
}

module.exports = {
    checkStatus: checkStatus,
    dummyLogIn: dummyLogIn,
    dummyRequest: dummyRequest,
    Response: Response
};
