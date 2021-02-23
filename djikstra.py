#!/usr/local/bin/python3

'''
Djikstra's Shortest Path First algorithm implementation

'''

# directed, weighted graph of n vertices
# vertices are numbered 0 to n-1
# find the shortest distance from vertex 0 to all other vertices
# also return path that produces the shortest distance overall

# input data:
#   integer n - total number of vertices
#   n input lines with n space-separated values, each >= 0
#   each value represents an edge weight


class Node:
    def __init__(self, node_name):
        self.name = node_name
        self. distance = float('inf')


class Edge:
    def __init__(self, edge_name, weight):
        self.name = edge_name
        self.weight = weight
        self.vertices = ()


def main():
    unvisited_nodes = {}
    visited_nodes = {}
    data = None
    with open('./edges.dat') as f:
        data = f.read()

    lines = data.split('\n')
    datasets = []
    curr_line = 0
    for line in lines:
        count = int(line)
        vals = []
        for i in range(1, count):
            vals.a


if __name__ == '__main__':
    main()
