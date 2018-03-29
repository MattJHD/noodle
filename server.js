var express = require('express'),
	bodyParser = require('body-parser'),
	// paper = require('./lib/paper-node.js'),
	users = require('./src/users.js');
	// canvasServer = require('./src/canvas_server.js');
	// publicJSFiles = __dirname + '/public/js/';
var port = Number(process.env.PORT || 5000);
var cors 	   = require('cors');
var MongoClient = require("mongodb").MongoClient;

var app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());

app.use(bodyParser.json());
app.enable('trust proxy');
app.set('views',__dirname+'/public/templates');
app.set('view engine','jade');
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/libs'));
app.use(express.static(__dirname + '/public/res'));

//test
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

var myDB;

MongoClient.connect("mongodb://localhost:27017/noodle", function(error, client) {
	if (error) console.log(error);
	myDB = client.db("noodle");
	console.log("Connecté à la base de données");
})

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
	let data = {
		mail: 'bloch.william@gmail.com',
	}
	res.json(data);
});

// Test post request on login component
app.post('/login', function(req,res){
	console.log("Login");
	var params = req.body;
	myDB.collection("users").find({"email":params.email}).toArray(function (error, results) {
		if (error) console.log(error);
		if (results[0].password === params.password) {
			res.json({status:200});
		}else{
			res.json({status:500});
		}
	});
});


app.get('/register',function(req,res){
	console.log(req.ip+" opened the site");
	let data = {
		mail: 'test.register@gmail.com',
	}
	res.json(data);
});

// Test post request on register component
app.post('/register', function(req, res){
	console.log("register");
	var params = req.body;
	console.log(params);
	myDB.collection('users').insert0ne(params,function () {
		res.send("200");
	});
	// console.log(req.body);
});


app.get('/monitor',function(req,res) {
	console.log(req.ip+" is monitoring");
	res.render('monitor.jade',{roomList:users.roomList,userList:users.userList});
});


// Test RoomList
app.get('/roomList',function(req,res){
	// console.log(users.roomList);
	res.json(users.roomList);
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
