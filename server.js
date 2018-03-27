var express = require('express'),
	bodyParser = require('body-parser'),
	// paper = require('./lib/paper-node.js'),
	users = require('./src/users.js');
	// canvasServer = require('./src/canvas_server.js');
	// publicJSFiles = __dirname + '/public/js/';
var port = Number(process.env.PORT || 5000);

var app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.enable('trust proxy');
app.set('views',__dirname+'/public/templates');
app.set('view engine','jade');
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/libs'));
app.use(express.static(__dirname + '/public/res'));

var io = require('socket.io').listen(app.listen(port));
console.log('Listening on port: '+port);

var sendChatsToClient = function(socket,room) {
	if (room in users.roomList) {
		var chats = users.roomList[room].chats;
		socket.emit('chat:previous',chats);
	}
};

io.sockets.on('connection', function(socket){

	// Connection and Disconnection handling
	socket.emit('status',{connected:'true'});

	socket.on('register',function(userDetail){
		socket.join(userDetail.room);
		users.setSocketId(userDetail.username,socket.id);
		// users.roomList[userDetail.room].paper = new paper.PaperScope();
		sendChatsToClient(socket,userDetail.room);
		io.sockets.emit('user:list',users.getUsernamesList(userDetail.room));
		console.log('Registered: '+userDetail.username+', '+socket.id);
	});

	socket.on('disconnect', function () {
		if(users.removeUser(socket.id)){
			console.log(socket.id + ' disconnected');
			io.sockets.emit('user:list',users.getUsernamesList());
		}
	});

	// Chat messages handling
	socket.on('chat:send', function (data){
		users.addChatToRoom(data.room,data);
		io.sockets.in(data.room).emit('chat:send', data);
	});

	// Canvas messages handling
	socket.on('drawing:location',function(data){
		// console.log('data.location:'+data.location+' x:'+data.location.x+' y:'+data.location.y);
		io.sockets.in(data.room).emit('drawing:location', data)
	});
  	socket.on('drawing:start',function (data) {
  		io.sockets.in(data.room).emit('drawing:start',data);
  	});
  	socket.on('drawing:progress',function (data) {
  		io.sockets.in(data.room).emit('drawing:progress',data);
  	});
});

app.get('/',function(req,res){
	console.log(req.ip+" opened the site");
	res.render('login.jade',{msg:''});
});


// Example of API route for LOGIN
// Linked to login components in client folder - fetch(/login) endpoint
app.get('/login',function(req,res){
	console.log(req.ip+" opened the site");
	let test = {
		title: 'test var',
	}
	res.json(test);
});



app.get('/monitor',function(req,res) {
	console.log(req.ip+" is monitoring");
	res.render('monitor.jade',{roomList:users.roomList,userList:users.userList});
});

app.post('/canvas',function(req,res,next){
	console.log("Got by POST from "+req.body.username+' '+req.body.room+' '+req.ip);
	if (!users.addNewUser(req.body.username,req.body.room,req.ip)) {
		res.render('login.jade',{msg:'Username already taken'});
	} else {
		// users.setSocketId();
		res.render('canvas.jade',{username:req.body.username,room:req.body.room});
	}
});
