#!/usr/bin/env python3
'''
Suppose we have a knapsack which can hold up to `W` weight units
We have a total of `n` items to choose from
  Whose values are represented by an array  `v` = {10, 40, 30, 50}
  And whose weights represented by an array `w` = {5, 4, 6, 3}
'''

from sys import argv
from pprint import pprint


def read_data():
    '''
    t => number of test cases, i.e., how many sets of dat
    w => weight of the item
    v => value of the item
    '''
    with open('./knapsack.dat') as fp:
        data = fp.read()
    items = data.split('\n')
    t = int(items[0])

    data = []
    for i in range(t):
        for item in items[1:]:
            w, v = item.split(' ')
            data.append((int(w), int(v)))
    return data


def knapsack(k, arr):
    '''
    Search the data 
    '''


def main():
    data = read_data()
    print(data)


if __name__ == '__main__':
    main()
