const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
app.use(express.json());
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(5001, { cors: { origin: "*" } });

const connectedPlayers = new Map();

const connectedUsers = new Set(); //Set

const selectedCards = new Map();
const playRooms = {};

io.on("connection", (socket) => { 



  socket.on("user-login", (userId) => {
    connectedUsers.add(userId);

    connectedPlayers.set(userId, socket.id);

    console.log(connectedPlayers);
    io.emit("online-users", Array.from(connectedUsers));
    console.log(connectedUsers);
    console.log("user info", userId);
  });
// ----------------------------------------------
  socket.on("user-logout", (userId) => {
    connectedUsers.delete(userId);

    io.emit("online-users", Array.from(connectedUsers));
    console.log("User disconnected:", userId);
  });

  socket.on("user-selected", ({ selectedUserId, roomId, userId }) => {
    console.log("User_selected", selectedUserId, roomId);

    try {
      // playRooms[room][userId]
      // socket.join(roomId);
      const room = "room-" + selectedUserId + userId;
      playRooms[room] = { [selectedUserId]: {}, [userId]: {} };
      console.log(playRooms[room]);

      socket.join(room);
    
      const selectedUserSocketId = connectedPlayers.get(selectedUserId);
      if (selectedUserSocketId) {
        // io.to(selectedUserSocketId).emit("room-invite", selectedUserId,room);

        io.emit("room-invite", selectedUserId,room);
        console.log("my work here over");
      } else {
        console.error("Selected user is not connected:", selectedUserId);
      }
    } catch (error) {
      console.error(
        "An error occurred while processing the user-selected event:",
        error
      );
    }
  });

  socket.on("player-join", async (roomIdInput, selectedRoomId, userId) => {
    try {
      console.log("player join", roomIdInput, userId, connectedPlayers);
      if (roomIdInput) {
         socket.join(roomIdInput);

        
        console.log(roomIdInput);
        //until here work
        if (Object.keys(playRooms[roomIdInput]).length === 2) {
          // io.emit("game-start", connectedPlayers);
          io.to(roomIdInput).emit("game-start", connectedPlayers)

          console.log("it is time to dual");
        }
      }
    } catch (error) {
      console.error("Error while handling player join:", error);
    }
  });

  socket.on("select-card", async (card) => {
    try {
      console.log("card", card);

      selectedCards.set(card.playerName, card.card);

      socket.emit("card-selected", card); // need work here to send data to front end

      console.log("card-selected -", selectedCards);
      console.log("card-selected -", selectedCards.size);
      // Check selected cards and determine the winner
      if (selectedCards.size === 2) {
        checkSelectedCards();
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  const checkSelectedCards = async () => {
    if (selectedCards.size === 2) {
      // Both players have selected cards
      const playerOneName = Array.from(selectedCards.keys())[0];
      const playerTwoName = Array.from(selectedCards.keys())[1];
      const playerOneCard = selectedCards.get(playerOneName);
      const playerTwoCard = selectedCards.get(playerTwoName);
      const cards = { playerOneCard, playerTwoCard };
      console.log("Player 1 Card", playerOneCard);
      console.log("Player 2 Card", playerTwoCard);
      io.emit("opponent-card", cards); // Determine the winner

      let winner = null;
      if (playerOneCard.attack > playerTwoCard.attack) {
        winner = playerOneName;
      } else if (playerOneCard.attack < playerTwoCard.attack) {
        winner = playerTwoName;
      } else {
        winner = "tie";
      }
      console.log("the winner", winner);
      // Emit the winner to both players
      io.emit("game-over", winner);
      selectedCards.clear();
    }
  };

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const postsRouter = require("./routes/posts");
const roleRouter = require("./routes/role");
const permissionRouter = require("./routes/permission");
const userRouter = require("./routes/User");
const friendRoutes = require("./routes/friends");
const commentRouter = require("./routes/comment");
const notificationRouter = require("./routes/notification");
const likeRouter = require("./routes/like");
const cardRouter = require("./routes/cards");

app.use(cors(corsOptions));
app.use("/permission", permissionRouter);
app.use("/posts", postsRouter);
app.use("/", roleRouter);
app.use("/", userRouter);
app.use("/", friendRoutes);
app.use("/comment", commentRouter);
app.use("/notif", notificationRouter);
app.use("/like", likeRouter);
app.use("/", cardRouter);

app.use("*", (req, res) => res.status(404).json("No content at this path"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
