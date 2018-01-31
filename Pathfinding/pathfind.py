import math
import sys
#sys.path.append("../..")
from Data_Structure_implementations import HEAP as heap
from Data_Structure_implementations import BST as BST
import copy



pixels = []
obstacles = []
pix_in_X = 10
pix_in_Y = 10

class pixel:
    index = None
    def __init__(self, X, Y, obs, **keyargs):
        self.X_co_ordinate = X
        self.Y_co_ordinate = Y
        self.state = obs  #available states OPN, UND, OBS, DIS, NULL
        self.g = 0
        self.h = 0
        self.f = 0
        self.index = getIndex(self.X_co_ordinate, self.Y_co_ordinate)
        if 'last' in keyargs:
            self.last = keyargs['last']
        else :
            self.last = None

    def __str__(self):
        return "X=" + str(self.X_co_ordinate) + " Y=" + str(self.Y_co_ordinate) + " state=" + str(self.state)

    def printPixel(self, **keyargs):
        print("X=" + str(self.X_co_ordinate) + " Y=" + str(self.Y_co_ordinate) + " state=" + str(self.state))
        if (keyargs[extras] == True):
            print("G=" + str(self.g) + " H=" + str(self.h) + " F=" + str(self.f))

class pathfindMeta:
    start = None
    end = None
    def __init__(self, start, end, closedSet = None):
        self.start = start
        self.end = end
        self.closedSet = closedSet
    def getMeta(self):
        metaData = [self.start, self.end]
        return metaData



def printMap(pixels):
    map = ""
    iterator = 0
    for pix in pixels:
        iterator = iterator+1
        map = map + "   " + str(pix.X_co_ordinate) + "," + str(pix.Y_co_ordinate) + "," + str(pix.state[:1])
        if iterator%10 == 0:
            map = map + "\n \n"
    print(map)


def populate(height, width, obs_val="UND"):
    global pixels
    pixels = []
    h = height - 1
    i = 0
    while h >= 0:
        w = 0
        while w < width:
            pixels.append(pixel(w, h, obs_val))
            w += 1
            i += 1
        h -= 1
    #marking the pixels at the border of the main map as obstacles because calling getneighbours() on the start chunk may yeild invalid results
    #pixels to be marked as obstacels if height=6 and width=5 are-
    #   |pix25 pix00 pix00 pix00 pix29|
    #   |pix20 [UND] [UND] [UND] pix24|       the UND pixels are our main map.
    #   |pix15 [UND] [UND] [UND] pix19|       The pixels around it are marked
    #   |pix10 [UND] [UND] [UND] pix14|       as obstacles by this function
    #   |pix05 [UND] [UND] [UND] pix09|
    #   |pix00 pix01 pix02 pix03 pix04|
    #
    for i in list(range(width)) + list(range(0,(width*(height-1))+1,width)) + list(range(width-1, (width*(height-1))+width, width)) + list(range(width*(height-1), height*width)):
        pixels[i].state = 'OBS'

    return pixels

def getIndex(X, Y):
    return (pix_in_X * (pix_in_Y - Y - 1)) + X

def getPixel(X, Y):
    return pixels[getIndex(X, Y)]

def getG(current, start):
    G = 1
    while current != start and current.last != start and current.last != None:
        print("current is")
        print(current)
        print(current.last)
        current = current.last
        G += 1
    return G

def getH(current, end):
    try:
        pass
        #current = current.centre
    except:
        pass
    I = math.sqrt(math.pow(abs(current.X_co_ordinate - end.X_co_ordinate), 2) + math.pow(
        abs(current.Y_co_ordinate - end.Y_co_ordinate), 2))
    return I

def getF(start, current, end):
    return getG(start, current) + getH(current, end)


'''
#pixel arrangement of a horizontal chunk - | pix1, pix2, pix3 |
#
#                                          | pix1 |
#pixel arrangement of a vertical chunk -   | pix2 |
                                           | pix3 |

'''

