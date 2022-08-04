const webserver = require("../../../index");

/*
  Socket 통신 부분 : 따로 포트 열지 않고 3001번 포트로 진행
*/
var io = require('socket.io')(webserver)
;
io.sockets.on('connection', (socket, opt) => {
  socket.emit('message', {msg: 'Welcome' + socket.id});

  socket.on('join', function(roomId, fn){
    socket.join(roomId, function(){
      util.log("join", roomId, Object.keys(socket.rooms))
    });
  });

  socket.on('leave', function(roomId, fn){
    socket.leave(roomId, function(){
      if(fn)
        fn();
    });
  });

  socket.on('rooms', function(fn){
    if(fn)
      util.log(Object.keys(socket.rooms));
  });

  socket.on('message', (data, fn) => {
    util.log("message >>", data.msg, Object.keys(socket.rooms));

    if(fn)
      fn(data.msg);

    socket.broadcast.to(data.room).emit('message', {room: data.room, msg : data.msg})
  });

  socket.on('message-for-one', (socketid, msg, fn) =>
  {
    socket.to(socketid).emit('message', {msg : msg})
  });

  socket.on('disconnecting', function(roomId, fn){
    util.log("disconnecting >> ", socket.id)
  })
});