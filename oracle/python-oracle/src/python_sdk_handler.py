import numpy
import boto3

def mainHandler(event, callback):
    print(event)
    return callback()
