const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const faker = require("faker");

const port = 5000;
const rooms = [];

const generateId = () => {
    return Math.floor(Math.random() * 10000 + 1).toString();
};

app.use(express.static("build"));

// routes
app.get("/sentence", (req, res) => {
    res.send(faker.lorem.sentence());
});

app.get("/paragraph", (req, res) => {
    res.send(faker.lorem.paragraph());
});

app.get("/create", (req, res) => {
    let id = generateId();

    if (rooms.includes(id)) {
        id = generateId();
    }

    rooms.push(id);
    res.send(id);
});

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// socket.io
io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("set username", (name) => {
        socket.username = name;
    });

    socket.on("create room", (name, roomId) => {
        socket.join(roomId);
        io.to(roomId).emit("update playerlist", name);
    });

    socket.on("join room", (name, roomId) => {
        socket.join(roomId);
        io.to(roomId).emit("update playerlist", name);
    });
});