class chunk:

    def __init__(self, metaObj, *pixargs, **keyargs):
        i=0
        self.pixs = []
        for pix in pixargs:
            i += 1
            self.pixs.append(pix)

        meta = metaObj.getMeta()
        self.start = meta[0]
        self.end = meta[1]
        #print("centre = " + str(math.ceil(len(self.pixs)/2) - 1))
        self.centre = self.pixs[math.ceil(len(self.pixs)/2) - 1]
        self.temp_last = None
        #print("centre is " + str(self.centre))
        self.G = getG(self.centre, self.start)
        self.H = getH(self.centre, self.end)
        self.F = self.G + self.H
        self.last = None
        self.lastMain = None
        #self.centre.last = None
        if 'last' in keyargs:
            print("last is")
            print(keyargs['last'].printChunk())
            self.centre.last = keyargs['last']
            self.last = keyargs['last']

    def setlast(self, last, chunkSize = 3):
        self.last = last
        pixAtSide = int(math.floor(chunkSize/2))
        centreIndex = int(math.floor(len(last.pixs)/2))
        #centre index takes the index of the pixels at the centre
        #and pixAtSide holds the amount of pixels between the pixel at current index and nextChunk
        currentLast = last.pixs[centreIndex]
        DIR = self.getNextDir()
        print(DIR)
        if DIR == 'F':
            step = chunkSize
            lastChunk = int(math.floor(chunkSize/2))
            for i in range(centreIndex-step, lastChunk-step, -step):
                last.pixs[i].last = currentLast
                currentLast = last.pixs[i]
        elif DIR == 'B':
            step = chunkSize
            lastChunk = len(last.pixs) - int(math.floor(chunkSize/2)) - 1
            for i in range(centreIndex+step, lastChunk+step, step):
                last.pixs[i].last = currentLast
                currentLast = last.pixs[i]
        elif DIR == 'L':
            pixAtSide = int(math.floor(chunkSize/2))
            #print(str())
            for i in range(centreIndex-1, centreIndex - pixAtSide - 1, -1):
                print(currentLast)
                last.pixs[i].last = currentLast
                currentLast = last.pixs[i]
        elif DIR == 'R':
            pixAtSide = int(math.floor(chunkSize/2))
            print(str(centreIndex) + "  " + str(centreIndex + pixAtSide + 1))
            for i in range(centreIndex+1, centreIndex + pixAtSide + 1, 1):
                print("current last is")
                print(currentLast)
                last.pixs[i].last = currentLast
                currentLast = last.pixs[i]

        print(currentLast)
        self.centre.last = currentLast




                #self.centre.last = last

    def printChunk(self):
        map = ""
        iterator = 0
        for pix in self.pixs:
            iterator = iterator + 1
            map = map + "  " + str(pix.X_co_ordinate) + "," + str(pix.Y_co_ordinate)# + "," + str(pix.state[:1])
            if iterator % 3 == 0:
                map = map + "\n"
        print(map)

    def checkObstacle(self, DIR):
        pixIndex = 0

        for pix in self.pixs:
            try:
                if pix.state == 'OBS':
                    return True
                elif DIR == 'F':
                    pixIndex = getIndex(pix.X_co_ordinate, pix.Y_co_ordinate + 1)
                    if pixels[pixIndex].state == 'OBS':
                        return True
                    else: pass
                elif DIR == 'L':
                    pixIndex = getIndex(pix.X_co_ordinate - 1, pix.Y_co_ordinate)
                    if pixels[pixIndex].state == 'OBS':
                        return True
                    else: pass
                elif DIR == 'R':
                    pixIndex = getIndex(pix.X_co_ordinate + 1, pix.Y_co_ordinate)
                    if pixels[pixIndex].state == 'OBS':
                        return True
                    else: pass
                elif DIR == 'B':
                    pixIndex = getIndex(pix.X_co_ordinate, pix.Y_co_ordinate - 1)
                    if pixels[pixIndex].state == 'OBS':
                        return True
                    else: pass
            except:
                if pixIndex > len(pixels) or pixIndex < 0:
                    return False
        return False

    def getNextDir(self):
        neighbourCentre = self.centre
        neighbourX = neighbourCentre.X_co_ordinate
        neighbourY = neighbourCentre.Y_co_ordinate

        currentCentre = self.last.centre
        currentX = currentCentre.X_co_ordinate
        currentY = currentCentre.Y_co_ordinate

        #print("printing self")
        #self.printChunk()
        #print("neighbourY " + str(neighbourY))
        #print("currentY " + str(currentY))
        #print("neighbourX " + str(neighbourX))
        #print("currentX " + str(currentX))
        if currentY == neighbourY and currentX != neighbourX:
            if currentX > neighbourX:
                return 'L'
            elif currentX < neighbourX:
                return 'R'
        elif currentX == neighbourX and currentY != neighbourY:
            if currentY > neighbourY:
                return 'B'
            elif currentY < neighbourY:
                return 'F'

    def buildC_chunk(self):
        meta = pathfindMeta(self.start, self.end)
        DIR = self.getNextDir()
        print("chunk dir is " + str(DIR))
        #print("dir is " + str(DIR))
        try:
            if DIR == 'F':
                return buildC_chunk(meta, pixels[getIndex(self.last.centre.X_co_ordinate, self.last.centre.Y_co_ordinate+1)])
            elif DIR == 'R':
                return buildC_chunk(meta, pixels[getIndex(self.last.centre.X_co_ordinate+1, self.last.centre.Y_co_ordinate)])
            elif DIR == 'L':
                return buildC_chunk(meta, pixels[getIndex(self.last.centre.X_co_ordinate-1, self.last.centre.Y_co_ordinate)])
            elif DIR == 'B':
                return buildC_chunk(meta, pixels[getIndex(self.last.centre.X_co_ordinate, self.last.centre.Y_co_ordinate-1)])
        except:
            raise ValueError("wrongi in renewSelf")
        #return buildC_chunk(meta, pixels[getIndex(self.last.centre.X_co_ordinate, self.last.centre.Y_co_ordinate + 1)])





