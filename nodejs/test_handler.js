function test_handler(event, context, callback) {
	callback(null, { message: 'Succeed!', event })
}

module.exports.test_handler
    = (event, context, callback) => {
    	test_handler(event, context, callback)
    }