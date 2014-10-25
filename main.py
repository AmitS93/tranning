import uuid
import os
import urllib
from models import gamePlay,gamePlayers
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import channel
from baseRequestClass import requestHandler
import webapp2
import logging
import json
import random






class ludhogame(requestHandler):
	template_name = 'ludho.html'
	def get(self,game=""):
		
		user = users.get_current_user()
		logging.info(user)
		gameBoardID = self.request.cookies.get('gameBoardID')
		if not gameBoardID:
			gameBoardID = str(uuid.uuid1())
			self.response.set_cookie('gameBoardID',gameBoardID, max_age=360)	
	
		

		'''gameObject=rkey.get()
		logging.info(gameObject)
		info=gameObject.getData()
		dic=json.dumps({'status':info})
		pat=gamePlayers()
		road=pat.path'''
		gObj=gamePlayers()
		gameInfo = gObj.getGameState(game,gameBoardID= gameBoardID)
		tok = channel.create_channel('board-' +gameBoardID+'-'+ gameInfo.key.urlsafe())
		self.renderResponse({'n':user,'token': tok })

	def post(self,game=""):
		color=self.request.get('color')
		userdata=self.request.get('newData')
		uData = json.loads(userdata)
		rkey=ndb.Key(urlsafe=game)
		obj=rkey.get()
		obj.userData=uData
		obj.put()
		sendD=gamePlayers()
		for x in sendD.path:
			if (x==color):
				movp=ForPath[x]
				self.response.out.write(json.dumps({'path':movp}))


		DD=sendD.userData
		for gb in ForPath.gameBoards:
					channel.send_message('board-' +gb+'-'+ res.key.urlsafe(),json.dumps({'status':DD}))
			

			
		

class roll(requestHandler):
	template_name = 'start.html'
	def get(self,game=""):
		user = users.get_current_user()
		gObj = gamePlay()
		gameBoardID = self.request.cookies.get('gameBoardID')
		if not gameBoardID:
			gameBoardID = str(uuid.uuid1())
			self.response.set_cookie('gameBoardID',gameBoardID, max_age=360)
		if not game:
			gKey  = gObj.createNew(owner = user,gameBoardID= gameBoardID)
			self.redirect("/ludhoboard/%s"%gKey.urlsafe())
		else:
			logging.info(gameBoardID)

			gameInfo = gObj.getGameState(game,gameBoardID= gameBoardID)
			token = channel.create_channel('board-' +gameBoardID+'-'+ gameInfo.key.urlsafe())
			logging.info(gameBoardID)
			self.renderResponse({'request':self.request,'gameInfo':gameInfo,'token':token,'mode':self.request.get('mode')})
			
	def post(self,game=""):
		getNewnumber = self.request.get('GetNewNumber')
		oBj = gamePlay()
		res = oBj.getGameState(gameKey=game)
		if getNewnumber:
			nos=random.randint(1, 6)
			for gb in res.gameBoards:
					channel.send_message('board-' +gb+'-'+ res.key.urlsafe(),json.dumps({'status':nos}))
			



app = webapp2.WSGIApplication([
	('/game/play/(.*)',ludhogame),
	('/ludhoboard/(.*)',roll)
], debug=True)
