import express from "express";
import userRouter from "./routes/user_routes.js";
import itemRouter from "./routes/item_routes.js";
import containerRouter from "./routes/container_routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/containers", containerRouter);

export default app;
