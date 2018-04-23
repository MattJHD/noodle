$(function() {

	messageList = [];
	$('#name').val(name);

	socket = io.connect(window.location.hostname);

	socket.on('status',function(status){
		console.log('Socket connection established.');
		if(status.connected == 'true'){
			console.log('connection accepted!');
			socket.emit('register',{username:name,room:room});
		}
	});

	setupChat();
	setupDraw();
});