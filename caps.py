#!/usr/bin/env python3

from sys import argv
from functools import reduce
"""
1 <= n <= 10
Input:
    n number of lines (persons)
    cap ID list for each person

    caps.dat
Algorithm:
    at most 10 people
    at most 100 caps per person
    combination of all caps: 0111 1111 (127)
"""


def configure_caps(num_persons, persons):
    hat_stack = []

    # O(n)
    for i in range(num_persons):
        hats = persons[i]
        # worst case O(k)
        for hat in hats:
            if hat not in hat_stack:
                hat_stack.append(hat)
                break
        try:
            hat_stack[i]
        except:
            hat_stack.append(None)

    return hat_stack


if __name__ == '__main__':
    with open('caps.dat') as f:
        data = f.read()
    d = data.split('\n')
    n = int(d[0])
    persons = [[int(i) for i in p.split(' ')] for p in d[1:]]

    res = configure_caps(n, persons)
    print(res)
