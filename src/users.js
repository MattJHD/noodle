var userList = {};
var roomList = {};
var chatLimit = 100;


function addUserToRoom(uid,room) {
	if (room in roomList) {
		roomList[room].users.push(uid);
	} else {
		roomList[room] = {users:[],chats:[]};
		roomList[room].users.push(uid);
	}
}

function removeUserFromRoom(uid,room) {
	if (room in roomList) {
		for (var i = 0 ; i < roomList[room].users.length ; ++i) {
			if (uid == roomList[room].users[i]) {
				roomList[room].users.splice(i,1);
				break;
			}
		}
	}
}

function addChatToRoom(room,data) {
	if (room in roomList) {
		roomList[room].chats.push(data);
		if (roomList[room].chats.length > chatLimit) {
			var diff = roomList[room].chats.length - chatLimit;
			roomList[room].chats.splice(0,diff);
		}
		return true;
	}
	return false;
}

function addNewUser(uid,_room,ip) {
	if (uid in userList) {
		return false;
	} else {
		userList[uid] = {room:_room,ip:ip,id:''};
		addUserToRoom(uid,_room);
		return true;
	}
}

function getUsernamesList(room) {
	if (room in roomList) {
		return roomList[room].users;
	}
	else {
		return null;
	}
}

function equalsUsernameID(uid,id) {
	if (uid in userList) {
		if (userList[uid].id == id) {
			return true;
		}
	}
	return false;
}

function getRoomsList(){
	return roomList;
}

function setSocketId(uid,id) {
	if (uid in userList) {
		if (userList[uid].id == '') {
			userList[uid].id = id;
			return true;
		}
	}
	return false;
}

function removeUser(id) {
	for (var uid in userList) {
		if (userList[uid].id == id) {
			removeUserFromRoom(uid,userList[uid].room);
			delete userList[uid];
			return true;
		}
	}
	return false;
}

exports.getUsernamesList = getUsernamesList;
exports.addNewUser = addNewUser;
exports.setSocketId = setSocketId;
exports.userList = userList;
exports.equalsUsernameID = equalsUsernameID;
exports.removeUser = removeUser;
exports.userList = userList;
exports.roomList = roomList;
exports.addChatToRoom = addChatToRoom;