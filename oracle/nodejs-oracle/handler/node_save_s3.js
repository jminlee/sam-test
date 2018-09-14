const AWS = require('aws-sdk');
const Rx = require('rxjs')

module.exports.readFromS3$ = (s3, bucketName, key) =>
    Rx.Observable.create((observer) => {
        try {
            const params = { Bucket: bucketName, Key: key }
            s3.getObject(params, (error, data) => {
                if (error) observer.error(error)
                else {
                    observer.next(data.Body)
                    observer.complete()
                }
            })
        } catch (error) { observer.error(error) }
    })

module.exports.saveToS3$ = (s3, bucketName, key, body) =>
    Rx.Observable.create((observer) => {
        try {
            const params = { Bucket: bucketName, Key: key, Body: body }
            s3.putObject(params, (error) => {
                if (error) observer.error(error)
                else {
                    observer.complete()
                }
            })
        } catch (error) { observer.error(error) }
    })

function createKey$(path, keyName, compressed = false) {
    return Rx.Observable.of(`${path}/${keyName}`)
        .map((key) => {
            switch (compressed) {
            case true: return `${key}.gz`
            default: return key
            }
        })
}

module.exports.createKey$ = (path, keyName, compressed) =>
createKey$(path, keyName, compressed)

function main_hanlder(event, callback) {
    
}

