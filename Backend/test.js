const { Server } = require("socket.io");
const authTest = require("./middleware/authTest")
const io = new Server(2002, { cors: { origin: "*" } });
const clients = {};

io.use(authTest);


io.on("connection", (socket) => {
  const user_id = socket.handshake.headers.user_id;
  clients[user_id] = { socket_id: socket.id, user_id };


//   notificaton
socket.on("notificaton", (data)=>{
    console.log(data);
    data.success = true
    socket.to.emit("notificaton", data)
})




  socket.on("disconnect", () => {
    console.log(socket.id);
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
    console.log(clients);
  });
});
