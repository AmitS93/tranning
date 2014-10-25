

	var sRed=['.s2','.r23','.r20','.r17','.r14','.r11','.r8','.r5','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1']	

	var sgreen=['.s4','.g16','.g15','.g14','.g13','.g12','.g11','.g10','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17']

	var sblue=['.s6','.b9','.b10','.b11','.b12','.b13','.b14','.b15','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8']

	var syellow=['.s8','.y2','.y5','.y8','.y11','.y14','.y17','.y20','.y23','.y22','.y19','.y16','.y13','.y10','.y7','.y4','.y1','.g24','.g23','.g22','.g21','.g20','.g19','.g18','.g17','.g9','.g1','.g2','.g3','.g4','.g5','.g6','.g7','.g8','.r22','.r19','.r16','.r13','.r10','.r7','.r4','.r1','.r2','.r3','.r6','.r9','.r12','.r15','.r18','.r21','.r24','.b1','.b2','.b3','.b4','.b5','.b6','.b7','.b8','.b16','.b24','.b23','.b22','.b21','.b20','.b19','.b18','.b17','.y3','.y6','.y9','.y12','.y15','.y18','.y21','.y24']

	var newPath   = {'Pred':sRed,'Pblue':sblue,'Pgreen':sgreen,'Pyellow':syellow}


var userData={}

function newd(){
	for(x in updateData){
		
		if(updateData[x]==null){
			userData  = {}
			userData.noOfPlayers = 0	
			addUser()
		}
		else{
			userData=updateData[x]
			console.log(updateData[x])
			refresh()
			updateUserDataDisp()
			for(o=userData.noOfPlayers;o>0;o--){
				console.log(userData[o].userName)
				if(Name != userData[o].userName && userData.noOfPlayers<5){
					addUser()
				}
			}

		}
	}
}
var gameStared = false;
var activeUser = 1;
road=[]
var boxPOS = {}
function movepath(color)
{
	boxPOS = {}

	if(color=="red"){road=sRed}
	if(color=="blue"){road=sblue}
	if(color=="green"){road=sgreen}
	if(color=="yellow"){road=syellow}
	for( x in road){
		z = $(road[x]).position();
		newX = z.left;
		newY = z.top;
		boxPOS[x] = {'x':newX,'y':newY}
		}
			
	return boxPOS;
}


function updateActive(){

		userData[activeUser].chance = false
		activeUser = (activeUser==userData.noOfPlayers?0:activeUser) +1 
		userData[activeUser].chance = true
	
}
function changeFlage(){
	
	updateActive()
	updateUserDataDisp()
	
}
currentRollValue = '';
$("#roll").click(function()
		{
		$.ajax({
		type: "POST",
		data: "GetNewNumber="+1,
		success: function(data)
		{
			data = JSON.parse(data);
			
			currentRollValue = data
			changeFlage()
		}
		});
})
			
		
		
var path=[]
boxroad=[]
function moveDice(id){
		
		pickId = id.attr('pickId')

		if(userData!={}){
			path = []
			console.log(path)
			if(userData[activeUser].currentPos["."+pickId] == 0){
					if(currentRollValue == 1 || currentRollValue == 6){
						currentRollValue=1;
					}
					else {return}
				}
			console.log(userData[activeUser]['color'])
			boxroad=userData[activeUser].MoveP
			newPos = userData[activeUser].currentPos["."+pickId] + currentRollValue
			for (i = userData[activeUser].currentPos["."+pickId]; i<= newPos; i++)
			{
				path.push(boxroad[i])
			}
			console.log(newPos)
			userData[activeUser].currentPos["."+pickId] = parseInt(newPos)
		
			moveEle(id,path)
		}
		
		if (data==6){updateActive()}
		
		currentRollValue=0
}
function moveEle (id,path)
{
	for (w in path)
	{
		if( path[w]){	
			console.log(path[w])
			cPos = path[w]
			console.log(cPos)
		

			$(id).animate({
			    left: cPos.x+9,
			    top: cPos.y+9+(activeUser*2)
			  }, 500, function() {
		    // Animation complete.
			});
		}
	}

	
	updateUserDataDisp()
	
	send=JSON.stringify(userData)
	$.ajax({
            type:"Post",
            data: "newData="+send,
            success: function (data){
            }
        });
       

}

function refresh(){

	
	for(x=userData.noOfPlayers;x>0;x--){
		console.log("at refresh")
		console.log(userData)
		console.log(x)
		Data = userData[x]
		id=Data.i
		for(p=1;p<5; p++)
		{
			console.log(Data['color'])
			die = $('<div class= "die dieId'+userData[userData.noOfPlayers].dieId+' pick'+p+' '+Data['color']+'" pickId="pick'+p+'" onClick="select(this)"></div>')
			$('body').append(die);}

		for(y in Data['currentPos']){
			console.log(y)
			if(Data['currentPos'][y]!=0){
				resetdic(y,x)}
				console.log(x)

			
		}

	}

}

function resetdic(pickId,x){

		console.log(pickId)
		console.log(x)
		if(Data!={}){
			path = []
			console.log(path)
			console.log(Data['color'])
			boxroad=Data['MoveP']
			newPos = Data['currentPos'][pickId]
			path.push(boxroad[newPos])
			
			console.log(newPos)
			
			for (w in path){
	
				if( path[w]){	
					console.log(path[w])
					cPos = path[w]
					console.log(cPos)
				
				
						$(pickId).animate({
						    left: cPos.x+9,
						    top: cPos.y+9+(activeUser*2)
						  }, 500, function() {
					    // Animation complete.
						});
					
				}
			}
		}

		updateUserDataDisp()
		send=JSON.stringify(userData)
		$.ajax({
	            type:"Post",
	            data: "newData="+send,
	            success: function (data){
	            }
	        });
}
	       

	
var r=[]
rang=['red','blue','yellow','green']
function addUser(){
	if(gameStared==false){
		if(userData.noOfPlayers==0){
			r=['red','blue','yellow','green']}
		else{
			usedcol=[]
			for(x=userData.noOfPlayers;x>0;x--){
				usedcol.push(userData[x].color)


			}
			r=$(rang).not(usedcol).get()
		}
		color=prompt("select color",r)
		movp=movepath(color)
		console.log("jhjnj")
		console.log(movp)
		userData.noOfPlayers = userData.noOfPlayers +1;
		
		userData[userData.noOfPlayers]= {'userName':Name,'color':color,'currentPos':{'.pick1':0,'.pick2':0,'.pick3':0,'.pick4':0 },'dieId':userData.noOfPlayers,'chance':false,'MoveP':movp}
		for(x=1;x<5;x++){
		die = $('<div class= "die dieId'+userData[userData.noOfPlayers].dieId+' pick'+x+' '+color+'" pickId="pick'+x+'" onClick="select(this)"></div>')
		$('body').append(die);}

		userinfo= JSON.stringify(userData)
		$.ajax({
            type:"Post",
            data: "newData="+userinfo,
            success: function (data){
            }
        });
        updateUserDataDisp()
	}
	else{
			alert('game started :P');
			}
		updateUserDataDisp()

	}
function select(id){
	
	id=$(id)
	
	if(id.hasClass(userData[activeUser].color)){moveDice(id)}
		
}

function updateUserDataDisp(){
		$('.usrData').html('')
		for (i=1;i<=userData.noOfPlayers;i++)
			{
				$('.usrData').append($('<div><div class="userName">'+userData[i].userName+'</div><div class="cPos" >'+JSON.stringify( userData[i].currentPos)+'</div><div class="turn" >'+userData[i].chance+'</div></div>').css('background',userData[i].color))
				
			}
		
	}
