const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const express = require("express");
const indexRouter = require("./routes/index");
const linesRouter = require("./routes/lines");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/lines", linesRouter);

const userList = [];
const answerList = [];
let user;
let setting;

io.on("connection", socket => {
  console.log("user connected: ", socket.id);
  socket.emit("usercount", io.engine.clientsCount); //유저 수 데이터 보냄

  socket.on("login", data => {
    user = data;
    userList.push(user);
    socket.name = data;
  });

  socket.on("settingGame", data => {
    setting = data;
  });

  socket.on("answer", data => {
    answerList.push(data);
    socket.emit("answerList", answerList);
  });

  socket.emit("waitingUser", user);
  socket.emit("loadSettingGame", setting);
  socket.emit("userList", userList);
});

server.listen(3000, function () {
  console.log("Listening on http://localhost:3000/");
});
