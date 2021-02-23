#!/usr/bin/env python3

n = 100
print('{0: 5}: {1:012b}'.format(n, n))
n = n >> 1
print('{0: 5}: {1:012b}'.format(n, n))
print()
print('0x555: {0:012b}'.format(0x555))
print('{0: 5}: {0:012b}'.format(n))
n = n & 0x555
print(' & op: {0:012b}'.format(n))
