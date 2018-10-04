import numpy
import boto3

def main_handler(event, callback):
    np_arr = np.array()
    print(event)
    print(np_arr)
    return callback()
