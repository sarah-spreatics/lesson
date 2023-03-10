const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/practice42", (req, res) => {
  res.sendFile(__dirname + "/practice42.html");
});

// socket: 클라이언트 소켓과 연결이 되고 새로 생성된 소켓
io.on("connection", (socket) => {
  console.log("Server Socket Connected", socket.id);

  // socket.emit('이벤트명', 데이터) : 클라이언트로 메세지 전송
  socket.emit("welcome", { msg: "Welcome from server" });

  socket.on("hello", (arg) => {
    console.log(arg["msg"]);
  });

  socket.on("disconnect", () => {
    console.log("Server Socket disconnected");
  });
});

http.listen(8000, () => {
  console.log("Server port : ", 8000);
});
