#!/usr/bin/env python3

from sys import argv

target = 8


def sol_a(l):
    n = len(l)
    c = 0
    for i in range(n):
        for j in range(n):
            c += 1
            if l[i] + l[j] == target:
                return (l[i], l[j])
    print(c)


def sol_b(l):
    n = len(l)
    c = 0
    for i in range(n):
        m = i
        for j in range(m):
            c += 1
            if l[i] + l[j] == target:
                return (l[i], l[j])
    print(c)


def sol_c(l):
    n = len(l)
    c = 0

    i = 0
    j = n-1
    while i <= j:
        if l[i] + l[j] == target:
            return l[i] + l[j]

    print(c)


if __name__ == "__main__":
    a = [1, 2, 3, 9]
    b = [1, 2, 4, 4]

    print(sol_a(a))
    print(sol_b(a))
    print(sol_a(b))
    print(sol_b(b))
