var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
    // 用户访问返回的页面
    // res.send('<h1>我是服务器返回的页面</h1>')
    res.sendFile(__dirname + '/views/index.html')
})

// io.on('connection', (socket) => {
//     // 用户加入
//     // console.log(socket.handshake.address)
//     // console.log(socket.handshake.address + '加入了' + socket.handshake.time)
//     // console.log(socket.handshake.address.split('f:')[1] + '加入了聊天室' )
//     socket.on('disconnect', () => {
//         // 用户退出
//         // console.log(socket.handshake.address.split('f:')[1]+'离开了聊天室');
//       });
// })

io.on('connection', (socket) => {
    // 用户加入
    console.log(socket.handshake.address.split('f:')[1] + '加入了聊天室')
    socket.on('disconnect', () => {
        // 用户退出
        console.log(socket.handshake.address.split('f:')[1] + '离开了聊天室');
    });

    socket.on('userInput', (data) => {
        console.log(data)
    });

    // 返回用户输入消息
    socket.on('chat message', (data) => {
        // console.log(data)
        // 在控制台打印用户消息
        console.log(socket.handshake.address.split('f:')[1] + '-----'+ data.user+ '-----' + data.msg);
        // 把消息广播到全部用户
        // io.emit('chat message', { user: socket.handshake.address.split('f:')[1], message: msg });
        // 把消息广播到除发送者以外的全部用户
        socket.broadcast.emit('chat message', {user:data.user, message:data.msg});
    });

    
});

http.listen(4000, () => {
    console.log('服务器开启了4000');
})

