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

io.on("connection", socket => {
  socket.emit("usercount", io.engine.clientsCount); //몇초마다 체크하게?

  socket.on("message", msg => {
    io.emit("message", msg);
  });
});

server.listen(3000, function () {
  console.log("Listening on http://localhost:3000/");
});