#defining a special chunk for holding the current position of the bot

#pixel arrangement in a current chunk - | pix1, pix2, pix3,|
#                                       | pix4, pix5, pix6,|
#                                       | pix7, pix8, pix9 |

class C_chunk(chunk):

    def __init__(self, metaObj, *pixargs, **keyargs):
        chunk.__init__(self, metaObj, *pixargs, **keyargs)


    def getNeighbour(self,metaObj, DIR):
        neighbourpixs = []

        if self.checkObstacle(DIR) == False:
            #try:
                if DIR == 'F':
                    for i in [0,1,2]:
                        pix = self.pixs[i]
                        pixIndex = getIndex(pix.X_co_ordinate, pix.Y_co_ordinate + 1)
                        neighbourpixs.append(pixels[pixIndex])
                elif DIR == 'L':
                    for i in [0,3,6]:
                        pix = self.pixs[i]
                        pixIndex = getIndex(pix.X_co_ordinate - 1, pix.Y_co_ordinate)
                        neighbourpixs.append(pixels[pixIndex])
                elif DIR == 'R':
                    for i in [2,5,8]:
                        pix = self.pixs[i]
                        pixIndex = getIndex(pix.X_co_ordinate + 1, pix.Y_co_ordinate)
                        neighbourpixs.append(pixels[pixIndex])
                elif DIR == 'B':
                    for i in [6,7,8]:
                        pix = self.pixs[i]
                        pixIndex = getIndex(pix.X_co_ordinate, pix.Y_co_ordinate - 1)
                        neighbourpixs.append(pixels[pixIndex])
            #included the try and except just to be on the safe side even though the try is most likely to always succeed
            #except:
            #    if pixIndex > len(pixels) or pixIndex < 0:
            #        neighbourChunk = chunk(metaObj, pixel(0, -1, 'OBS'), pixel(1, -1, 'OBS'), pixel(2, -1, 'OBS'), last=self)
            #        return neighbourChunk
        else:
            self.printChunk()
            print("has obstacle")
            return None

        closedSet = metaObj.closedSet
        if closedSet.search(closedSet.root, getIndex(neighbourpixs[1].X_co_ordinate, neighbourpixs[1].Y_co_ordinate)):
            return None
        neighbourChunk = chunk(metaObj, neighbourpixs[0], neighbourpixs[1], neighbourpixs[2])
        print("it's centre is")
        print(neighbourChunk.centre)
        neighbourChunk.setlast(self)
        print("neighboursChunk last is")
        neighbourChunk.last.printChunk()
        print("neighbourCHunk centre last is")
        print(neighbourChunk.centre.last)
        print("neighbourCHunk centre last's last is")
        print(neighbourChunk.centre.last.last)

        #neighbourChunk.temp_last = self
        return neighbourChunk

    def getNeighbours(self, metaObj):
        neighbourChunks = []
        for DIR in ['F', 'L', 'R', 'B']:
            neighbourChunk = self.getNeighbour(metaObj, DIR)
            if neighbourChunk != None:
                neighbourChunks.append(neighbourChunk)
        return neighbourChunks

    #this method gets all the chunks inside a C_chunk
    # need to improve this later
    def getChunks(self, **keyargs):
        chunks = []
        chunks.append(chunk(pathfindMeta(self.start, self.end), self.pixs[0], self.pixs[1], self.pixs[2]))
        chunks.append(chunk(pathfindMeta(self.start, self.end), self.pixs[3], self.pixs[4], self.pixs[5]))
        chunks.append(chunk(pathfindMeta(self.start, self.end), self.pixs[6], self.pixs[7], self.pixs[8]))
        chunks.append(chunk(pathfindMeta(self.start, self.end), self.pixs[0], self.pixs[3], self.pixs[6]))
        chunks.append(chunk(pathfindMeta(self.start, self.end), self.pixs[1], self.pixs[4], self.pixs[7]))
        chunks.append(chunk(pathfindMeta(self.start, self.end), self.pixs[2], self.pixs[5], self.pixs[8]))
        return chunks


