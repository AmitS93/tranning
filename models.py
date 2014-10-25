from google.appengine.ext import ndb
from google.appengine.api import memcache
import logging,datetime
import time

current_milli_time = lambda: int(round(time.time() * 1000))

print current_milli_time()
	
class gamePlay(ndb.Model):
	
	
	gameBoards =  ndb.StringProperty(repeated=True)
	owner =  ndb.UserProperty()

	game = None
	def createNew(self,owner = '',gameBoardID=""):
		if owner:
			newGame = gamePlay()
			newGame.owner  =  owner
			newGame.gameBoards  =  [gameBoardID]
			gKey = newGame.put()
			return gKey
	def updateNewBoard(self,gameKey = '',gameBoardID=""):
		self.game = self.game or  self.getGameState(gameKey = gameKey)
		if not self.game.gameBoards : self.game.gameBoards = []
		self.game.gameBoards.append(gameBoardID)
		self.game.gameBoards = list(set(self.game.gameBoards))
		self.game.put()
		return self.game
	def getGameState(self,gameKey = '',gameBoardID = ''):
		gameKey  =  ndb.Key(urlsafe=gameKey)
		self.game = gameKey.get()
		if self.game:
			if gameBoardID not in self.game.gameBoards:
				self.updateNewBoard(gameBoardID=gameBoardID)
			return self.game


class gamePlayers(ndb.Model):
	users = ndb.UserProperty()
	userData=ndb.JsonProperty()
	gamekey = ndb.KeyProperty(kind=gamePlay)
	gameBoards=ndb.StringProperty(repeated=True)
	
	def __init__(self):
		sRed=['.s2','.r23','.r20','.r17','.r14','.r11','.r8','.r5','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1']	
		sgreen=['.s4','.g16','.g15','.g14','.g13','.g12','.g11','.g10','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17']
		sblue=['.s6','.b9','.b10','.b11','.b12','.b13','.b14','.b15','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8']
		syellow=['.s8','.y2','.y5','.y8','.y11','.y14','.y17','.y20','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24']
		self.path={'red':sRed,'green':sgreen,'blue':sblue,'yellow':syellow}

	def updateNewBoard(self,gameKey = '',gameBoardID=""):
		self.game = self.game or  self.getGameState(gameKey = gameKey)
		if not self.game.gameBoards : self.game.gameBoards = []
		self.game.gameBoards.append(gameBoardID)
		self.game.gameBoards = list(set(self.game.gameBoards))
		self.game.put()
		return self.game
	def getGameState(self,gameKey = '',gameBoardID = ''):
		gameKey  =  ndb.Key(urlsafe=gameKey)
		self.game = gameKey.get()
		if self.game:
			if gameBoardID not in self.game.gameBoards:
				self.updateNewBoard(gameBoardID=gameBoardID)
			return self.game
	







	
		
		