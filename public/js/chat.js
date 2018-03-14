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

var setupChat = function() {

	var messageList = [];
	$('#name').val(name);

	socket = io.connect(window.location.hostname);

	socket.on('status',function(status){
		console.log('Socket connection established.');
		if(status.connected == 'true'){
			console.log('connection accepted!');
			socket.emit('register',{username:name,room:room});
		}
	});

	socket.on('chat:previous',function(data) {
		console.log('Messagesssss received :)');
		console.log('Message '+data);
		addChatMessage(data);
	});

	socket.on('chat:send',function(data){
		console.log('Message received :)');
		addChatMessage(data);
	});

	socket.on('user:list',function(data) {
		$('#online_list').text('');
		var myList = $('#online_list');
		console.log('Users online: '+data.length);
		for (var i = 0 ; i < data.length ; ++i){
			myList.append('<li>'+data[i]+'</li>');
		}
		// $('#users_online').append(data);
	});

	sendChatMessage = function(){
		message = $('#chat_input').val();
		if (message != '') {
			$('#chat_input').val('');
			socket.emit('chat:send',{username:name,room:room, text:message});	
		}
	};

	addChatMessage = function(data){
		if( typeof(data.length) != 'undefined' ) {
			messageList = [];
			for ( var i = 0 ; i < data.length ; ++i ){
				console.log("Array length: "+data.length);
				messageList.push(data[i]);
				console.log("Array");
			}
		} else {
			messageList.push(data);
			console.log("Object");
		}
		var text = '';
		for (var i=0 ; i<messageList.length; i++) {
			messageList[i].username = messageList[i].username==name?'Me':messageList[i].username;
			text += '<b>'+messageList[i].username+':</b> '+messageList[i].text+'<br>';
		}
		$('#chat_content').html(text);
		$("#chat_content").scrollTop($("#chat_content")[0].scrollHeight);
	}

	$('#chat_input').keypress(function(e){
		code = e.keyCode || e.which;
		if (code == 13){
			sendChatMessage();
		}
	});

};