import math
import copy

class Error(Exception):
    pass

class heap:
    heap = []
    heap.append(None)

    def __init__(self, arr):
        for i in arr:
            self.heap.append(i)
        self.build_min_heap()

    def exchange(self, parent, child):
        temp = self.heap[parent]
        self.heap[parent] = self.heap[child]
        self.heap[child] = temp

    def parent(self, i):
        return math.floor(i/2)

    def childLeft(self, i):
        return 2*i

    def childRight(self, i):
        return (2*i) + 1

    def min_heapify(self, i):
        #print("called for " + str(i))
        l = self.childLeft(i)
        r = self.childRight(i)

        if l<=len(self.heap) and self.heap[l].F < self.heap[i].F:
            lowest = l
            #print("left child is smaller so lowest is " + str(lowest) + "and val is " + str(self.heap[lowest].F))
        else:
            lowest = i
            #print("left child val is " + str(self.heap[l].F))
            #print("parent is smaller so lowest is " + str(lowest)  + "and val is " + str(self.heap[lowest].F))

        if r <= len(self.heap) and self.heap[r].F < self.heap[lowest].F:
            lowest = r
            #print("right child is smaller so lowest is " + str(lowest) + "and val is " + str(self.heap[lowest].F))

        if lowest != i:
            self.exchange(i, lowest)
            #print("exchanged " + str(i) + " with " + str(lowest))
            #print("exchanged " + str(self.heap[i].F) + " with " + str(self.heap[lowest].F) + "\n \n")
            self.min_heapify(lowest)

    def build_min_heap(self):
        i= self.parent(len(self.heap) - 2)  #used -2 because we want to start indexing heap from 1 not 0
        #print("i = " + str(len(self.heap)))
        while i > 0:
            self.min_heapify(i)
            i -= 1


    def incerase_val(self, i, newVal):
        self.heap[i].F = newVal
        while i < self.parent(len(self.heap) - 1):
            if self.heap[i].F > self.heap[self.childLeft(i)].F:
                self.exchange(i, self.childLeft(i))
                i = self.childLeft(i)
            elif self.heap[i].F > self.heap[self.childRight(i)].F:
                self.exchange(i, self.childRight(i))
                i = self.childRight(i)
            elif self.heap[i].F < self.heap[self.childLeft(i)].F and self.heap[i].F < self.heap[self.childRight(i)].F:
                return None

    def decrease_val(self, i, newVal):
        self.heap[i].F = newVal
        while i > 1 and self.heap[self.parent(i)].F > self.heap[i].F:
            self.exchange(self.parent(i), i)
            i = self.parent(i)
        return None

    def change_val(self, i, newVal):
        if newVal > self.heap[i].F:
            self.increase_val(i, newVal)
        elif newVal < self.heap[i].F:
            self.decrease_val(i, newVal)
        else:
            return None


    def min(self):
        return self.heap[1]

    def pop(self):
        '''try:
            min = self.heap[1]
            print(min)
            self.heap[1] = self.heap[len(self.heap)-1]
            self.min_heapify(1)
            print("Returning ")
            print(min)
            return min
        except:
            if len(self.heap) < 1:
                raise Error("heap underflow")
        '''
        winner = self.heap[1]
        winnerI = 1
        i=0

        for elem in self.heap:
            if elem == None:
                continue
            if elem.F < winner.F:
                winner = elem
        del self.heap[self.heap.index(winner)]
        return winner


    def push(self, obj):
        '''temp_obj = copy.copy(obj)
        self.heap.append(temp_obj)
        self.heap[len(self.heap)-1].F = math.inf
        print("obj f is " + str(obj.F))
        self.change_val(len(self.heap)-1, obj.F)
        print("current heap is")
        print(self.heap)
        '''
        print("pushing this to openset")
        obj.printChunk()
        self.heap.append(copy.copy(obj))


    def length(self):
        return len(self.heap)


