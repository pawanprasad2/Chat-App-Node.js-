const io = require ("socket.io")(8000,{
    // cors :"*" //acces to everyone
    cors : "http://localhost:5500" //access to particular 
})

let users ={}
io.on("connect",(socket)=>{

    socket.on("user-joined",(name)=>{
        console.log(name)
        users[socket.id]=name
        socket.broadcast.emit("new-user-joined",name)
    })

    socket.on("send",(message)=>{
        socket.broadcast.emit("receive",{name:users[socket.id],message:message})

    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-left",users[socket.id])
    })

})

