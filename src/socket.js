import { Server } from "socket.io";

const socketServer = {}
let messages = []

socketServer.connect = (server) => {
    socketServer.io = new Server(server)

    let { io } = socketServer;

    io.on("connection", (socket) => {
        console.log(`${socket.id} connected`)

        socket.on("message", (data) => {
            messages.push(data)
            io.emit("messageLogs", messages)
        })
    })
}

export default socketServer