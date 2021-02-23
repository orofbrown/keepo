#!/usr/bin/env python3

'''
Dynamic Programming - Trapping Rain Water
Algorithm:
    Find max height of bar from left up to an index `i` in the array `left_max`
    Find maximum height of bar from the right up to an index `i` in the array `right_max`
    Iterate over the height array and update answer
        Add `min(max_left[i], max_right[i]) - height` to answer
'''


def trap(heights_list=[]):
    print(heights_list)
    ans = 0
    size = len(heights_list)

    left_max = heights_list[0:1]
    for i in range(1, size):
        left_max.append(max(heights_list[i], left_max[i-1]))

    right_max = heights_list[-1:]
    for i in range(size-2, -1, -1):
        right_max.insert(0, max(heights_list[i], right_max[i-size+1]))

    print(left_max)
    print(right_max)
    for i in range(1, size-1):
        print('%d :: %d :: %d' % (left_max[i], right_max[i], heights_list[i]))
        ans += min(left_max[i], right_max[i]) - heights_list[i]

    return ans


if __name__ == '__main__':
    data = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
    # data = [1, 3, 2, 4, 1, 3, 1, 4, 5, 2, 2, 1, 4, 2, 2]
    res = trap(data)
    print(res)
