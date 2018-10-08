import boto3
import json

s3_client = boto3.client("s3")


def main_handler(event, callback):

    matrix_json = get_matrix_json()

    matrix_a = matrix_json['matrix_a']

    matrix_b = matrix_json['matrix_b']

    result = multiply(matrix_a, matrix_b)

    save_matrix_json({
        'result': result.tolist()
    })

    return "Cool"


def multiply(X, Y):
    return [[sum(a*b for a, b in zip(X_row, Y_col)) for Y_col in zip(*Y)] for X_row in X]



def save_matrix_json(result):
    responce = s3_client.put_object(
        Bucket="sam.mat.test", Key="Event/MatrixResultFromPython.json", Body=str(result)
    )


def get_matrix_json():

    responce = s3_client.get_object(
        Bucket="sam.mat.test", Key="Event/Matrix.json"
    )

    return json.loads(responce['Body'].read())
