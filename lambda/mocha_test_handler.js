function test_handler(event, context, callback) {
    var responseBody = {
        "key3": "value3",
        "key2": "value2",
        "key1": "value1"
    };

    var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };
    callback(null, response);
}

module.exports.test_handler
    = (event, context, callback) => {
    	test_handler(event, context, callback)
    }

function sub(a, b) {
  return a + b;
}

module.exports = sub;