import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT;

const server = http.createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

server.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});
