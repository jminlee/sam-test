import numpy as np
import boto3
import json

s3_client = boto3.client("s3")

def main_handler(event, callback):

    matrix_json = get_matrix_json()

    matrix_a = np.array(matrix_json['matrix_a'])

    matrix_b = np.array(matrix_json['matrix_b'])

    result = np.matmul(matrix_a, np.transpose(matrix_b))

    save_matrix_json({
        'result': result.tolist()
    })

    return "Cool"


def multiply(v, G):
    result = []
    for i in range(len(G[0])):  # this loops through columns of the matrix
        total = 0
        for j in range(len(v)):  # this loops through vector coordinates & rows of matrix
            total += v[j] * G[j][i]
        result.append(total)
    return result

def save_matrix_json(result):
    responce = s3_client.put_object(
        Bucket="sam.mat.test", Key="Event/MatrixResultFromPython.json", Body=str(result)
    )

def get_matrix_json():

    responce = s3_client.get_object(
        Bucket="sam.mat.test"
        , Key="Event/Matrix.json"
    )

    return json.loads(responce['Body'].read())
