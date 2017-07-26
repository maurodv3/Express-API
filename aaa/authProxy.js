'use strict';

let https = require("https");
let serverToken = '';

function authRequest(req, res, next) {

    let clientToken = '';

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        clientToken = req.headers.authorization.split(' ')[1];
    }

    let options = {
        host: '127.0.0.1',
        port: 3999,
        path: '/v1/validate/' + clientToken,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + serverToken,
        }
    };

    // Accept self-signed certs.
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let request = https.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (data) {

        });
        response.on('end', function() {
            if (this.statusCode === 200) {
                console.log();
                next();
            } else {
                res.status(this.statusCode).send(this.statusMessage);
            }
        })
    });

    request.on('socket', function (socket) {
        socket.setTimeout(60000);
        socket.on('timeout', function() {
            request.abort();
        });
    });

    request.on('error', function(err) {
        if (err.code === "ECONNRESET") {
            console.log("Auth server timeout.");
            //specific error treatment
        }
        //other error treatment
    });

    request.end();
}

function registerServer() {

    let credentials = {
        username: "admin",
        password: "admin"
    };

    let options = {
        host: '127.0.0.1',
        port: 3999,
        path: '/v1/auth',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Accept self-signed certs.
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let request = https.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (data) {
            serverToken = JSON.parse(data).token;
        });
        response.on('end', function() {
            if (this.statusCode === 200) {
                console.log("Server correctly registered with Auth server.");
            } else {
                console.log("Error registering with Auth server.");
            }
        });
    });

    request.on('socket', function (socket) {
        socket.setTimeout(60);
        socket.on('timeout', function() {
            request.abort();
        });
    });

    request.on('error', function(err) {
        if (err.code === "ECONNRESET") {
            console.log("Auth server timeout.");
            //specific error treatment
        }
        //other error treatment
    });

    request.write(JSON.stringify(credentials));
    request.end();
}

module.exports = {
    authRequest: authRequest,
    registerServer: registerServer
};