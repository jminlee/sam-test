import numpy as np
import boto3
import json

def main_handler(event, callback):

    matrix_json = get_matrix_json()

    matrix_a = np.array(matrix['matrix_a'])

    matrix_b = np.array(matrix['matrix_b'])

    result = np.matmul(matrix_a, matrix_b)

    print(result)

    return "Cool"


def get_matrix_json():
    s3_client = boto3.client("s3")

    responce = s3_client.get_object(
        Bucket="sam.mat.test"
        , Key="Event/Matrix.json"
    )

    return json.loads(responce['Body'].read())
