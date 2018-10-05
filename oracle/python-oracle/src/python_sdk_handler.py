import numpy
import boto3

def main_handler(event, callback):

    check_numpy()
    print(get_matrix_json())

    return "Cool"

def check_numpy():
    np_arr = numpy.array([])
    print(np_arr)

def get_matrix_json():
    s3_client = boto3.client("s3")

    responce = s3_client.get_object(
        Bucket="sam.mat.test"
        , Key="Event/Matrix.json"
    )

    return responce['Body'].read()
