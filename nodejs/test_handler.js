function test_handler(event, context, callback) {
	return callback(null, { message: 'Succeed!', event })
}

module.exports.test_handler
    = (event, context, callback) => {
    	test_handler(event, context, callback)
    }