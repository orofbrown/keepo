#!/usr/bin/env python3
# Fibonacci Sequence
from sys import argv


def fib(n):
    f = [0, 1]
    for i in range(2, n + 1):
        next = f[i - 1] + f[i - 2]
        f.append(next)
    print(f)
    return f.pop()


if __name__ == "__main__":
    n = int(argv[1])
    res = fib(n)
    print(res)
