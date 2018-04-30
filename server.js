var express = require("express"),
  bodyParser = require("body-parser"),
  users = require("./src/users.js");
var port = Number(process.env.PORT || 5000);
var cors = require("cors");
var MongoClient = require("mongodb").MongoClient;
var crypto = require("crypto");

const passport = require("passport");
const mongoose = require("mongoose");

const usersRoute = require("./routes/api/users");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// var myDB;

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
  //Text
  socket.on("text:send", function(data) {
    io.sockets.in(data.room).emit("text:send", data);
  });
});

app.get("/", function(req, res) {
  res.render("login.jade", { msg: "" });
});

// Example of API route for LOGIN
// Linked to login components in client folder - fetch(/login) endpoint
// app.get("/login", function(req, res) {
//   console.log(req.ip + " opened the site");
//   let data = {
//     mail: ""
//   };
//   res.json(data);
// });

// app.post("/login", function(req, res) {
//   var params = req.body;
//   myDB
//     .collection("users")
//     .find({ email: params.email.toLowerCase() })
//     .toArray(function(error, results) {
//       if (error) console.log(error);
//       if (results[0]) {
//         if (results[0].password === params.password) {
//           let token = crypto.randomBytes(64).toString("hex");
//           res.status(200).json({
//             token: token,
//             result: results[0]
//           });
//         } else {
//           res.status(500).send("Invalid password");
//         }
//       } else {
//         res.status(404).send("User don't exist please register");
//       }
//     });
// });

// app.get("/register", function(req, res) {
//   let data = {
//     mail: ""
//   };
//   res.json(data);
// });

// // Test post request on register component
// app.post("/register", function(req, res) {
//   console.log("register");
//   var params = req.body;
//   params.email = params.email.toLowerCase();
//   myDB.collection("users").insert(params, function() {
//     res.status(200).send("User created");
//   });
// });

app.get("/monitor", function(req, res) {
  res.render("monitor.jade", {
    roomList: users.roomList,
    userList: users.userList
  });
});

// app.get("/roomList", function(req, res) {
//   let roomList = Object.keys(users.roomList);
//   console.log(roomList);
//   res.json(roomList);
// });

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
