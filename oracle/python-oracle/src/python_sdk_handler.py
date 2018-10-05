import numpy
import boto3

def main_handler(event, callback):
    
    check_numpy()

    return callback()

def check_numpy():
    np_arr = np.array()
    print(np_arr)
