'use strict'

const AWS = require('aws-sdk');
const Rx = require('rxjs');
const LinearAlgebra = require('linear-algebra')();
const Matrix = LinearAlgebra.Matrix;

const S3 = new AWS.S3()

function readFromS3(s3, bucketName, key) {
    return Rx.Observable.create((observer) => {
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
}

function saveToS3(s3, bucketName, key, body) {
    return Rx.Observable.create((observer) => {
        try {
            const params = { Bucket: bucketName, Key: key, Body: body }
            s3.putObject(params, (error) => {
                if (error) observer.error(error)
                else {
                    console.log(params)
                    observer.complete()
                }
            })
        } catch (error) { observer.error(error) }
    })
}

function getFirstRecord(event) {
    return Rx.Observable.of(event)
        .map((event) => {
            return event.Records[0].Sns.Message
        })
        .map(JSON.parse)
        .map(messageObject => messageObject.Records[0])
}

function getS3Object(event) {
    return getFirstRecord(event)
        .do((firstRecord) => {
            if (firstRecord.eventSource !== "aws:s3") {
                throw new Error()
            }
        })
        .map(firstRecord => firstRecord.s3)
}

function getS3Key(event) {
    return getS3Object(event)
        .map(s3 => s3.object.key)
}

function getS3BucketName(event) {
    return getS3Object(event)
            .map(s3 => s3.bucket.name)
}


function readMatrixJson(event) {
    return Rx.Observable
        .zip(
            getS3BucketName(event)
            , getS3Key(event)
            , (bucketName, key) => ({ bucketName, key})
        )
        .flatMap(attribute => {
            console.log(attribute)
            return readFromS3(S3, attribute.bucketName, attribute.key)
        })
        .map(data => {
            console.log(data)
            return JSON.parse(data.toString('utf-8'))
        })
}

function matMul(matrixJson) {
    return {
        "matrix": new Matrix(matrixJson.matrix_a)
        .dot(new Matrix(matrixJson.matrix_b).trans())
        .toArray()
    }
}


function mainHandler(event, callback) {
    readMatrixJson(event)
        .map(matrixJson => matMul(matrixJson))
        .flatMap(matrix => {
            console.log(matrix)
            return saveToS3(S3, "sam.mat.test", "Event/MatrixResult.json", JSON.stringify(matrix))
        })
        .subscribe(
            () => console.log('onNext')
            , error => callback(error, { message: 'Failed!', event })
            , () => callback(null, { message: 'Succeed', event })
        )
    
}

module.exports.mainHandler = (event, context, callback)  => {
    mainHandler(event, callback)
}
