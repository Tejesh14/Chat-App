const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io')
const io = socketio(server);

app.use('/',express.static(path.join(__dirname,'/public')));

const users = {};

io.on('connection',(socket)=>{
    socket.on('login',(data)=>{
        users[socket.id]=data.name;
        console.log(data.name);
    })
    socket.on('send-msg',(data)=>{
        io.emit('recieved-msg',{
            msg: data.msg,
            name: users[socket.id]
        })
    })
})

server.listen(8080,()=>{
    console.log('Server is working on 8080');
})