'use strict'

const LinearAlgebra = require('linear-algebra')();
const Matrix = LinearAlgebra.Matrix;

const crypto = require('crypto-js');
const https = require('https');
const xml = require('xml2js');


const access_key = 'ACCESS_KEY_VALUE'
const secret_key = 'SECRET_KEY_VALUE'
const region = 'ap-northeast-1';
const bucket_url = 'sam.mat.test.s3.amazonaws.com';
const myService = 's3';
const myMethod = 'GET';
const myPath = 'Event/Matrix.json';

const amzDate = getAmzDate(new Date().toISOString());
const authDate = amzDate.split("T")[0];

var payload = '';
// get the SHA256 hash value for our payload
var hashedPayload = crypto.SHA256(payload).toString();

var canonicalReq = myMethod + '\n' +
    myPath + '\n' +
    '\n' +
    'host:' + url + '\n' +
    'x-amz-content-sha256:' + hashedPayload + '\n' +
    'x-amz-date:' + amzDate + '\n' +
    '\n' +
    'host;x-amz-content-sha256;x-amz-date' + '\n' +
    hashedPayload;

var canonicalReqHash = crypto.SHA256(canonicalReq).toString();

var stringToSign = 'AWS4-HMAC-SHA256\n' +
    amzDate + '\n' +
    authDate + '/' + region + '/' + myService + '/aws4_request\n' +
    canonicalReqHash;

function getSignatureKey(Crypto, key, dateStamp, regionName, serviceName) {
    var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = Crypto.HmacSHA256(regionName, kDate);
    var kService = Crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = Crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}

var signingKey = getSignatureKey(crypto, secret_key, authDate, region, myService);

var authKey = crypto.HmacSHA256(stringToSign, signingKey);

// Form our authorization header
var authString = 'AWS4-HMAC-SHA256 ' +
    'Credential=' +
    access_key + '/' +
    authDate + '/' +
    region + '/' +
    myService + '/aws4_request,' +
    'SignedHeaders=host;x-amz-content-sha256;x-amz-date,' +
    'Signature=' + authKey;

headers = {
    'Authorization': authString,
    'Host': url,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': hashedPayload
};

function performRequest(endpoint, headers, data, success) {

    var dataString = data;

    var options = {
        host: endpoint,
        port: 443,
        path: '/',
        method: 'GET',
        headers: headers
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            //console.log(responseString);
            success(responseString);
        });
    });

    req.write(dataString);
    req.end();
}

// this function converts the generic JS ISO8601 date format to the specific format the AWS API wants
function getAmzDate(dateStr) {
    var chars = [":", "-"];
    for (var i = 0; i < chars.length; i++) {
        while (dateStr.indexOf(chars[i]) != -1) {
            dateStr = dateStr.replace(chars[i], "");
        }
    }
    dateStr = dateStr.split(".")[0] + "Z";
    return dateStr;
}


function no_sdk_handler(event, callback) {

}