const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const staticPath = path.resolve(__dirname, "build");

app.use(express.static(staticPath));

if (process.env.NODE_ENV === "production") {
  app.get("*", (_, res) => {
    const indexFile = path.join(__dirname, "build", "index.html");
    return res.sendFile(indexFile);
  });
}

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https//jenniferwp.fr"
        : "http://localhost:3000",
  },
});

const rooms = [];
const arrOfShips = [];
const arrOfGrid = [];

io.on("connection", (socket) => {
  console.log("User connected : ", socket.id);

  socket.on("join_room", ({ room }) => {
    socket.join(room);
    console.log("User " + socket.id + " a rejoint la room " + room);

    const currentRoom = rooms.find((cRroom) => cRroom.id === room);
    if (!currentRoom) rooms.push({ id: room, setGame: 0, resetGame: 0 });
    else io.to(room).emit("init_game", room);
  });

  socket.on("leave_room", ({ room }) => {
    io.to(room).emit("reset_game");
    socket.leave(room);
    console.log("User " + socket.id + " a quitté la room " + room);
  });

  socket.on("reset_game", ({ room }) => {
    io.to(room).emit("leave_room");
  });

  socket.on("set_game", (data) => {
    for (const socketRoom of socket.rooms) {
      const room = rooms.find((room) => room.id === socketRoom);
      if (room) {
        arrOfShips[data.player] = data.arrOfShips[data.player];
        arrOfGrid[data.player] = data.arrOfGrid[data.player];

        room.setGame += 1;
        if (room.setGame === 2) {
          room.setGame = 0;
          io.to(data.socketRoom).emit("on_game", {
            arrOfShips,
            arrOfGrid,
            currentPlayer: 0,
            winner: -1,
            versus: "player",
            socketRoom: data.socketRoom,
            loaderText: "En attente de l'ennemi",
            view: "game",
          });
        }
      }
    }
  });

  socket.on("on_game", (data) => {
    io.to(data.socketRoom).emit("on_game", data);
  });

  socket.on("reset_board_game", (data) => {
    for (const socketRoom of socket.rooms) {
      const room = rooms.find((room) => room.id === socketRoom);
      if (room) {
        room.resetGame += 1;
        if (room.resetGame === 2) {
          room.resetGame = 0;
          io.to(data.socketRoom).emit("init_game", data.socketRoom);
        }
      }
    }
  });
});

server.listen(port, () => {
  console.log("Starting server on port " + port);
});
