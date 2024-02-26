const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authroute = require('./routes/auth');
const serverroute = require('./routes/serverroute');
const bodyParser = require('body-parser');
const channelroute = require('./routes/channelroute');
const friendsroute = require('./routes/friend');
const Server = require('./models/server')
const onlineuser = require('./models/online')
const app = express();
const socketIo = require('socket.io');
app.use(cors());
const http = require('http');
const friends = require('./models/friends')

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get("/hello", (req, res) => {
  res.send("ehellot there");
})
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server, {
  cors: {
    origin: 'https://discord-mern.vercel.app/', // Replace with the origin of your React app
    methods: ['GET', 'POST'],
  },
});

const onlineusersmap = new Map();
const friendreqmap = new Map();
const allusers = new Map()
const servermap = new Map()
const server_user = new Map();

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  // socket.on("joinchannel", (data) => {
  //   const {channelid} =data;
  //   console.log(channelid);
  //   socket.join(channelid)
  //   socket.to(channelid).emit("newuser","new");
  // })

  socket.on("addfriend", (data) => {
    friendreqmap.set(data.searcheduser, data);
    io.emit("friendreq", Array.from(friendreqmap.values()));
  })
  socket.on("fetchallreq", (data) => {
    io.emit("friendreq", Array.from(friendreqmap.values()));
  })

  socket.on("requestaccepted", (data) => {
    friendreqmap.delete(data.searcheduser)
    console.log("got req server")
    io.emit("reqaccepted", data)
  })

  socket.on("friendremoved", (data) => {
    io.emit('allonlineuser', Array.from(onlineusersmap.values()))
  })

  socket.on("logout", (data) => {
    onlineusersmap.delete(data)
    io.emit('allonlineuser', Array.from(onlineusersmap.values()));
  })

  socket.on("servercreated", (data) => {
    const { servername, userdata } = data
    const user = []
    user.push(userdata)
    server_user.set(servername, user)

  })

  socket.on("joinserver", (data) => {
    const { servername, userdata } = data;
    if (server_user.has(servername)) {
      const seconduser = server_user.get(servername);
      seconduser.push(userdata);
      server_user.set(servername, seconduser);
    } else {
      server_user.set(servername, [userdata]);
    }
  });


  socket.on("login", (data) => {
    onlineusersmap.set(data.username, data);
    allusers.set(data.username, socket.id)
    // console.log(onlineusersmap)
    io.emit('allonlineuser', Array.from(onlineusersmap.values()));
  })

  socket.on("fecthalluser", (data) => {
    io.emit('allonlineuser', Array.from(onlineusersmap.values()));
  })

});
mongoose
  .connect(process.env.DATABASE_URL)
  .then((client) => {
    console.log('DB Connection Successful');
    const db = client.connection;

    // const onlineuserchage = onlineuser.watch();
    // onlineuserchage.on('change', (next) => {
    //   // console.log(next)
    //   io.emit('onlineuserchange',next)
    //   console.log("done")
    // });



    // const friendchange = friends.watch();
    // friendchange.on('change', (data) => {
    //   console.log("change in friends")
    //   io.emit("addfriendchange", data)
    // })

  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
  });


app.use('/user', authroute);
app.use('/server', serverroute);
app.use('/channel', channelroute);
app.use('/friend', friendsroute);

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});

