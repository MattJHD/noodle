var express = require("express"),
  bodyParser = require("body-parser"),
  users = require("./src/users.js");
var port = Number(process.env.PORT || 5000);
var cors = require("cors");
var MongoClient = require("mongodb").MongoClient;
var crypto = require("crypto");

const path = require("path");

const passport = require("passport");
const mongoose = require("mongoose");

const usersRoute = require("./routes/api/users");
const roomsRoute = require("./routes/api/rooms");

const app = express();

// Build path
app.use(express.static(path.join(__dirname, "client/build")));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

// Cors
app.use(cors());

// Proxy config
app.enable("trust proxy");

// View engine for backend and canvas
app.set("views", __dirname + "/public/templates");
app.set("view engine", "jade");
app.engine("jade", require("jade").__express);
app.use(express.static(__dirname + "/public/js"));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/libs"));
app.use(express.static(__dirname + "/public/res"));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

MongoClient.connect("mongodb://localhost:27017/noodle", function(
  error,
  client
) {
  if (error) console.log(error);
  myDB = client.db("noodle");
  console.log("Connecté à la base de données");
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

// ---------------------
//      SOCKETS START
// ---------------------
var io = require("socket.io").listen(app.listen(port));
console.log("Listening on port: " + port);

var sendChatsToClient = function(socket, room) {
  if (room in users.roomList) {
    var chats = users.roomList[room].chats;
    socket.emit("chat:previous", chats);
  }
};

io.sockets.on("connection", function(socket) {
  // Connection and Disconnection handling
  socket.emit("status", { connected: "true" });

  socket.on("register", function(userDetail) {
    socket.join(userDetail.room);
    users.setSocketId(userDetail.username, socket.id);
    sendChatsToClient(socket, userDetail.room);
    io.sockets.emit("user:list", users.getUsernamesList(userDetail.room));
  });

  socket.on("disconnect", function() {
    if (users.removeUser(socket.id)) {
      console.log(socket.id + " disconnected");
      io.sockets.emit("user:list", users.getUsernamesList());
    }
  });

  // Chat messages handling
  socket.on("chat:send", function(data) {
    users.addChatToRoom(data.room, data);
    io.sockets.in(data.room).emit("chat:send", data);
  });

  // Canvas messages handling
  socket.on("drawing:location", function(data) {
    io.sockets.in(data.room).emit("drawing:location", data);
  });
  socket.on("drawing:start", function(data) {
    io.sockets.in(data.room).emit("drawing:start", data);
  });
  socket.on("drawing:progress", function(data) {
    io.sockets.in(data.room).emit("drawing:progress", data);
  });
  // Text
  socket.on("text:send", function(data) {
    io.sockets.in(data.room).emit("text:send", data);
  });
});
// ---------------------
//      SOCKETS END
// ---------------------

// @route   GET /monitor
// @desc    Get some monitoring information (users / rooms / ip)
// @access  Public
app.get("/monitor", function(req, res) {
  res.render("monitor.jade", {
    roomList: users.roomList,
    userList: users.userList
  });
});

// @route   POST /canvas
// @desc    Create a new room with canvas and chat - backend side
// @desc    Accessed directly from a form on front side
// @access  Public
app.post("/canvas", function(req, res, next) {
  console.log(req.body);
  console.log(
    "Got by POST from " + req.body.username + " " + req.body.room + " " + req.ip
  );
  if (!users.addNewUser(req.body.username, req.body.room, req.ip)) {
    res.render("login.jade", { msg: "Username already taken" });
  } else {
    res.render("canvas.jade", {
      username: req.body.username,
      room: req.body.room
    });
  }
});