def buildC_chunk(meta, center, C_chunkSize=9):
    pixs = []
    chunkSize = int(math.sqrt(C_chunkSize))
    if chunkSize%2 != 1:
        #print("chunkSize is" + str(chunkSize))
        raise ValueError('C_chunk must have odd pixels on every side')
    else:
        # haven't used chunkSize-1 because range() excludes the last value
        lowY = int(center.Y_co_ordinate - math.floor(chunkSize/2))
        highY = lowY + int(chunkSize)
        #print("lowY = " + str(lowY))
        #print("highY = " + str(highY))
        lowX = int(center.X_co_ordinate - math.floor(chunkSize/2))
        highX = lowX + int(chunkSize)
        #print("centre = " + str(center.Y_co_ordinate))
        for Y_co_ordinate in range(highY-1, lowY-1, -1):
            #print("Y="+str(Y_co_ordinate))
            for X_co_ordinate in range(lowX, highX):
                #print("X=" + str(X_co_ordinate))
                pixs.append(pixels[getIndex(X_co_ordinate, Y_co_ordinate)])
    return C_chunk(meta, *pixs)


def buildChunk(meta, center, alignment='H', chunkSize = 3):
    pixs = []
    if chunkSize%2 != 1:
        raise ValueError('chunk must be of odd length')
    else:
        if alignment == 'V':
            lowY = int(center.Y_co_ordinate - math.floor(chunkSize / 2))
            highY = lowY + int(chunkSize)
            for Y_co_ordinate in range(lowY, highY):
                pixs.append(pixels[getIndex(center.X_co_ordinate, Y_co_ordinate)])
        elif alignment == 'H':
            lowX = int(center.X_co_ordinate - math.floor(chunkSize / 2))
            highX = lowX + int(chunkSize)
            for X_co_ordinate in range(lowX, highX):
                pixs.append(pixels[getIndex(X_co_ordinate, center.Y_co_ordinate)])

    return chunk(meta, *pixs)



# if start is a chunk then pass chunk.centre as pathfind's argument because pathfind takes a pixel argument not chunk

