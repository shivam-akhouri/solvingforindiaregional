var app = require("express")();
var express = require("express")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var http = require("http").Server(app);
const port = process.env.PORT||5000;

const cors = require("cors");
app.use(cors())
var io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
}) 

app.get('/', (req, res)=>{
    console.log(port)
    res.send("Connection is established")
})

io.on("connection", (socket)=>{
    console.log("A client connected")
    socket.on("video_send", (data)=>{
        socket.broadcast.emit("video_receive", data)
    })
})

http.listen(port, ()=>{
    console.log("[LOG]:Server ready on port 3000")
})