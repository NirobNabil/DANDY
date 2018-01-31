class BST:
    # using red black tree
    class nullNode():
        def __init__(self, parent=None):
            self.key = None
            self.parent = parent
            self.left = None
            self.right = None
            self.color = 'B'

        def __str__(self):
            return "NULLnode"

    null = nullNode()

    class node:
        def __init__(self, key=None, **keyargs):
            self.key = key
            if keyargs.keys() & ['p', 'l', 'r', 'c']:
                self.parent = keyargs['p']      # points to the parent, right, left node
                self.left = keyargs['l']        # A dummy node-NULL will be the parent of root and child of leaves
                self.right = keyargs['r']       # at initialization a node with key=None will be created that points to itself
                self.color = keyargs['c']       # available colors 'B' and 'R' for respectively black and red
            else:
                self.parent = BST.null
                self.left = BST.null
                self.right = BST.null
                self.color = 'B'

        def __str__(self):
            return "key = " + str(self.key) +" parent = " + str(self.parent.key) +" right = " + str(self.right.key) +" left = " + str(self.left.key) + " color = " + str(self.color)

    def __init__(self, **keyargs):
        if keyargs.keys() & ['key','p', 'l', 'r', 'c']:
            key = keyargs['key']
            p = keyargs['p']
            l = keyargs['l']
            r = keyargs['r']
            c = keyargs['c']
            self.root = self.node(key, p=p, l=l, r=r, c=c)
        else:
            self.root = self.nullNode()

    def min(self, node):
        if node.left.key == self.null.key:
            return node
        else:
            return self.min(node.left)

    def max(self, node):
        if node.right.key == self.null.key:
            return node
        else:
            self.max(node.right)

    def printTree(self, node):
        if node.key != None:
            #print(node)
            self.printTree(node.left)
            self.printTree(node.right)


    # here 'node' is the node to start searching from and 'key' is the key to search for
    def search(self, node, key):
        #print("key is")
        #print(node.key)
        if node.key == None:
            return False
        elif node.key == key:
            return True
        elif key < node.key:
            #print("going left because " + str(key) + " < " + str(node.key))
            return self.search(node.left, key)
        else:
            #print("going right because " + str(key) + " > " + str(node.key))
            return self.search(node.right, key)

    def successor(self, node):
        if node.right.key != None:
            return self.min(node.right)
        y = node.parent
        while y.key != None and node == y.right:
            node = y
            y = y.parent
        return y

    def lRotate(self, node):
        tempNode = node.right
        node.right = tempNode.left
        tempNode.left.parent = node
        tempNode.parent = node.parent
        if node.parent.key == self.null.key:
            self.root = tempNode
        elif node == node.parent.left:
            node.parent.left = tempNode
        elif node == node.parent.right:
            node.parent.right = tempNode
        tempNode.left = node
        node.parent = tempNode

    def rRotate(self, node):
        tempNode = node.right
        node.right = tempNode.right
        tempNode.right.parent = node
        tempNode.parent = node.parent
        if node.parent.key == self.null.key:
            self.root = tempNode
        elif node == node.parent.right:
            node.parent.right = tempNode
        elif node == node.parent.right:
            node.parent.right = tempNode
        tempNode.right = node
        node.parent = tempNode

    def RBify(self, node):
        while node.parent.color == 'R':
            if node.parent == node.parent.parent.left:
                tempNode = node.parent.parent.right
                if tempNode.color == 'R':
                    node.parent.color = 'B'
                    tempNode.color = 'B'
                    node.parent.parent.color = 'R'
                    node = node.parent.parent
                elif node == node.parent.right:
                    node = node.parent
                    self.lRotate(node)
                    node.parent.color = 'B'
                    node.parent.parent.color = 'R'
                    self.rRotate(node.parent.parent)
            else:
                tempNode = node.parent.parent.left
                if tempNode.color == 'R':
                    node.parent.color = 'B'
                    tempNode.color = 'B'
                    node.parent.parent.color = 'R'
                    node = node.parent.parent
                elif node == node.parent.left:
                    node = node.parent
                    self.lRotate(node)
                    node.parent.color = 'B'
                    node.parent.parent.color = 'R'
                    self.rRotate(node.parent.parent)
        self.root.color = 'B'




    def push(self, node):
        y = self.node()
        x = self.root
        while x.key != None:
            y = x
            if node.key < x.key:
                x = x.left
            else: x = x.right
        node.parent = y
        if y.key == None:
            self.root = node
        elif node.key < y.key:
            y.left = node
        else:
            y.right = node

    '''
    def push(self, node):
        tempNodeX = self.root
        tempNodeY = self.null
        while tempNodeX.key != self.null.key:
            tempNodeY = tempNodeX
            if node.key < tempNodeX.key:
                tempNodeX = tempNodeX.left
            elif node.key > tempNodeX.key:
                tempNodeX = tempNodeX.right
        node.parent = tempNodeY
        if tempNodeY.key == None:
            self.root = node
        elif node.key < tempNodeY.key:
            tempNodeY.left = node
        elif node.key > tempNodeY.key:
            tempNodeY.right = node
        node.left = self.null
        node.right = self.null
        node.color = 'R'
        print(node.parent.parent.left)
        self.RBify(node)
    '''


gg = BST()
gg.push(gg.node(key=32))
gg.push(gg.node(key=33))
gg.push(gg.node(key=34))
gg.push(gg.node(key=35))
gg.push(gg.node(key=36))
gg.push(gg.node(key=37))
gg.push(gg.node(key=37))
print(gg.min(gg.root))
gg.rRotate(gg.root)
print(gg.min(gg.root))
print(gg.search(gg.root, 47))                  #this should not return None WTF?
#gg.printTree(gg.root)
#print(gg.search(gg.root, None))