def pathFind(start, end):
    meta = pathfindMeta(start, end)
    closedSet = BST.BST()
    openSet = heap.heap([])
    meta.closedSet = closedSet
    #openSet.push(start.index)
    currentC_chunk = buildC_chunk(meta, start, C_chunkSize=9)
    gg = 0
    #currentC_chunk.printChunk()
    for chunk in currentC_chunk.getChunks():
        chunk.printChunk()
        gg = gg+1
        print("pusing " + str(gg))
        closedSet.push(closedSet.node(chunk.centre.index))
    print("printing neighbours")
    for neighbour in currentC_chunk.getNeighbours(meta):
        print("this is neighbour")
        neighbour.printChunk()
        openSet.push(neighbour)
    i = 0
    currentC_chunk.centre.last = None

    while openSet.length() > 1:
        i = i+1
        print(str(i) + "th")
        print("Start is " + str(meta.start))
        #currentC_chunk.printChunk()
        print(currentC_chunk.centre)
        print("popping openset")
        #print(openSet.pop())
        nextChunk = openSet.pop()
        print("next chunk is")
        nextChunk.printChunk()
        currentC_chunk = nextChunk.buildC_chunk()
        print("C_chunk is")
        currentC_chunk.printChunk()

        #generating all the chunks in a C_chunk and pushing them to closedSet
        for chunk in currentC_chunk.getChunks():
            if not closedSet.search(closedSet.root, chunk.centre.index):
                print("adding to closedSet")
                closedSet.push(closedSet.node(chunk.centre.index))

        for chunk in currentC_chunk.getChunks():
            if chunk.centre == end:
                print("found path")
                #print(nextChunk.centre.last.printChunk())
                return getPath(nextChunk.centre, start)

        neighbours = currentC_chunk.getNeighbours(meta)
        print(len(neighbours))
        for neighbour in neighbours:
            neighbour.printChunk()
        #print("printing closedSet")
        #closedSet.printTree(closedSet.root)
        for neighbour in neighbours:
            if neighbour == []:
                print("neighbours is empty")
                continue
            elif closedSet.search(closedSet.root, neighbour.centre.index):
                print("neighbours in closedset")
                continue
            elif neighbour not in openSet.heap:
                print("neighbours not in openset")
                openSet.push(neighbour)
                continue

            # the execution comes here only and only if the nieghbour is in openset
            tGscore = getG(currentC_chunk, start) + getH(currentC_chunk.centre, neighbour.centre)
            if tGscore > getG(neighbour, start):
                continue

            neighbour.setLast(currentC_chunk)
            neighbour.g = tGscore
            neighbour.h = getH(neighbour.centre, end)
            neighbour.f = getF(start, neighbour.centre, end)


def getPath(current, start):
    path = []
    x = 0
    while current != start:
        print(str(x) + "th path")
        print("current is")
        print(current)
        print("start is")
        print(start)
        print("\n")
        path.append(current)
        x += 1
        current = current.last
    print("printing path")
    for pix in path:
        print(pix)
    return path











populate(100, 100)

#pathFind(pixels[0],pixels[0],pixels[0])
#ggg.printGG()

#for pix in pixels:
    #if pix.state == 'OBS':
    #    print(pix)

gg = pathfindMeta(pixels[11], pixels[56])
ggg = C_chunk(gg, pixels[51], pixels[52], pixels[53], pixels[61], pixels[62], pixels[63], pixels[71], pixels[72], pixels[73])
gggg = chunk(gg, pixels[50], pixels[60], pixels[70])
ggg.printChunk()
print("\n")
#gggg.printChunk()
#ggg.getNeighbours(gg)
#gg.buildC_chunk().printChunk()
#xxx = ggg.getNeighbours(gg)
#print(ggg.last)
#gg.setlast(ggg)
#print(pixels[23].index)
#print("printing buildself")
#buildSelf(pixels[34])
pathFind(pixels[32],pixels[75])
#print(xxx)
#printMap(pixels)

#pixels[13].state = 'OBS'
#xx = ggg.getNeighbours('F')








#pixels.append("gg")
#print(pixels)







##### problems
# 1. in checobstacle - if the chunk is a C_chunk it'll have 9 pixels in it and the checkobstacle operates on all of the 9 pixels
#    wherease it needs to operate only on 3 specific pixels on the given direction