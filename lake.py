#!/usr/local/bin/python3
"""
each int is a bar height or "hill"
[1,3,2,4,1,3,1,4,5,2,2,1,4,2,2]

for val
    if started
        if next is less or equal
            add block
        else next is greater
            if next is less than start
                if next next is greater
                    add block
        else lake going back downhill
            if lake ended
               quit
            else
                add block
    else not started
        if next is greater or equal
            quit
        else
            add block
"""

import sys


def is_ended(curr, rest):
    return bool([r for r in rest if r > curr])


def block(h):
    return 1*h


def lake(d):
    total = 0
    skip = 0
    prev = d[0]
    start = prev

    for j in range(1, len(d)):
        curr = d[j]
        if j > 0:
            if curr <= prev:
                # downhill
                total += block(start - curr)
            else:
                # curr > prev
                if curr < start:
                    # still same lake
                    total += block(start - curr)
                else:
                    # might be ending
                    if is_ended(curr, d[j+1:]):
                        skip = j
                        break
                    else:
                        total += block(start - curr)
        else:
            if curr >= prev:
                skip = j
                break
            else:
                total += block(start - curr)

    return total, skip


def main(d):
    total_vol = 0
    skip = 0
    for i in range(0, len(d)):
        if i+skip >= len(d):
            break
        v, s = lake(d[i+skip:])
        total_vol += v
        skip += s
    return total_vol


data = [1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1, 4, 2, 2]
res = main(data)
print(res)
