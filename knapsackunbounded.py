#!/usr/bin/env python3
# From HackerRank https://www.hackerrank.com/challenges/unbounded-knapsack/problem
from sys import argv
from pprint import pprint

"""
"""


def read_data():
    """
    input format:
        first line: number of test cases `t`
        next lines come in pairs:
            length of array `n` and target sum `k`
            elements for array `arr` of length `n` 
    """
    with open('./knapsack2.dat') as f:
        d = f.read()
    inputs = d.split('\n')
    t = int(inputs[0]) * 2
    data = inputs[1:]

    for i in range(0, t, 2):
        n, k = data[i].split(' ')
        arr = [int(el) for el in data[i+1].split(' ')]
        yield ((int(n), int(k)), arr)


def print_result(k, dp):
    n = len(dp)
    i = n-1
    j = k-1
    result = []

    while i > 0 and j > 0:
        item = dp[i][j]
        # print('{0} {1} {2}'.format(i, j, item))
        if item == dp[i-1][j]:
            i -= 1
        elif j < k-1 and item == dp[i][j+1]:
            j += 1
        else:
            i -= 1
            j -= 1
            result.append(dp[i][j])

    pprint(result)


def unbounded_knapsack(k, arr):
    n = len(arr)

    sol_len = -1
    sol = None

    if arr[0] > k:
        return 0

    for i in range(n):
        if arr[i] < 1:
            continue

        if k % arr[i] == 0:
            mult = k // arr[i]
            if sol_len == -1 or mult < sol_len:
                sol_len = mult
                sol = [arr[i]] * sol_len

        for j in range(i):
            if arr[i] + arr[j] == k and sol_len > 2:
                sol = [arr[i], arr[j]]
            elif sum(arr, j) == k and (i - j) < sol_len:
                sol = arr[j:]
    print('here 0')
    if not sol:
        sol = []
        total = 0
        i = 0
        while i < n:
            print('here 1')
            if total == k:
                break
            elif total > k:
                print('here 2')
                total -= arr[i]
                i -= 1
                sol.pop()
                if arr[0] < 1 or arr[0] > k:
                    total = 0
                    break
                while total < k:
                    print('here 3')
                    sol.append(arr[0])
                    total += arr[0]
                break
            else:
                sol.append(arr[i])
                total += arr[i]
                i += 1
        if total > k:
            sol.pop()
            total -= arr[0]

    return sum(sol)


def main():
    for ((n, k), arr) in read_data():
        res = unbounded_knapsack(k, arr)
        print(res)


if __name__ == '__main__':
    main()
