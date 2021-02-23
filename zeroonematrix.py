#!/usr/bin/env python3
from sys import argv
from pprint import pprint


def assign_matrix(n):
    lim = int(n/2)
    res = [[0 for i in range(lim)] + [1 for i in range(lim)]]*lim
    res += [[1 for i in range(lim)] + [0 for i in range(lim)]]*lim
    return res


if __name__ == '__main__':
    n = int(argv[1])
    res = assign_matrix(n)
    pprint(res)

# [0,0] [1,1] => [0,0,1,1]
# [0,0] [1,1] => [0,0,1,1]
# [1,1] [0,0] => [1,1,0,0]
# [1,1] [0,0] => [1,1,0,0]

# [0, 0, 1, 1], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 0, 0]]
