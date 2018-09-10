module.exports.test_handler
    = (event, context, callback) => {
    	callback(null, { message: 'Succeed!', event })
    }