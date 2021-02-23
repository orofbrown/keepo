#!/usr/bin/env python3
import sys


def decomp(text, start=0, times=1):
    for i in range(times):
        i = start
        while i < len(text) and text[i] != ']':
            if text[i].islower():
                yield text[i]
        else:
            sub_times = 0
            while text[i].isdigit():
                sub_times = sub_times * 10 + int(text[i])
                i += 1
            i += 1  # Skip past open-bracket
            for item in decomp(text, i, sub_times):
                if isinstance(item, basestring):
                    yield item
                else:
                    i = item
            i += 1
    if start > 0:
        yield i


def decompress(text):
    # We could wrap 'text' to add a leading '1[' and trailing ']' to allow a
    # little bit of simplification in the logic in decomp(), but the
    # simplification would lead to harder-to-read code, as well as requiring
    # O(n) additional time, and a temporary requirement for O(n + 3) additional
    # space during the copy operation.
    #
    # This is O(decompressed-length) for speed (probably), and up to
    # O(compressed-length/4) for additional storage.  In this implementation,
    # the storage requirement is well-disguised: It appears on the function call
    # stack, rather than in declared variables.  E.g., consider a worst-case
    # input of: 1[1[1[1[1[1[1[1[1[1[1[1[1[1[1[1[1[1[1[1[xx]]]]]]]]]]]]]]]]]]]]
    # which would require a stack depth of 20.
    #
    # The (probably) for the big-O depends on how well Python implements
    # resumption of nested iteration.  At worst, the string above would require
    # a full stack descent, then ascent for *each* of the two 'x' characters,
    # for a total of O(n^2) time.  Another very well-hidden possible cost.
    for letter in decomp(text):
        sys.stdout.write(letter)
    sys.stdout.write('\n')


if __name__ == '__main__':
    decompress(sys.argv[1])
