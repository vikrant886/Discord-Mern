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
    origin: 'https://discord-mern.vercel.app', // Replace with the origin of your React app
    methods: ['GET', 'POST'],
  },
});

const onlineusersmap = new Map();
const friendreqmap = new Map();
const allusers = new Map()
const servermap = new Map()
const server_user = new Map();
const pmessage = new Map()
const userimage = new Map()

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
    if (server_user.has(userdata.username)) {
      const d = server_user.get(userdata.username);
      d.push(servername);
      server_user.set(userdata.username, d);
    }
    else {
      server_user.set(userdata.username, [servername]);
    }
    //
    socket.join(servername);

  })

  socket.on("joinserver", (data) => {
    const { servername, userdata } = data;
    if (server_user.has(userdata.username)) {
      const seconduser = server_user.get(userdata.username);
      seconduser.push(servername);
      server_user.set(userdata.username, seconduser);
    } else {
      server_user.set(userdata.username, [servername]);
    }
  });

  socket.on("message", (data) => {
    console.log("got message and sending ");
    // console.log(data)
    const sender = data.username
    const receiver = data.to

    if (!pmessage.has(sender)) {
      pmessage.set(sender, {});
    }
    if (!pmessage.has(receiver)) {
      pmessage.set(receiver, {});
    }
    if (!pmessage.get(sender)[receiver]) {
      pmessage.get(sender)[receiver] = [];
    }
    if (!pmessage.get(receiver)[sender]) {
      pmessage.get(receiver)[sender] = [];
    }
    pmessage.get(receiver)[sender].push(data);
    pmessage.get(sender)[receiver].push(data);
    // console.log(pmessage.get(sender)[receiver])
    console.log(allusers.get(data.to))
    socket.to(allusers.get(data.to)).emit("rec_message", data);
  })

  socket.on("getmessage", ({ sender, receiver }) => {
    console.log(sender, receiver)
    console.log("got mess req , fetching messages")
    let message;
    if (pmessage.get(sender)) {
      message = pmessage.get(sender)[receiver]
    }
    else {
      message = []
    }
    // console.log(message)
    console.log(allusers.get(sender))
    io.to(allusers.get(sender)).emit("message", message)
  })

  socket.on("login", (data) => {
    onlineusersmap.set(data.username, data);
    allusers.set(data.username, socket.id)
    // console.log(onlineusersmap)
    io.emit('allonlineuser', Array.from(onlineusersmap.values()));
  })

  socket.on("registeronsocket", (data) => {
    console.log("user registered on socket")
    allusers.set(data.username, socket.id)
  })

  socket.on("fecthalluser", (data) => {
    io.emit('allonlineuser', Array.from(onlineusersmap.values()));
  })

  socket.on("chessreqcreated", (data) => {
    console.log("chessreq created and sent")
    socket.to(allusers.get(data.user)).emit("chessreq", data);
  })

  socket.on("chessreqacc", (data) => {
    console.log(data.from)
    socket.to(allusers.get(data.from)).emit("chessacc", data);
  })

  // for video calls

  socket.on('join', ({roomId}) => {
    console.log(roomId)
    socket.join(roomId);
    console.log(`User with ID ${socket.id} joined room: ${roomId}`);
  });

  socket.on('offer', (data) => {
    const {offer,roomId,user}=data
    console.log(roomId)
    console.log(allusers.get(data.user))
    socket.to(allusers.get(data.user)).emit('offer', {
      offer,
      roomId,
    });

    // socket.to(data.roomId).emit('offer', {
    //   offer: data.offer,
    //   socketId: socket.id
    // });
  });

  socket.on('answer', ({answer,roomId}) => {
    // console.log(roomId,answer)
    socket.to(roomId).emit('answer', {
      answer,
      roomId,
    });
  });

  socket.on('ice-candidate', (data) => {
    // console.log("recieved ice-can",data)
    socket.to(data.roomId).emit('ice-candidate', {
      candidate: data.candidate,
      roomId:data.roomId
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });

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

