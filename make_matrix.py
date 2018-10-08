import json

element = 0

matrix_a = []

for i in range(100):
    vector = []
    for j in range(100):
        vector.append(element)
        element = element + 1
    matrix_a.append(vector)

print(matrix_a)

element = 9999

matrix_b = []

for i in range(100):
    vector = []
    for j in range(100):
        vector.append(element)
        element = element - 1
    matrix_b.append(vector)

print(matrix_b)

matrix_json = {
    'matrix_a': matrix_a
    , 'matrix_b': matrix_b
}

with open("Matrix.json", "w") as matrix_json_file:
    json.dump(matrix_json, matrix_json_file)


