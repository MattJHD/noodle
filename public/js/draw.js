/*
	The MIT License (MIT)

	Copyright (c) 2014 Tanay PrabhuDesai

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

var setupDraw = function() {

	var userList = [];
	var currentLocation = {x:100,y:100};
	var pencilPath;
	var obj; //object to be sent to all the other users
	var activeTool = 'pencil';
	var colorStroke = 'black';
	var strokeCap = 'round';
	var thickness = 2;
	var mouseDown = false;

	paper.setup($('#draw_area')[0]);
	paper.install(window);
	var pencilTool = new Tool();

	var sendCurrentLocation = setInterval(function(){
		var data = {username:name,room:room,location:currentLocation};
		socket.emit('drawing:location',data);
	},100);

	var sendDrawingUpdate = setInterval( function(){
		if (activeTool == 'pencil' && obj && obj.pts.length > 0) {
			socket.emit('drawing:progress',obj);
			obj.pts = [];
		}
	},100);

	var updateUserPoint = function(it,x,y) {
		userList[it].txt.point.x = x;
		userList[it].txt.point.y = y;
		userList[it].txtRect.position.x = x;
		userList[it].txtRect.position.y = y;
	};

	var getUserIndex = function(username) {
		for ( var it = 0 ; it < userList.length ; ++it) {
			if ( userList[it].uid == username) {
				return it;
			}
		}
		return null;
	};

	var appendNewUser = function (username) {
		user = {uid: username, txt: new paper.PointText(0, 0), txtRect: new paper.Path.Rectangle(0,0,2,2)};
		user.txt.fillColor = 'black';
		user.txt.content = username;
		user.txtRect.strokeColor = 'black';
		userList.push(user);
	};

	var packActionMessage = function(action, data){
		if (action == 'drawing:start') {
			obj = null;
			if (activeTool == 'pencil'){
				obj = {username:name,room:room};
				obj.tool = 'pencil';
				obj.color = colorStroke;
				obj.x = currentLocation.x;
				obj.y = currentLocation.y;
				obj.thickness = thickness;
				obj.pts = [];
			}
		}
		if (action == 'drawing:progress'){
			if (activeTool == 'pencil') {
				obj.pts.push({x:data.x,y:data.y});
			}
		}
		return obj;
	};

	var unpackActionMessage = function(action,message){
		var index = getUserIndex(message.username);
		if (action == 'drawing:start') {
			if (message.tool == 'pencil') {
				userList[index].tool = 'pencil';
				userList[index].obj = new paper.Path(message.x,message.y);
				userList[index].obj.strokeWidth = message.thickness;
				userList[index].obj.strokeCap = 'round';
				userList[index].obj.strokeColor = message.color;
			}
		}
		if (action == 'drawing:progress') {
			if (message.tool == 'pencil') {
				for (var i = 0 ; i < message.pts.length ; ++i) {
					userList[index].obj.add(new paper.Point(message.pts[i].x,message.pts[i].y));
				}
			}
		}
	};

	socket.on('drawing:location',function(data) {
		if (data.username != name) {
			for ( var it = 0 ; it < userList.length ; ++it) {
				if(userList[it].txt.content == data.username){
					updateUserPoint(it,data.location.x,data.location.y);
					view.draw();
					return;
				}
			}
			appendNewUser(data.username);
			updateUserPoint(userList.length-1,data.location.x,data.location.y);
			view.draw();
		}
	});

	tempSelect = function(event) {
		if (activeTool == 'select'){
			console.log('selected');
			this.selected = true;
		}
	};

	socket.on('drawing:start',function(data) {
		if (data.username != name) {
			index = getUserIndex(data.username);
			if (index !== null) {
				if (data.tool == 'pencil') {
					unpackActionMessage('drawing:start',data);
				}
			}
		}
	});

	socket.on('drawing:progress',function(data) {
		if (data.username != name) {
			index = getUserIndex(data.username);
			if (index !== null) {
				if (data.tool == 'pencil') {
					unpackActionMessage('drawing:progress',data);
				}
			}
		}
	});

	pencilTool.onMouseDown = function (event) {
		mouseDown = true;
		if (activeTool == 'pencil') {
			pencilPath = new paper.Path(new paper.Point(currentLocation.x,currentLocation.y));
			pencilPath.strokeColor = colorStroke;
			pencilPath.strokeWidth = thickness;
			pencilPath.strokeCap = strokeCap;
			packActionMessage('drawing:start');
			socket.emit('drawing:start',obj);
			console.log('sent: '+obj);
		}
		if (activeTool == 'select') {
			selectItemsAt(event.point.x,event.point.y);
		}
	};

	pencilTool.onMouseUp = function (event) {
		mouseDown = false;
	};

	pencilTool.onMouseDrag = function (event) {
		if (activeTool == 'pencil') {
			pencilPath.add(event.point);
			packActionMessage('drawing:progress',{x:event.point.x,y:event.point.y});
		}
		currentLocation.x = event.point.x;
		currentLocation.y = event.point.y;
	};

	pencilTool.onMouseMove = function (event) {
		currentLocation.x = event.point.x;
		currentLocation.y = event.point.y;
	};

	// Drawing controls
	$('#pencil').click(function(e) {
		activeTool = 'pencil';
		console.log(activeTool);
	});

	$('#color_picker').change(function(e){
		console.log("color changed!");
		colorStroke = $('#color_picker').val();
		if (activeTool == 'pencil') {
			obj.color = colorStroke;
		}
	});

	$('#thick_txt').change(function(e){
		$('#thick_range').val($('#thick_txt').val());
		thickness = $('#thick_txt').val();
	});

	$('#thick_range').mousemove(function(e){
		console.log('range changed');
		$('#thick_txt').val($('#thick_range').val());
		thickness = $('#thick_txt').val();
	});

};