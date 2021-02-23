#!/usr/bin/env python3
"""
Algorithm:
    Given an array `a` of size `n`
    Create another array `aux` of size 10 (to hold digits 0-9)
    Place each item into a bucket (index located in `aux`),
        based on either the least significant (LSD) or most significant (MSD) digit
        i.e., increment a counter in each bucket based on occurrences of that digit
    For i = 0 thru 9, add counts of i and i+1 until index 9 holds the total count of possible values
    Create another array `aSorted`
    For each item in `a` from n-1...0
        Match a number with its bucket in `aux`
        Place `a[i]` into `aSorted` based on the counter in `aux[j]`
        Decrement count in `aux[j]`
"""
from sys import argv, stdout
from math import floor


def print_result(res):
    n = len(res)
    third = int(n / 3)
    for i in range(n):
        stdout.write("{0} ".format(res[i]))
        if i > 0 and i % third == 0:
            stdout.write("\n")
    print()


def get_largest(a):
    l = 0
    for i in a:
        if i > l:
            l = i
    return l


def calc_place_value(i, mult):
    return floor((i % mult * 10) / mult)


def sort(a):
    n = len(a)
    multiplier = 10

    # O(n)
    largest = get_largest(a)

    # While next place value is not
    # larger than the largest number in the array
    # O(3)
    while calc_place_value(largest, multiplier) != 0:
        # O(n)
        aSorted = [-1 for i in range(n)]
        # O(10)
        aux = [0 for i in range(10)]

        # O(n)
        for item in a:
            digit = calc_place_value(item, multiplier)
            aux[digit] += 1

        # O(10)
        for i in range(1, 10):
            aux[i] = aux[i - 1] + aux[i]

        # O(n)
        for i in range(n - 1, -1, -1):
            digit = calc_place_value(a[i], multiplier)
            idx = aux[digit] - 1
            if idx >= 0:
                aSorted[idx] = a[i]
                aux[digit] -= 1

        # O(n)
        for i in range(n):
            a[i] = aSorted[i]

        multiplier *= 10
    return aSorted


if __name__ == "__main__":
    with open("radix.dat") as f:
        a = f.read()
        a = [int(i) for i in a.split("\n")]
    res = sort(a)
    print_result(res)
