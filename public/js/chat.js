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